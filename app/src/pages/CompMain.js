/* eslint-disable react-hooks/exhaustive-deps */
import { useRef } from 'react'
import { CompServices } from './CompServices.js'
import { CompOurTeam } from './CompOurTeam.js'
import { CompReviews } from './CompReviews.js'
import { CompContactUs } from './CompContactUs.js'
import { CompMenu } from '../components/CompMenu.js'
import { CompBudgetFloat } from '../components/CompBudgetFloat.js'

const CompMain = ({ getReviews, reviews, showNotification }) => {
  const mainContainer = useRef('')
  const aboutThumb = '/media/images/about_thumb.webp'
  const freeConsultation = '/media/images/free_consultation.svg'
  const experiencedTechnician = '/media/images/experienced_technician.svg'
  const qualityParts = '/media/images/parts_quality.svg'
  const workGuaranteed = '/media/images/work_guaranteed.svg'
  const serviceOnTime = '/media/images/service_on_time.svg'
  const majorBrands = '/media/images/cover_major_brands.svg'

  return (
    <>
  	  <CompMenu />
	  <section className="main" id="main_container" ref={mainContainer} data-theme="dark" >
		<div style={{position: 'absolute', left: '0', width: '100%', margin: '0', paddingLeft: '10px', paddingRight: '10px', paddingBottom: '250px'}}>
	
		{/* Welcome! */}
		<nav id="s_home"></nav>
		<section className="welcome box" id="welcome">
		  <h2 className="welcome_title" id="welcome_title">Welcome!</h2>
		  <p className="welcome_msg" id="welcome_msg">
			<strong>WWP SCREENING & PAINTING LLC</strong> team is available to provide
			you	with <strong>skilled and affordable services</strong> that are <strong>tailored to your specific needs and schedule</strong>. Based in the State of Florida, we are proficient with a number
			of different makes and models. When you want quality restoration and repair work done right the first time and at a
			<strong> great price</strong>, contact us. We are here to offer our clients <strong>nothing but the best</strong>.
		  </p>
		</section>

		{/* About Us */}
		<nav id="s_about_us"></nav>
		<section className="s_about_us box" id="s_about_us">
		  <article className="about_us_box" id="about_us_box">
			<h2 className="about_us_title" id="about_us_title">About Us</h2>
			<div className="about_us_content">
			<div className="about_us_img" id="about_us_img">
			  <img src={aboutThumb} id="aboutThumb" loading="lazy" alt="Working at WWP Screening & Painting LLC" />
			</div>
			<div className="about_us_text" id="about_us_text">
			  <p>
				<strong> WWP SCREENING & PAINTING LLC</strong> was founded in
				2021, with one mission: <strong>to be the highest
				quality	Pool Repair Service in the
				State of Florida</strong>. Our passion for excellence is what inspired us to set up our business,
				and	it continues to drive us to	this day. All of our repairs are <strong>completed with meticulous detail</strong>, resulting in a
				product	that is <strong>as good as new</strong>.
			  </p>
			</div>
			</div>
		  </article>
		
		{/* Why choosing us? */}
		<article className="s_why_us box" id="s_why_us">
		  <h2 className="why_us_title" id="why_us_title">Why choosing us?</h2>
		  <div className="why_us_box" id="why_us_box">
			<p className="why_us_text" id="why_us_text">
			  The State of Florida has a high demand for services related to
			  the construction, repair and maintenance of pool protective screens, but here we give you <strong>six
			  powerful reasons</strong> why <strong>WWP SCREENING & PAINTING LLC</strong> stands out among
			  the competition, and why choosing us will be a smart investment:
			</p>
			<div className="why_us_cards" id="why_us_cards">
			  <div className="card box" id="free_consultation">
				<img src={freeConsultation} alt="consultation" />
				<p className="card_text"> Free consultation </p>
			  </div>
			  <div className="card box" id="experienced_technicians">
				<img src={experiencedTechnician} alt="experience" />
				<p className="card_text"> Experienced technicians</p>
			  </div>
			  <div className="card box" id="parts_quality">
				<img src={qualityParts} alt="parts qulity" />
				<p className="card_text"> Parts quality guarantee </p>
			  </div>
			  <div className="card box" id="work_waranteed">
				<img src={workGuaranteed} alt="work guaranteed" />
				<p className="card_text"> All work guaranteed </p>
			  </div>
			  <div className="card box" id="service_on_time">
				<img src={serviceOnTime} alt="service on time" />
				<p className="card_text"> Service on time </p>
			  </div>
			  <div className="card box" id="cover_major_brands">
				<img src={majorBrands} alt="cover mayor brands" />
				<p className="card_text"> We cover all major brands </p>
			  </div>
			</div>
		  </div>
		</article>
		</section>
		<CompServices />
		<CompOurTeam showNotification={showNotification}/>
		<CompReviews mainContainer={mainContainer.current} getReviews={getReviews} reviews={reviews} showNotification={showNotification} />
		<CompContactUs showNotification={showNotification} />
		<CompBudgetFloat showNotification={showNotification} />
		</div>
	  </section>
    </>
  )
}

export default CompMain  