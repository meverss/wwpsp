import './App.css'
import { React, useState, useRef, useEffect, createContext } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { getYear } from './libs/formatDate.js'
import { FaCircleCheck, FaTriangleExclamation, FaCircleExclamation } from "react-icons/fa6"
import { IoSunnyOutline, IoLogOutOutline } from "react-icons/io5"
import { RiMoonLine } from "react-icons/ri"
import { PiGearFill } from "react-icons/pi"

// Components
import CompHeaderTop from './components/CompHeaderTop.js'
import CompMenu from './components/CompMenu.js'
import CompBudgetFloat from './components/CompBudgetFloat.js'

//Pages
import { CompMain } from './pages/CompMain.js'
import { CompServices } from './pages/CompServices.js'

// Backend server
export const serverContext = createContext()
//const server = `http://${window.location.hostname}:4000/api`
const server = `https://wwpsp-server.vercel.app/api`

// App Component
const App = () => {
  const [notifyIcon, setNotifyIcon] = useState('')
  const [notifyText, setNotifyText] = useState('')
  const [notify, setNotify] = useState()
  const [theme, setTheme] = useState('')
  const [themeIcon, setThemeIcon] = useState('')

  useEffect(() => {
    getTheme()
  }, [])

  // Show page
  const pageContent = useRef()
  const loaderContainer = useRef()
  const rootDir = window.location.pathname === '/'

  const showPage = ()=> {
  if(loaderContainer.current){
	pageContent.current.style.opacity = "1"
	document.body.style.overflow = "auto"
  
	setTimeout(()=> {
	  loaderContainer.current.style.display = 'none'
	}, 700)

	if(!rootDir) loaderContainer.current.style.zIndex = '999'
  }}

  document.body.setAttribute("onLoad", showPage())

  // Trigger animation
  const boxes = document.querySelectorAll(".box")

  const triggerAnimation = (entries) => {
	entries.forEach((entry) => {
	  if (entry.isIntersecting) {
		entry.target.classList.remove("animate__animated", "animate__fadeOut", "hide")
		entry.target.classList.add("animate__animated", "animate__fadeIn", "show")
		obBoxes.unobserve(entry.target)
	  } else {
		entry.target.classList.remove("animate__animated", "animate__fadeIn", "show")
		entry.target.classList.add("animate__animated", "animate__fadeOut", "hide")
	  }
	})
  }

  const options = {
	root: null,
	rootMargin: "-150px",
	//threshold: .5
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

  const getTheme = () => {
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
  const url_telegram = "https://telegram.me/share/url?url=" + my_website + "&text = " + my_title
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
    }, 2500)
  }
    
  
  return (
    <serverContext.Provider value={server}>
      <>
    	<CompHeaderTop />
    	<CompMenu />

    	<div className="page_content" ref={pageContent} id="page_content">

    	{/* Loader */}
    	<div className="loader_container" ref={loaderContainer} id="loader_container" >
		  <div className='loader' ></div>
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
        	<Route path='/' element={<CompMain notify={showNotification} />} />
            <Route path='/portfolio' element={<CompServices notify={showNotification} />} />
	        <Route path='*' element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
        </div>
        <div className='footer'>
          <p id='footer' >Created by KiniunDev™ - Copyright© {getYear()}</p>
        </div>
        <CompBudgetFloat />
      </>
    </serverContext.Provider>
  )
}

export default App
