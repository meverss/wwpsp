/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { serverContext } from '../App.js'
import { useState, useEffect, useRef, useContext } from 'react'
import { smoothDragScroll } from '../libs/smoothDragScroll.js'

const CompOurTeam = () => {
  const server = useContext(serverContext)
  const URI = `${server}/workers/`
  
  const [workers, setWorkers] = useState([])

  const team_box = useRef('')
  const team_member = document.querySelectorAll('.team_member')
  let team_cards = []
  let cardsToShow = []

  useEffect(()=>{
	getWorkers()
  },[])
  
  const getWorkers = async ()=> {
	const res = await axios.get(URI)
	setWorkers(res.data)
  }
  
  const animateScroll = ()=> {
	const parentRectLeft = Math.round(team_box.current.getBoundingClientRect().left)
	const boxWidth = Number(getComputedStyle(team_box.current).width.split('px')[0])
	const centerPos = parentRectLeft + (boxWidth / 2)
	//document.querySelector('#gossip').innerHTML = teamCards.length

  	document.querySelectorAll('.team_card').forEach((card)=> {
	  const intercepting = Math.round(card.getBoundingClientRect().left) >= (centerPos - 75) && Math.round(card.getBoundingClientRect().left) <= (centerPos + 10)
	  if(intercepting){
		document.querySelector('#name').innerText = card.children[1].children[0].innerText
		document.querySelector('#job').innerText = card.children[1].children[1].innerText

		card.children[0].children[0].classList.remove('anim_image_shrink')
		card.children[0].children[0].classList.add('anim_image_grow')
	  } else {
		card.children[0].children[0].classList.remove('anim_image_grow')
		card.children[0].children[0].classList.add('anim_image_shrink')
	  }

	  if(card.getBoundingClientRect().left < (team_box.current.getBoundingClientRect().left + (window.innerWidth <= 640 ? - 70 : -40)) || card.getBoundingClientRect().left > Number(getComputedStyle(team_box.current).width.split('px')[0]) + (window.innerWidth > 640 ? - 40 : 130)){
		card.style.opacity = '0'
	  } else {
	  	card.style.opacity = '1'
	  }
  	})
  }

  const addMoreCardsRight = ()=> {
  	cardsToShow.push(...team_cards)
  	cardsToShow.forEach((card)=> {
	  const newCard = card.cloneNode(true)
	  newCard.setAttribute('id',`card${document.querySelectorAll('.team_card').length + 1}`)
	  newCard.classList.add('anim_image_shrink')
	  newCard.addEventListener('touchstart', (e)=>{
		e.preventDefault()
	  })
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
		newCard.addEventListener('touchstart', (e)=>{
		  e.preventDefault()
		})
		team_box.current.insertBefore(newCard, firstCard)
  	  })
  	  team_box.current.style.overflow = 'hidden'
  	  setTimeout(()=>{
  		team_box.current.style.overflow = 'auto'
  	  },10) 
  	  cardsToShow = []
	}

	if(team_box.current){
	  team_box.current.addEventListener('scroll', ()=>{
  		if (team_box.current.scrollLeft + team_box.current.clientWidth >= team_box.current.scrollWidth - 145){
    	  addMoreCardsRight()
  		}
  		if (team_box.current.scrollLeft <= 145){
		  addMoreCardsLeft()
  		}
  		animateScroll()
	  })
	}

	const startInfiniteLoop = ()=> {
  	  addMoreCardsLeft()
  	  animateScroll()

	  setInterval(()=> {
  		const width = (getComputedStyle(document.querySelector('#card1')).width).split('px')[0]
		const teamMemberText = document.querySelectorAll('.team_member_text')
  		team_box.current.scrollBy({left: width})
		
		teamMemberText.forEach(tmt => {
		  tmt.classList.remove("animate__animated", "animate__fadeOut")
		  tmt.classList.add("animate__animated", "animate__fadeIn")

		  setTimeout(()=>{
			tmt.classList.remove("animate__animated", "animate__fadeIn")
			tmt.classList.add("animate__animated", "animate__fadeOut")
		  },2700)
		})
	  },3000)
	}
  
  useEffect(()=>{
	team_cards = document.querySelectorAll('.team_card')
	if(workers.length !== 0){
  	  startInfiniteLoop()
  	}
  },[workers.length])

  return (
    <>
	  <nav id="s_our_team"></nav>
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
		{ workers && workers.map((worker, index)=> (
		<div className="team_card" id={`card${index + 1}`} data-key={worker.id}>
	  	  <div className="team_card_img">
			<img className="team_member" src={`${server}${worker.image}`} alt={worker.name} />
	  	  </div>
	  	  <div className="team_card_text" id="team_card_text">
			<h3>{worker.name}</h3>
			<span>{worker.ocupation}</span>
	  	  </div>
		</div>
		))} 
	  </div>
	  </section>
    </>
  )
}

export default CompOurTeam