import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getEscKey } from '../libs/getEscKey.js'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaRegNewspaper } from "react-icons/fa6"
import { FaHome, FaUsers, FaToolbox, FaPhotoVideo, FaMailBulk } from "react-icons/fa"
import { BsFillInfoCircleFill } from "react-icons/bs"
import { TfiMenu } from "react-icons/tfi"
import { MdClose } from "react-icons/md"
import { AiOutlineClose } from "react-icons/ai"

export const CompMenu = ()=> {
  const [menuIcon, setMenuIcon] = useState(<TfiMenu />)
  const [menuHidden, setMenuHidden] = useState(true)
  
  const sectionLinks = document.querySelectorAll('.section_link')
  const m_menu_container = useRef(null)
  const m_menu = useRef(null)
  const menuBar = useRef(null)
  const actSection = localStorage.getItem('actSection')

  // Scroll to Sections
  sectionLinks.forEach((e)=> {
	e.addEventListener('click', ()=> {
	  const section = e.dataset.menuitem
	  const encSection = encodeURIComponent(section)
	  const path = window.location.pathname

	  localStorage.setItem('actSection', section)

	  if(section !== 's_portfolio'){
		window.location = `/#${encSection}`
	  } else if(!path.includes('portfolio')){
		window.location = `/portfolio`
	  }
	  if(section === 's_portfolio' && path.includes('portfolio')) return
	  return e.removeEventListener('click', null)
	})
  })
  
  // Sow/Hide Mobile Menu
  const showMenu = ()=> {
	if(m_menu_container.current){
	  const hideMenu = ()=> {
		setMenuIcon(<TfiMenu />)
		setMenuHidden(true)
		m_menu.current.style["transform"] = "translate(100%)"
		setTimeout(()=> {
		  m_menu_container.current.style["display"] = "none"
		  m_menu_container.current.removeEventListener('click', null)
		}, 200)
	  }

	  if(menuHidden){
		m_menu_container.current.style["display"] = "flex"
		setTimeout(() => {
		  setMenuHidden(false)
		  setMenuIcon(<AiOutlineClose />)
		  m_menu.current.style["transform"] = "translate(0%)"
		}, 100)
	
	  } else {
		hideMenu()
	  }

	  getEscKey(hideMenu)
	  m_menu_container.current.addEventListener('click', hideMenu)
	}
	m_menu_container.current.removeEventListener('click', null)
  }

  return (
    <>
	  <section className="s_menu_bar" id="s_menu_bar">
		<div className="menu_bar" id="menu_bar" ref={menuBar}>
		  <div className="menu" id="menu">
			<p className="menu_item section_link" data-menuitem="s_home" id="welcome"><FaHome className="mIcon"/>&nbsp;HOME </p>
			<p className="menu_item section_link" data-menuitem="s_about_us" id="about_us"><BsFillInfoCircleFill className="mIcon"/>&nbsp;About Us </p>
			<p className="menu_item section_link" data-menuitem="s_services" id="services"><FaToolbox className="mIcon"/>&nbsp;Services </p>
			<p className="menu_item section_link" data-menuitem="s_portfolio" id="portfolio"><FaPhotoVideo className="mIcon"/>&nbsp;Portfolio </p>
			<p className="menu_item section_link" data-menuitem="s_our_team" id="our_team"><FaUsers className="mIcon"/>&nbsp;Our Team </p>
			<p className="menu_item section_link" data-menuitem="s_reviews" id="reviews"><FaRegNewspaper className="mIcon"/>&nbsp;Reviews </p>
			<p className="menu_item section_link" data-menuitem="s_contact" id="contact"><FaMailBulk className="mIcon"/>&nbsp;Contact Us </p>
		  </div>
		  <div className="social" id="social">
			<p className="social_item" id="facebook" title="Share on Facebook"><FaFacebookF /></p>
			<p className="social_item" id="twitter" title="Share on Twitter"><FaTwitter /></p>
			<p className="social_item" id="linkedin" title="Share on LinkedIn"><FaLinkedinIn /></p>
		  </div>
		  
		  {/* MOVILE MENU */}
		  <div className="m_menu_btn animate__animated animate__heartBeat" id="m_menu_btn" onClick={showMenu}>
			<span>{menuIcon}</span>
		  </div>
		  <div className="m_menu_container" id="m_menu_container" ref={m_menu_container}>
			<div className="m_menu" id="m_menu" ref={m_menu}>
			  <ul>
				<li className="m_menu_item section_link" data-menuitem="s_home" id="m_welcome"><FaHome className="mIcon" />&nbsp;HOME</li>
				<li className="m_menu_item section_link" data-menuitem="s_about_us" id="m_about_us"><BsFillInfoCircleFill className="mIcon" />&nbsp;About Us</li>
				<li className="m_menu_item section_link" data-menuitem="s_services" id="m_services"><FaToolbox className="mIcon" />&nbsp;Services</li>
				<li className="m_menu_item section_link" data-menuitem="s_portfolio" id="m_portfolio"><FaPhotoVideo className="mIcon" />&nbsp;Portfolio</li>
				<li className="m_menu_item section_link" data-menuitem="s_our_team" id="m_our_team"><FaUsers className="mIcon" />&nbsp;Our Team</li>
				<li className="m_menu_item section_link" data-menuitem="s_reviews" id="m_reviews"><FaRegNewspaper className="mIcon" />&nbsp;Reviews</li>
				<li className="m_menu_item section_link" data-menuitem="s_contact" id="m_contact_us"><FaMailBulk className="mIcon" />&nbsp;Contact Us</li>
			  </ul>
			</div>
		  </div>
		</div>
	  </section>
    </>
  )
}
