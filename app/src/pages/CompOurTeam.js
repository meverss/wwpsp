/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react'
import { smoothDragScroll } from '../libs/smoothDragScroll.js'
import winta from "../media/images/team/winta.jpg"
import yoandra from "../media/images/team/yoandra.jpg"
import yoander from "../media/images/team/yoander.jpg"
import elon from "../media/images/team/elon.jpg"
import joshua from "../media/images/team/joshua.jpg"
import cinthia from "../media/images/team/cinthia.jpg"
import igor from "../media/images/team/igor.jpg"
import tasha from "../media/images/team/tasha.jpg"
import stephen from "../media/images/team/stephen.jpg"

const CompOurTeam = ({ sesTeam, setSesTeam, mh, gossip }) => {
  const s_our_team = useRef('')
  const team_box = useRef('')
  const team_card = document.querySelectorAll('.team_card')
  const team_member = document.querySelectorAll('.team_member')
  const reference = document.getElementById('.team_card_reference')

  useEffect(()=>{
	smoothDragScroll(team_box.current)
  },[team_box.current])
  
  useEffect(()=>{
    getNavPos()
  },[mh])
  
  // Set navigators
  const getNavPos = ()=> {
    const pos = s_our_team.current.offsetTop
    if(s_our_team.current){
      setSesTeam(pos)
    }
  }
  
  // Trigger animation
  const triggerAnimation = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("anim_image_shrink")
        entry.target.classList.add("anim_image_grow")
      } else {
        entry.target.classList.remove("anim_image_grow")
        entry.target.classList.add("anim_image_shrink")
      }
    })
  }

  const options = {
  root: null, //reference,
  //rootMargin: "-10px",
  threshold: 1
  }

  const obImages = new IntersectionObserver(triggerAnimation, options)

  useEffect(()=>{
  if(team_member.length > 0){
	team_member.forEach((t) => {
  	  obImages.observe(t)
	})
  }
  },[team_member])
  
  return (
    <>
  	  <nav id="s_our_team" ref={s_our_team}></nav>
	  <section className="s_our_team box" id="s_our_team">
		  <h2 className="team_title" id="team_title">Our Team</h2>
		  <p>
		  We have an excellent staff of professionals, each one commited to offer our costumers a service that meets the highest quality standards.
		  </p>
		  <div className="team_box box" id="team_box" ref={team_box} >
			<div className="team_card"></div>
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
			<div className="team_card"></div>
		  </div>
		</section>
    </>
  )
}

export default CompOurTeam