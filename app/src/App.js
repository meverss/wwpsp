import './App.css'
import axios from './libs/axios.js'
import { React, useState, useRef, useEffect, createContext } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useNotify } from './hooks/useNotify.js'
import { getYear } from './libs/formatDate.js'
import { IoSunnyOutline, IoLogOutOutline } from "react-icons/io5"
import { RiMoonLine } from "react-icons/ri"

// Components
import { CompHeaderTop } from './components/CompHeaderTop.js'
import { CompMenu } from './components/CompMenu.js'

//Pages
import CompMain from './pages/CompMain.js'
import CompPortfolio from './pages/CompPortfolio.js'

// API & Media Server
let server
let mediaServer

if(!window.location.hostname.includes('vercel.app')){ //('localhost') || window.location.hostname.includes('192.168.') || window.location.hostname.includes('127.0.') || window.location.hostname.includes('10.')){
  server = `http://${window.location.hostname}:4000/api`
} else {
  server = `https://wwpsp-server.vercel.app/api`
}

export const serverContext = createContext()
const URI = `${server}/reviews`

// App Component
const App = () => {
  const [reviews, setReviews] = useState('')
  const [theme, setTheme] = useState('')
  const [themeIcon, setThemeIcon] = useState('')
  
  const teamBox = document.querySelector('.team_box')
  const loaderPercentBar = document.querySelector('.loaderPercentBar')	  
  const { showNotification, NotificationsContainer } = useNotify()
  let images = []
  let imagesLoaded = -1
  let loadingPercent = ''
  
  useEffect(() => {
	checkIp()
	getReviews()
    getTheme()
  }, [])
  
  // Show page
  const tcr = useRef()
  const pageContent = useRef()
  const scrollArea = useRef('')
  const loaderContainer = useRef('')
  const rootDir = window.location.pathname === '/'
  const section = localStorage.getItem('actSection')

  const showPage = ()=> {
	loaderPercentBar.style.width = "100%"
	setTimeout(()=> {
	  if(loadingPercent !== null){
		loadingPercent = null
		pageContent.current.style.opacity = "1"
		document.body.style.overflowY = "scroll"
		loaderContainer.current.style.display = 'none'
		document.removeEventListener("DOMContentLoaded", null)
		window.location = `/#${section}`
		localStorage.removeItem('actSection')
	  }
	},1000)
  }

  const imageLoaded = ()=> {
	const gsp = document.querySelector('.gossip')
	const loaderPercentBar = document.querySelector('.loaderPercentBar')	  
	imagesLoaded ++
	
	loadingPercent = `${Math.ceil(imagesLoaded / images.length * 100)}%`
	loaderPercentBar.style.width = loadingPercent
	//gsp.innerText = `${loadingPercent}`
	
	let timeoutId
	const startAutoShowPage = ()=> {
	  timeoutId = setTimeout(()=> {
		showPage()
		setTimeout(()=> stopAutoShowPage(), 1000)
	  }, 15000)
	}

	const stopAutoShowPage = ()=> {
	  if(timeoutId){
		clearTimeout(timeoutId)
		timeoutId = null
	  }
	}

	if(loadingPercent === '100%') {
	  setTimeout(()=> showPage(), 1000)
	  stopAutoShowPage()
	} else {
	  startAutoShowPage()
	}
  }

  if(reviews.length > 0) imagesLoaded += 1

  const checkLoadedMedia = ()=> {
	if(rootDir){
	  images = document.querySelectorAll('img')	
	  images.forEach((image)=>{
		if(image.complete) imageLoaded()
	  })
	}
  }

  document.addEventListener("DOMContentLoaded", checkLoadedMedia())
  
  //Get IP Info
  const checkIp = async ()=> {
	try {
  	  const res = await fetch('https://api.ipify.org?format=json')
	  const { ip: currentIp } = await res.json()

	  const storedIp = localStorage.getItem('ip')
	  const storedIpData = localStorage.getItem('ipData')
	  
	  if(!storedIp || storedIp !== currentIp){
		  await getIpInfo(currentIp)
		} else if(storedIpData){
		  showNoti(JSON.parse(storedIpData))
		}
	} catch(err){
	  handleErr(err)
	}
  }

  const getIpInfo = async (ip)=> {
	try {
	  const res = await axios.post(`${server}/ipinfo`, {ip})
	  const ipData = res.data
	  
	  localStorage.setItem('ipData', JSON.stringify(ipData))
	  localStorage.setItem('ip', ipData.ip)
	  
	  showNoti(ipData)
	} catch(err){
	  handleErr(err)
	}
  }
  
  const showNoti = (ipData)=> {
	const message = `IP: ${ipData.ip} \n Country: ${ipData.country_flag} ${ipData.location.country} \n State: ${ipData.location.state} \n City: ${ipData.location.city} \n ISP: ${ipData.isp.org}`
	setTimeout(()=> {
	  showNotification('inf', message, {title: 'IP Information'})		
	},1000)
  }

  const handleErr = (err)=> {
	showNotification('err', err.response?.data?.message || err.message, {title: 'Error'})
	setTimeout(()=> checkIp(), 30000)
  }
  
  // Get all reviews
  const getReviews =  async ()=> {
	try {
  	  const res = await axios.get(URI)
  	  setReviews(res.data.filter(r => r.enabled === true))
  	} catch(err){
    	showNotification('err', err.response?.data?.message || err.message, {title: 'Error'})
  		setTimeout(()=> getReviews(), 30000)
    }
  }

  // Trigger animation
  const boxes = document.querySelectorAll(".box")

  const triggerAnimation = (entries) => {
	entries.forEach((entry) => {
	  if (entry.isIntersecting) {
		entry.target.classList.remove("animate__animated","animate__fadeOut")
		entry.target.classList.add("animate__animated","animate__fadeIn")
		//obBoxes.unobserve(entry.target)
	  } else {
		entry.target.classList.remove("animate__animated","animate__fadeIn")
		entry.target.classList.add("animate__animated","animate__fadeOut")
	  }
	})
  }

  const options = {
	root: null,
	rootMargin: "-125px",
	//threshold: 0.5
  }

  const obBoxes = new IntersectionObserver(triggerAnimation, options)

  boxes.forEach((b) => {
	obBoxes.observe(b)
  })
  
  // Theme switch (Light/Dark)
  const systemTheme = window.matchMedia('(prefers-color-scheme: light)')
  systemTheme.addEventListener('change', () => {
  	localStorage.removeItem('Theme')
  	getTheme()
  })

  const getTheme = ()=> {
  	const dark = <IoSunnyOutline className='themeSwitch menuIcon animate__animated animate__bounceIn' size='28px' />
  	const light = <RiMoonLine className='themeSwitch menuIcon animate__animated animate__bounceIn' size='28px' />
  	const userTheme = localStorage.getItem('Theme')
  	
    if(!userTheme){
		if(systemTheme.matches){
			setTheme('light')
			setThemeIcon(light)	
		} else {
			setTheme('dark')
			setThemeIcon(dark)
		}   	
    } else {
    	setTheme(userTheme)
    	setThemeIcon(eval(userTheme))
    }
  }

  const changeThemeUser = () => {
    if(theme === 'light'){
		localStorage.setItem('Theme','dark')
		getTheme()
    } else {
		localStorage.setItem('Theme','light')
		getTheme()
    }
  }

  // SHARE ON SOCIAL MEDIA
  const social_n = document.querySelectorAll(".social_item")
  const my_website = encodeURIComponent(window.location.href)
  const my_title = encodeURIComponent('WWP SCREENING & PAINTING LLC.')
  const url_facebook = "http://www.facebook.com/sharer.php?u=" + my_website + "&t=" + my_title
  const url_twitter = "https://twitter.com/intent/tweet?url=" + my_website + "&text = " + my_title
  const url_linkedin = "https://www.linkedin.com/shareArticle?mini=true&url=" + my_website

  social_n.forEach((item) => {
	item.addEventListener("click", function () {
	  const link = "url_" + item.id
	  window.open(eval(link), "", "width=530, height=600, toolbar=0, status=0, top=200, left=700")
	})
  })
  
  return (
    <serverContext.Provider value={server}>
      <>
    	<div className="page_content" ref={pageContent} id="page_content" >
    	<CompHeaderTop />

    	{/* Loader */}
    	<div className="loader_container" ref={loaderContainer} id="loader_container" >
		  <div className='loader' ></div><br />
		  <div className='loaderPercent'>
			<div className='loaderPercentBar'></div>
		  </div>
		  <p className="gossip" style={{position: 'fixed', bottom: '60px', color: 'green', width: '100%'}}></p>
  		</div>

    	{/* Notifications */}
		<NotificationsContainer />
		
		{/* Routes */}
        <BrowserRouter>
          <Routes>
        	<Route path='/' element={<CompMain reviews={reviews} getReviews={getReviews} showNotification={showNotification} />} />
            <Route path='/portfolio' element={<CompPortfolio showNotification={showNotification} reviews={reviews} />} />
	        <Route path='*' element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
        </div>

        <div className='footer'>
          <p id='footer'>Powered by KiniunDev™ - Copyright© {getYear()}</p>
        </div>
      </>
    </serverContext.Provider>
  )
}

export default App
