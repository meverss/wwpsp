/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react'
import metalRepair from "../media/images/metal_repair.webp"
import painting from "../media/images/painting.webp"
import preasureWashing from "../media/images/preasure_washing.webp"
import rescreening from "../media/images/rescreening.webp"

const CompServices = ()=> {

  return (
    <>
  	  <nav id="s_services"></nav>
  	  <section className="services_container" id="services_container">
		<div className="services_box box" id="services_box">
		  <h2>Services</h2>
			<p>
			  Do you have a pool enclosure that needs to be checked? Or maybe your lanai needs a new
			  screen installed. Maybe your
			  patio screen just needs to be fixed. If you're experiencing any of these issues, you've come
			  to the right place. We are
			  your Bradenton screen repair experts. We also regularly serve clients in Sarasota, St.
			  Petersburg, Orlando,
			  Jacksonville, Englewood, North Port, Cape Coral, and Fort Myers. We have extensive
			  experience and pride ourselves on the
			  quality workmanship of every pool service job we do and the high-quality products we
			  install. We use only the best
			  Phifer pool and patio screens. Our screens last 50% longer due to the quality of the product
			  we install and the care we
			  take when installing them. All our services in general are carried out with the highest
			  quality in the market.
			</p>
		  </div>
		  <article className="e_services" id="e_services">
			<div className="e_services_cards_box" id="e_services_cards_box" >
			  <div className="e_services_card box" id="e_service_metal">
				<span data-lightbox='services'
				  data-title='Metal repair' className="e_services_img">
				  <img src={metalRepair} loading="lazy" alt="Metal repair" />
				</span>
				<p> METAL REPAIR </p>
			  </div>
			  <div className="e_services_card box" id="e_service_painting">
				<span data-lightbox='services' data-title='Painting'
				  className="e_services_img">
				  <img src={painting} loading="lazy" alt="Metal repair" />
				</span>
				<p> PAINTING </p>
			  </div>
			  <div className="e_services_card box" id="e_service_washing">
				<span data-lightbox='services'
				  data-title='Preasure washing' className="e_services_img">
				  <img src={preasureWashing} loading="lazy" alt="Metal repair" />
				</span>
				<p> PREASURE WASHING </p>
			  </div>
			  <div className="e_services_card box" id="e_service_rescreening">
				<span data-lightbox='services'
				  data-title='Rescreening' className="e_services_img">
				  <img src={rescreening} loading="lazy" alt="Metal repair" />
				</span>
				<p> RESCREENING </p>
			  </div>
			</div>
		  </article>
	  </section>
    </>
  )
}

export default CompServices