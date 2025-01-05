import { useState } from 'react'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaRegNewspaper } from "react-icons/fa6"
import { FaHome, FaUsers, FaToolbox, FaPhotoVideo, FaMailBulk } from "react-icons/fa"
import { BsFillInfoCircleFill } from "react-icons/bs"
import { TfiMenu } from "react-icons/tfi"
import { MdClose } from "react-icons/md"
import { AiOutlineClose } from "react-icons/ai"

const CompMenu = () => {
  const [menuIcon, setMenuIcon] = useState(<TfiMenu />)
  const [menuHidden, setMenuHidden] = useState(true)
  const getEscKey = (func) => {
	window.addEventListener("keydown", (event) => {
	  let k = event.key
	  if (k === 27 || k === "Escape" || k === "Esc") {
		func()
		window.removeEventListener("keydown", null)
	  }
	})
  }


  // Sow/Hide Movile menu
  const m_menu = document.getElementById('m_menu')
  const m_menu_container = document.getElementById('m_menu_container')

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
			<p className="menu_item" id="home"><FaHome className="mIcon"/>&nbsp; HOME </p>
			<p className="menu_item" id="services"><BsFillInfoCircleFill className="mIcon"/>&nbsp; About Us </p>
			<p className="menu_item" id="services"><FaToolbox className="mIcon"/>&nbsp; Services </p>
			<p className="menu_item" id="portfolio"><FaPhotoVideo className="mIcon"/>&nbsp; Portfolio </p>
			<p className="menu_item" id="reviews"><FaRegNewspaper className="mIcon"/>&nbsp; Reviews </p>
			<p className="menu_item" id="our_team"><FaUsers className="mIcon"/>&nbsp; Our Team </p>
			<p className="menu_item" id="contact_us"><FaMailBulk className="mIcon"/>&nbsp; Contact </p>
		  </div>
		  <div className="social" id="social">
			<p className="social_item" id="facebook" title="Share on Facebook"><FaFacebookF /></p>
			<p className="social_item" id="twitter" title="Share on Twitter"><FaTwitter /></p>
			<p className="social_item" id="linkedin" title="Share on LinkedIn"><FaLinkedinIn /></p>
		  </div>
		  
		  {/* MOVILE MENU */}
		  <div className="m_menu_btn animate__animated animate__zoomIn" id="m_menu_btn" onClick={showmenu}>
			<span>{menuIcon}</span>
		  </div>
		  <div className="m_menu_container" id="m_menu_container">
			<div className="m_menu" id="m_menu">
			  <ul>
				<li className="m_menu_item" id="m_home"><FaHome className="mIcon" />&nbsp;HOME</li>
				<li className="m_menu_item" id="m_services"><BsFillInfoCircleFill className="mIcon" />&nbsp;About Us</li>
				<li className="m_menu_item" id="m_services"><FaToolbox className="mIcon" />&nbsp;Services</li>
				<li className="m_menu_item" id="m_portfolio"><FaPhotoVideo className="mIcon" />&nbsp;Portfolio</li>
				<li className="m_menu_item" id="m_reviews"><FaRegNewspaper className="mIcon" />&nbsp;Reviews</li>
				<li className="m_menu_item" id="m_our_team"><FaUsers className="mIcon" />&nbsp;Our Team</li>
				<li className="m_menu_item" id="m_contact_us"><FaMailBulk className="mIcon" />&nbsp;Contact</li>
			  </ul>
			</div>
		  </div>
		</div>
	  </section>
    </>
  )
}

export default CompMenu