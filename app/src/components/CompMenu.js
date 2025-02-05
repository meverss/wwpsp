import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getEscKey } from '../libs/getEscKey.js'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaRegNewspaper } from "react-icons/fa6"
import { FaHome, FaUsers, FaToolbox, FaPhotoVideo, FaMailBulk } from "react-icons/fa"
import { BsFillInfoCircleFill } from "react-icons/bs"
import { TfiMenu } from "react-icons/tfi"
import { MdClose } from "react-icons/md"
import { AiOutlineClose } from "react-icons/ai"

export const CompMenu = ({ navs, ss, path }) => {
  const [menuIcon, setMenuIcon] = useState(<TfiMenu />)
  const [menuHidden, setMenuHidden] = useState(true)

  const menuitems = document.querySelectorAll('.m_menu_item')
  const currentPath = window.location.pathname
  const sec = document.getElementById(ss)
  
  const s_portfolio = useRef()
  const s_m_portfolio = useRef()
  const encSection = encodeURIComponent(ss)
  
  useEffect(()=>{
	if(sec && currentPath !== '/portfolio'){
	  window.location.href = `${path}/#${encSection}`
	}
  },[document.querySelector(`#${ss}`)])

  // Scroll to Sections
  menuitems.forEach((e)=> {
	e.addEventListener('click', ()=> {
	  if(e.dataset.menuitem !== 's_portfolio'){
		localStorage.setItem('actSection', e.dataset.menuitem)
		const encSection = encodeURIComponent(e.dataset.menuitem)
		setTimeout(()=>{
		  window.location.href = `${path}/#${encSection}`
		},200)
	  } else {
		setTimeout(()=>{
		  window.location.href = `http://localhost:3000/portfolio`
		},200)
	  }
	})
  })

  // Sow/Hide Movile menu
  const m_menu_container = document.getElementById('m_menu_container')
  const m_menu = document.getElementById('m_menu')

  const showmenu = ()=> {
	if(m_menu_container){
	  const hideMenu = () => {
		setMenuIcon(<TfiMenu />)
		setMenuHidden(true)
		m_menu.style["transform"] = "translate(100%)"
		setTimeout(() => {
		  m_menu_container.style["display"] = "none"
		  m_menu_container.removeEventListener('click', null)
		}, 200)
	  }

	  if(menuHidden){
		m_menu_container.style["display"] = "flex"
		setTimeout(() => {
		  setMenuHidden(false)
		  setMenuIcon(<AiOutlineClose />)
		  m_menu.style["transform"] = "translate(0%)"
		}, 10)
	
	  } else {
		hideMenu()
	  }

	  getEscKey(hideMenu)
	  m_menu_container.addEventListener('click', hideMenu)
	}
  }

  
  return (
    <>
	  <section className="main_menu" id="main_menu">
		<div className="menu_bar" id="menu_bar">
		  <div className="menu" id="menu">
			<p className="menu_item" data-menuitem="s_home" id="welcome"><FaHome className="mIcon"/>&nbsp; HOME </p>
			<p className="menu_item" data-menuitem="s_about_us" id="about_us"><BsFillInfoCircleFill className="mIcon"/>&nbsp; About Us </p>
			<p className="menu_item" data-menuitem="s_services" id="services"><FaToolbox className="mIcon"/>&nbsp; Services </p>
			<p className="menu_item" data-menuitem="s_portfolio" id="portfolio" ref={s_portfolio}><FaPhotoVideo className="mIcon"/>&nbsp; Portfolio </p>
			<p className="menu_item" data-menuitem="s_our_team" id="our_team"><FaUsers className="mIcon"/>&nbsp; Our Team </p>
			<p className="menu_item" data-menuitem="s_reviews" id="reviews"><FaRegNewspaper className="mIcon"/>&nbsp; Reviews </p>
			<p className="menu_item" data-menuitem="s_contact_us" id="contact"><FaMailBulk className="mIcon"/>&nbsp; Contact Us </p>
		  </div>
		  <div className="social" id="social">
			<p className="social_item" id="facebook" title="Share on Facebook"><FaFacebookF /></p>
			<p className="social_item" id="twitter" title="Share on Twitter"><FaTwitter /></p>
			<p className="social_item" id="linkedin" title="Share on LinkedIn"><FaLinkedinIn /></p>
		  </div>
		  
		  {/* MOVILE MENU */}
		  <div className="m_menu_btn animate__animated animate__heartBeat" id="m_menu_btn" onClick={showmenu}>
			<span>{menuIcon}</span>
		  </div>
		  <div className="m_menu_container" id="m_menu_container">
			<div className="m_menu" id="m_menu">
			  <ul>
				<li className="m_menu_item" data-menuitem="s_home" id="m_welcome"><FaHome className="mIcon" />&nbsp;HOME</li>
				<li className="m_menu_item" data-menuitem="s_about_us" id="m_about_us"><BsFillInfoCircleFill className="mIcon" />&nbsp;About Us</li>
				<li className="m_menu_item" data-menuitem="s_services" id="m_services"><FaToolbox className="mIcon" />&nbsp;Services</li>
				<li className="m_menu_item" data-menuitem="s_portfolio" id="m_portfolio" ref={s_m_portfolio}><FaPhotoVideo className="mIcon" />&nbsp;Portfolio</li>
				<li className="m_menu_item" data-menuitem="s_our_team" id="m_our_team"><FaUsers className="mIcon" />&nbsp;Our Team</li>
				<li className="m_menu_item" data-menuitem="s_reviews" id="m_reviews"><FaRegNewspaper className="mIcon" />&nbsp;Reviews</li>
				<li className="m_menu_item" data-menuitem="s_contact" id="m_contact_us"><FaMailBulk className="mIcon" />&nbsp;Contact Us</li>
				
			  </ul>
			</div>
		  </div>
		</div>
	  </section>
    </>
  )
}
