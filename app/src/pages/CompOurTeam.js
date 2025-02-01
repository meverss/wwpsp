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

const CompOurTeam = ({ sesTeam, setSesTeam, mh }) => {
  const s_our_team = useRef('')
  const team_box = useRef('')
  const team_cards = document.querySelectorAll('.team_card')
  const team_member = document.querySelectorAll('.team_member')
  const reference = document.getElementById('team_card_reference')
  let cardsToShow = []

  useEffect(()=>{
	const parentRectLeft = Math.round(team_box.current.getBoundingClientRect().left)
	const cardRectLeft = Math.round(team_box.current.children[window.innerWidth <= 700 ? 1:2].getBoundingClientRect().left)
	const centerPos = cardRectLeft - parentRectLeft + 10

	const animateTeamScroll = ()=> {
	  document.querySelectorAll('.team_card').forEach((card)=> {
		const centered = Math.round(card.getBoundingClientRect().left) >= (centerPos - 30) && Math.round(card.getBoundingClientRect().left) <= (centerPos + 30)
		  if(centered){
			document.querySelector('#name').innerText = card.children[1].children[0].innerText
			document.querySelector('#job').innerText = card.children[1].children[1].innerText

			card.children[0].children[0].classList.remove('anim_image_shrink')
			card.children[0].children[0].classList.add('anim_image_grow')
		  } else {
			card.children[0].children[0].classList.remove('anim_image_grow')
			card.children[0].children[0].classList.add('anim_image_shrink')
		  }
	  })
	}

	// Infinite scroll
	let loading = false
	const addMoreCardsRight = ()=> {
	  cardsToShow.push(...team_cards)
	  cardsToShow.forEach((card)=> {
		const newCard = card.cloneNode(true)
		newCard.setAttribute('id',`card${document.querySelectorAll('.team_card').length + 1}`)
		newCard.classList.add('anim_image_shrink')
		team_box.current.appendChild(newCard)
	  })
	  cardsToShow = []
	}

	const addMoreCardsLeft = ()=> {
	  cardsToShow.push(...team_cards)
	  const firstCard = document.getElementById(team_box.current.children[0].id)
	  cardsToShow.forEach((card)=> {
		const newCard = card.cloneNode(true)
		newCard.setAttribute('id',`card${document.querySelectorAll('.team_card').length + 1}`)
		newCard.classList.add('anim_image_shrink')
		team_box.current.insertBefore(newCard, firstCard)
	  })
	  team_box.current.style.overflow = 'hidden'
	  setTimeout(()=>{
	  team_box.current.style.overflow = 'auto'
	  },10)
	  cardsToShow = []
	}

	team_box.current.addEventListener('scroll', ()=>{
	//document.querySelector('#gossip').innerHTML = `ScrollLeft:${team_box.current.scrollLeft}<br /> ClientWidth:${team_box.current.clientWidth}<br /> ScrollWidth:${team_box.current.scrollWidth}`
	  if (team_box.current.scrollLeft + team_box.current.clientWidth >= team_box.current.scrollWidth - 130){
        addMoreCardsRight()
      }
	  if (team_box.current.scrollLeft === 130){
		addMoreCardsLeft()
      }
	  animateTeamScroll()
	},false)
	
	const startInfinitScroll = ()=> {
	  addMoreCardsLeft()
	  animateTeamScroll()

	setInterval(()=> {
	  const width = (getComputedStyle(document.querySelector('#card1')).width).split('px')[0]
	  team_box.current.scrollBy({left: width})
		document.querySelector('#name').classList.add("animate__animated", "animate__fadeInRight")
		document.querySelector('#job').classList.add("animate__animated", "animate__fadeInLeft")		

		setTimeout(()=>{
		  document.querySelector('#name').classList.remove("animate__animated", "animate__fadeInRight")
		  document.querySelector('#job').classList.remove("animate__animated", "animate__fadeInLeft")		
		},500)

	},4000)

	}
	
	team_box.current.onLoad = startInfinitScroll()
	

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
  
  return (
    <>
  	  <nav id="s_our_team" ref={s_our_team}></nav>
	  <section className="s_our_team box" id="s_our_team">
		  <h2 className="team_title" id="team_title">Our Team</h2>
		  <p>
		  We have an excellent staff of professionals, each one committed to offer our costumers a service that meets the highest quality standards.
		  </p>
		  <br />
		  <h3 className="team_member_text" id="name" style={{color: '#37a1c6', fontWeight: 'bold', width: '100%', fontSize: '100%'}}></h3>
		  <span className="team_member_text" id="job"></span>
		  <p id="gossip"></p>		  
		  <div className="team_box box" id="team_box" ref={team_box} >
			<div className="team_card" id="card1">
			  <div className="team_card_img">
				<img className="team_member" src={winta} alt="Walfrido Winta Pérez" />
			  </div>
			  <div className="team_card_text" id="team_card_text">
				<h3>Walfrido Winta Pérez</h3>
				<span>CEO & Co-Founder</span>
			  </div>
			</div>
			<div className="team_card" id="card2">
			  <div className="team_card_img">
				<img className="team_member" src={yoandra} alt="Yoandra Rodríguez Reyes" />
			  </div>
			  <div className="team_card_text" id="team_card_text">
				<h3>Yoandra Rodríguez Reyes</h3>
				<span>Marketing & Co-Founder</span>
			  </div>
			</div>
			<div className="team_card" id="card3">
			  <div className="team_card_img">
				<img className="team_member" src={yoander} alt="Yoander Góngora Rodríguez" />
			  </div>
			  <div className="team_card_text" id="team_card_text">
				<h3>Yoander Góngora Rodríguez</h3>
				<span>Manager & Logistics</span>
			  </div>
			</div>
			<div className="team_card" id="card4">
			  <div className="team_card_img">
				<img className="team_member" src={tasha} alt="Tasha Bolton" />
			  </div>
			  <div className="team_card_text" id="team_card_text">
				<h3>Tasha Bolton</h3>
				<span>Secretary</span>
			  </div>
			</div>
			<div className="team_card" id="card5">
			  <div className="team_card_img">
				<img className="team_member" src={joshua} alt="Joshua Washington" />
			  </div>
			  <div className="team_card_text" id="team_card_text">
				<h3>Joshua Wasington</h3>
				<span>Welder</span>
			  </div>
			</div>
			<div className="team_card" id="card6">
			  <div className="team_card_img">
				<img className="team_member" src={igor} alt="Igor Jovovich" />
			  </div>
			  <div className="team_card_text" id="team_card_text">
				<h3>Igor Jovovich</h3>
				<span>Welder</span>
			  </div>
			</div>
			<div className="team_card" id="card7">
			  <div className="team_card_img">
				<img className="team_member" src={cinthia} alt="Cinthia Smithson" />
			  </div>
			  <div className="team_card_text" id="team_card_text">
				<h3>Cinthia Smithson</h3>
				<span>Painter</span>
			  </div>
			</div>
			<div className="team_card" id="card8">
			  <div className="team_card_img">
				<img className="team_member" src={elon} alt="Elon Roquefuente" />
			  </div>
			  <div className="team_card_text" id="team_card_text">
				<h3>Elon Roquefuente</h3>
				<span>Fence Builder</span>
			  </div>
			</div>
			<div className="team_card" id="card9">
			  <div className="team_card_img">
				<img className="team_member" src={stephen} alt="Stephen McNamara" />
			  </div>
			  <div className="team_card_text" id="team_card_text">
				<h3>Stephen McNamara</h3>
				<span>Fence Builder</span>
			  </div>
			</div>
		  </div>
		</section>
    </>
  )
}

export default CompOurTeam