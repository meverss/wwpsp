import './App.css'
import axios from './libs/axios'
import { React, useState, useRef, useEffect, createContext } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { getYear } from './libs/formatDate.js'
import { FaCircleCheck, FaTriangleExclamation, FaCircleExclamation } from "react-icons/fa6"
import { IoSunnyOutline, IoLogOutOutline } from "react-icons/io5"
import { RiMoonLine } from "react-icons/ri"
import { PiGearFill } from "react-icons/pi"

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
  mediaServer = server
} else {
  server = `https://wwpsp-server.vercel.app/api`
  mediaServer = server
}

export const serverContext = createContext()
const URI = `${server}/reviews`

// App Component
const App = () => {
  const [reviews, setReviews] = useState('')
  const [notifyIcon, setNotifyIcon] = useState('')
  const [notifyText, setNotifyText] = useState('')
  const [notify, setNotify] = useState()
  const [theme, setTheme] = useState('')
  const [themeIcon, setThemeIcon] = useState('')
  
  const ss = localStorage.getItem('actSection') || 's_home'
  const teamBox = document.querySelector('.team_box')
  let images = []
  let imagesLoaded = -1
  
  useEffect(() => {
	getIpInfo()
	getReviews()
    getTheme()
  }, [])
  

  // Show page
  const tcr = useRef()
  const pageContent = useRef()
  const scrollArea = useRef('')
  const loaderContainer = useRef('')
  const rootDir = window.location.pathname === '/'
  
  const showPage = ()=> {
	pageContent.current.style.opacity = "1"
	document.body.style.overflowY = "scroll"
	loaderContainer.current.style.display = 'none'
	document.removeEventListener("DOMContentLoaded", null)
  }

	const imageLoaded = ()=> {
	  const gsp = document.querySelector('.gossip')
	  const loaderPercentBar = document.querySelector('.loaderPercentBar')	  
	  imagesLoaded ++
	
	  const loadingPercent = `${Math.ceil(imagesLoaded / images.length * 100)}%`
	  loaderPercentBar.style.width = loadingPercent
	  //gsp.innerText = `${imagesLoaded} | L: ${images.length} | ${loadingPercent}`
	  setTimeout(()=> {
        loaderPercentBar.style.width = '100%'
        setTimeout(()=> {
          showPage()
        },2000)
      },10000)
	}

	if(reviews.length > 0) imagesLoaded += 1

	const checkLoadedMedia = ()=> {
	if(rootDir){
	images = document.querySelectorAll('img')	
	images.forEach((image)=>{
	  const exceptions = ['budget_icon_float']
	  if(!exceptions.includes(image.id)){
		image.addEventListener('touchstart', (e)=> {
		  e.preventDefault()
		  return image.removeEventListener('touchstart', null)
		})
	  }
	  
	  if(image.complete) imageLoaded()

	})
	}
	}

  useEffect(() => {
	document.addEventListener("DOMContentLoaded", checkLoadedMedia())
    if(rootDir && imagesLoaded === images.length){
	  setTimeout(()=> {
		showPage()
	  },2000)
	}
  },[images])
  
  //Get IP Info
  const getIpInfo = async ()=> {
	let ip = ''
    await fetch('https://api.ipify.org?format=json')
	  .then(res => res.json())
	  .then(res => ip = res.ip)
	  .catch((err)=> showNotification('err', err)
	await axios.post(`${server}/ipinfo`, {ip:ip})
	  .then(res => {
		const msg = `IP: ${res.data.ip} \n Country: ${res.data.location.country} \n ISP: ${res.data.isp.org}`
		showNotification('inf', msg)
	  })
  }
  
  // Get all reviews
  const getReviews =  async ()=> {
    await axios.get(URI)
      .then((res)=> {
    	setReviews(res.data.filter(r => r.enabled === true))
  	  })
      .catch((err)=> {
		showNotification('err', err.response?.data?.message || err.message)
      })
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
  

  // Notification Box
  const notifications = useRef()
  const ntf_icon = useRef()
  const ntf_text = useRef()

  const showNotification = (notiType, message) => {

    switch (notiType) {
      case "ok":
        setNotifyIcon(
          <div id="ntf_icon" className="ntf_icon">
            <FaCircleCheck style={{ color: 'green' }} />
          </div>
        )
        break
      case "err":
        setNotifyIcon(
          <div id="ntf_icon" className="ntf_icon" >
            <FaTriangleExclamation style={{ color: 'red' }} />
          </div>
        )
        break
      case "inf":
        setNotifyIcon(
          <div id="ntf_icon" className="ntf_icon">
            <FaCircleExclamation style={{ color: 'yellow' }} />
          </div>
        )
        break
      case "sys":
        setNotifyIcon(
          <div id="ntf_icon" className="ntf_icon spinn">
            <PiGearFill style={{ color: 'chocolate' }} />
          </div>
        )
        break
      default:
    }

    setNotifyText(<p>{message}</p>)
    notifications.current.style['transform'] = 'translate(-3%)'
    setTimeout(() => {
      notifications.current.style['transform'] = 'translate(102%)'
    }, 5000)
  }
  
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

    	{/* Notification */}
        <section className="s_notifications" ref={notifications} id="s_notifications">
      	  <div className="ntf_box" id="ntf_box">
        	<div className="ntf_msg" id="ntf_msg">
        	  <div className="ntf_icon">
				{notifyIcon}
        	  </div>
        	  <div className="ntf_text" ref={ntf_text} id="ntf_text">
				{notifyText}
        	  </div>
            </div>
          </div>
        </section>
        <br />

        <BrowserRouter forceRefresh={true}>
          <Routes>
        	<Route path='/' element={<CompMain mediaServer={mediaServer} reviews={reviews} getReviews={getReviews} notify={showNotification} ss={ss} />} />
            <Route path='/portfolio' element={<CompPortfolio mediaServer={mediaServer} ss={ss} notify={showNotification} reviews={reviews} />} />
	        <Route path='*' element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
        </div>
        <div className='footer'>
          <p id='footer' >Powered by KiniunDev™ - Copyright© {getYear()}</p>
        </div>
      </>
    </serverContext.Provider>
  )
}

export default App
