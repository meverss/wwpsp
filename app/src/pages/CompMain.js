/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CompServices from './CompServices.js'
import CompOurTeam from './CompOurTeam.js'
import CompReviews from './CompReviews.js'
import CompContactUs from './CompContactUs.js'
import { CompMenu } from '../components/CompMenu.js'
import { CompBudgetFloat } from '../components/CompBudgetFloat.js'
import { FaCircleCheck, FaTriangleExclamation, FaCircleExclamation } from "react-icons/fa6"
import { IoSunnyOutline, IoLogOutOutline } from "react-icons/io5"
import { RiMoonLine } from "react-icons/ri"
import { PiGearFill } from "react-icons/pi"

import aboutThumb from "../media/images/about_thumb.webp"
import freeConsultation from "../media/images/free_consultation.svg"
import experiencedTechnician from "../media/images/experienced_technician.svg"
import qualityParts from "../media/images/parts_quality.svg"
import workGuaranteed from "../media/images/work_guaranteed.svg"
import serviceOnTime from "../media/images/service_on_time.svg"
import majorBrands from "../media/images/cover_major_brands.svg"
import metalRepair from "../media/images/metal_repair.webp"
import painting from "../media/images/painting.webp"
import preasureWashing from "../media/images/preasure_washing.webp"
import rescreening from "../media/images/rescreening.webp"

const CompMain = ({ getReviews, reviews, notify, selSection, setSelSection, ss }) => {
  const [sesServices, setSesServices] = useState('')
  const [sesTeam, setSesTeam] = useState('')
  const [sesReviews, setSesReviews] = useState('')
  const [sesContact, setSesContact] = useState('')
  const [navs, setNavs] = useState([])
  const [maxHeight, setMaxHeight] = useState('')

  const s_home = useRef('')
  const s_about_us = useRef('')
  const main = useRef('')
  let rHeight = useRef('')
  const gossip = useRef('')
  const navigate = useNavigate()  
  
  useEffect(()=>{
//	navigate(`/#${ss}`)
//	localStorage.removeItem('actSection')
  },[])

  useEffect(()=>{
	getNavPos()
  },[sesServices,sesTeam,sesReviews,sesContact])

  useEffect(()=> setMaxHeight(document.documentElement.scrollHeight),[navs])

  // Set navigators
  const getNavPos = ()=> {
    const sesHome = s_home.current.offsetTop
    const sesAbout = s_about_us.current.offsetTop
    
	  setNavs({
		's_welcome':{'pos': sesHome},
		's_about_us':{'pos': sesAbout},
		's_services':{'pos': sesServices},
		's_our_team':{'pos': sesTeam},
		's_reviews':{'pos': sesReviews},
		's_contact_us':{'pos': sesContact}
	  })
	  main.current.style.height = maxHeight 
  }
  
  return (
    <>
  	  <CompMenu navs={navs} ss={ss} getNavPos={getNavPos} />
	  <section className="main" id="main_container" ref={main}>
		
		{/* Welcome! */}
		<nav id="s_home" ref={s_home}></nav>		
		<section className="welcome box" id="welcome">
		  <h2 className="welcome_title" id="welcome_title">Welcome!</h2>
		  <p className="welcome_msg" id="welcome_msg">
			<span style={{fontWeight: 'bold'}}>WWP SCREENING & PAINTING LLC </span>team is available to provide
			you
			with skilled and affordable services
			that are tailored to
			your specific needs and schedule. Based in the State of Florida, we are proficient with a number
			of
			different makes and
			models. When you want quality restoration and repair work done right the first time and at a
			great
			price, contact us. We
			are here to offer our clients nothing but the best.
		  </p>
		</section>
		<br /><br />

		{/* About Us */}
		<nav id="s_about_us" ref={s_about_us}></nav>
		<section className="s_about_us box" id="s_about_us">
		  <div className="about_us_box" id="about_us_box">
			<h2 className="about_us_title" id="about_us_title">About Us</h2>
			<div className="about_us_content box">
			<div className="about_us_img box" id="about_us_img">
			  <img src={aboutThumb} alt="Working at WWP Screening & Painting LLC" />
			</div>
			<div className="about_us_text box" id="about_us_text">
			  <p>
				<span style={{fontWeight: 'bold'}}> WWP SCREENING & PAINTING LLC</span> was founded in
				2021, with one mission, to be the highest
				quality
				Pool Repair Service in the
				State of Florida. Our passion for excellence is what inspired us to set up our business,
				and
				it
				continues to drive us to
				this day. All of our repairs are completed with meticulous detail, resulting in a
				product
				that
				is as good as new.
			  </p>
			</div>
			</div>
		  </div>
		</section>
		
		{/* Why choosing us? */}
		<article className="s_why_us box" id="s_why_us">
		  <h2 className="why_us_title" id="why_us_title">Why choosing us?</h2>
		  <div className="why_us_box" id="why_us_box">
			<p className="why_us_text" id="why_us_text">
			  The State of Florida has a high demand for services related to
			  the construction, repair and maintenance of pool protective screens, but here we give six
			  powerful
			  reasons why <span style={{fontWeight: 'bold'}}>WWP SCREENING &
				PAINTING LLC</span> stands out among
			  the competition, and why choosing us will be a smart investment:
			</p>
			<div className="why_us_cards" id="why_us_cards">
			  <div className="card box" id="free_consultation">
				<img src={freeConsultation} alt="consultation" srcset="" />
				<p className="card_text"> Free consultation </p>
			  </div>
			  <div className="card box" id="experienced_technicians">
				<img src={experiencedTechnician} alt="experience" srcset="" />
				<p className="card_text"> Experienced technicians</p>
			  </div>
			  <div className="card box" id="parts_quality">
				<img src={qualityParts} alt="parts qulity" srcset="" />
				<p className="card_text"> Parts quality guarantee </p>
			  </div>
			  <div className="card box" id="work_waranteed">
				<img src={workGuaranteed} alt="work guaranteed" srcset="" />
				<p className="card_text"> All work guaranteed </p>
			  </div>
			  <div className="card box" id="service_on_time">
				<img src={serviceOnTime} alt="service on time" srcset="" />
				<p className="card_text"> Service on time </p>
			  </div>
			  <div className="card box" id="cover_major_brands">
				<img src={majorBrands} alt="cover mayor brands" srcset="" />
				<p className="card_text"> We cover all major brands </p>
			  </div>
			</div>
		  </div>
		</article>
		<CompServices sesServices={sesServices} setSesServices={setSesServices} mh={maxHeight} />
		<CompOurTeam sesTeam={sesTeam} setSesTeam={setSesTeam} mh={maxHeight} />
		<CompReviews sesReviews={sesReviews} setSesReviews={setSesReviews} getReviews={getReviews} reviews={reviews} notify={notify} mh={maxHeight} />
		<CompContactUs sesContact={sesContact} setSesContact={setSesContact} mh={maxHeight} />
		<CompBudgetFloat />
	  </section>
    </>
  )
}

export default CompMain  