/* eslint-disable react-hooks/exhaustive-deps */
const metalRepair = "/media/images/metal_repair.webp"
const painting = "/media/images/painting.webp"
const preasureWashing = "/media/images/preasure_washing.webp"
const rescreening = "/media/images/rescreening.webp"

export const CompServices = ()=> {

  return (
    <>
  	  <nav id="s_services"></nav>
  	  <section className="services_container" id="services_container">
		<div className="services_box box" id="services_box">
		  <h2>Services</h2>
			<p>
			  Do you have <strong>a pool enclosure that needs to be checked</strong>? Or maybe <strong>your lanai needs a new
			  screen installed</strong>. Maybe <strong>your patio screen just needs to be fixed</strong>. If you're experiencing any of these issues, <strong>you've come
			  to the right place</strong>.
			</p>
			<p>
			  We are your <strong>Bradenton screen repair experts</strong>. We also regularly serve clients in <strong>Sarasota, St.
			  Petersburg, Orlando, Jacksonville, Englewood, North Port, Cape Coral, and Fort Myers</strong>. We have <strong>extensive
			  experience</strong> and pride ourselves on the <strong>quality workmanship of every pool service job</strong> we do and the <strong>high-quality products</strong> we
			  install.
			</p>
			<p>
			  We use only <strong>the best Phifer pool and patio screens</strong>. Our screens <strong>last 50% longer</strong> due to the quality of the product
			  we install and the care we take when installing them. All our services in general are carried out with <strong>the highest
			  quality in the market</strong>.
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
