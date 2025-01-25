// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import winta from "../media/images/team/winta.jpg"
import yoandra from "../media/images/team/yoandra.jpg"
import yoander from "../media/images/team/yoander.jpg"
import elon from "../media/images/team/elon.jpg"
import joshua from "../media/images/team/joshua.jpg"
import cinthia from "../media/images/team/cinthia.jpg"
import igor from "../media/images/team/igor.jpg"
import tasha from "../media/images/team/tasha.jpg"
import stephen from "../media/images/team/stephen.jpg"

// Import Swiper styles
import 'swiper/css/bundle'

export default ()=> {

  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={window.innerWidth <= 640 ? 2: 3}
      classname="box"
    >
      <SwiperSlide>
	  <div className="team_card">
	    <div className="team_card_img">
		<img className="team_member" src={winta} alt="Walfrido Winta Pérez" />
	    </div>
	    <hr />
	    <div className="team_card_text" id="team_card_text">
		<h3>Walfrido Winta P.</h3>
		<span>CEO & Co-Founder</span>
	    </div>
	  </div>
      </SwiperSlide>
      <SwiperSlide>
	  <div className="team_card">
	    <div className="team_card_img">
		<img className="team_member" src={yoandra} alt="Yoandra Rodríguez Reyes" />
	    </div>
	    <hr />
	    <div className="team_card_text" id="team_card_text">
		<h3>Yoandra Rodríguez R.</h3>
		<span>Marketing & Co-Founder</span>
	    </div>
	  </div>
      </SwiperSlide>
      <SwiperSlide>
	  <div className="team_card">
	    <div className="team_card_img">
		<img className="team_member" src={yoander} alt="Yoander Góngora Rodríguez" />
	    </div>
	    <hr />
	    <div className="team_card_text" id="team_card_text">
		<h3>Yoander Góngora R.</h3>
		<span>Manager & Logistics</span>
	    </div>
	  </div>
      </SwiperSlide>
      <SwiperSlide>
	  <div className="team_card">
	    <div className="team_card_img">
		<img className="team_member" src={tasha} alt="Tasha Bolton" />
	    </div>
	    <hr />
	    <div className="team_card_text" id="team_card_text">
		<h3>Tasha Bolton</h3>
		<span>Secretary</span>
	    </div>
	  </div>
      </SwiperSlide>
      <SwiperSlide>
	  <div className="team_card">
	    <div className="team_card_img">
		<img className="team_member" src={joshua} alt="Joshua Washington" />
	    </div>
	    <hr />
	    <div className="team_card_text" id="team_card_text">
		<h3>Joshua Wasington</h3>
		<span>Welder</span>
	    </div>
	  </div>
      </SwiperSlide>
      <SwiperSlide>
	  <div className="team_card">
	    <div className="team_card_img">
		<img className="team_member" src={igor} alt="Igor Jovovich" />
	    </div>
	    <hr />
	    <div className="team_card_text" id="team_card_text">
		<h3>Igor Jovovich</h3>
		<span>Welder</span>
	    </div>
	  </div>
      </SwiperSlide>
      <SwiperSlide>
	  <div className="team_card">
	    <div className="team_card_img">
		<img className="team_member" src={cinthia} alt="Cinthia Smithson" />
	    </div>
	    <hr />
	    <div className="team_card_text" id="team_card_text">
		<h3>Cinthia Smithson</h3>
		<span>Painter</span>
	    </div>
	  </div>
      </SwiperSlide>
      <SwiperSlide>
	  <div className="team_card">
	    <div className="team_card_img">
		<img className="team_member" src={elon} alt="Elon Roquefuente" />
	    </div>
	    <hr />
	    <div className="team_card_text" id="team_card_text">
		<h3>Elon Roquefuente</h3>
		<span>Fence Builder</span>
	    </div>
	  </div>
      </SwiperSlide>
      <SwiperSlide>
	  <div className="team_card">
	    <div className="team_card_img">
		<img className="team_member" src={stephen} alt="Stephen McNamara" />
	    </div>
	    <hr />
	    <div className="team_card_text" id="team_card_text">
		<h3>Stephen McNamara</h3>
		<span>Fence Builder</span>
	    </div>
	  </div>
      </SwiperSlide>
    </Swiper>
  )
}