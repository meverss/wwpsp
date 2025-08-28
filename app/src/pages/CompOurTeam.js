/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { serverContext } from '../App.js'
import { useState, useEffect, useRef, useContext } from 'react'
import { smoothDragScroll } from '../libs/smoothDragScroll.js'

const CompOurTeam = ({ mediaServer, showNotification }) => {
  const server = useContext(serverContext)
  const URI = `${server}/workers/`
  
  const [workers, setWorkers] = useState([])
  const [cenPos, setCenPos] = useState()

  const team_box = useRef('')
  const team_member = document.querySelectorAll('.team_member')
  const team_cards = useRef([])
  const cardsToShow = useRef([])

  useEffect(()=>{
	getWorkers()
  },[])
  
  const getWorkers = async ()=> {
	try{
	  const { data } = await axios.get(URI)
	  setWorkers(data)
	}catch (err){
	  showNotification('err', err.response?.data?.message || err.message, {title: 'Error'})
	  setTimeout(()=> getWorkers(), 30000)
	}
  }

  useEffect(()=>{
	team_cards.current = document.querySelectorAll('.team_card')
	if(workers.length > 0) startInfiniteLoop()
  },[workers])
  
  const animateScroll = ()=> {
	const parentRectLeft = Math.round(team_box.current.getBoundingClientRect().left)
	const boxWidth = Number(getComputedStyle(team_box.current).width.split('px')[0])
	const centerPos = parentRectLeft + (boxWidth / 2)
	setCenPos(centerPos)
	//document.querySelector('#gossip').innerHTML = `${window.innerWidth} - ${team_box.current.children.length}`

  	document.querySelectorAll('.team_card').forEach((card)=> {
	  const left = centerPos - Math.round(getComputedStyle(card).width.split('px')[0] / 2)
	  const right = centerPos - Math.round(getComputedStyle(card).width.split('px')[0] / 2)
	  const intercepting = (
		Math.round(card.getBoundingClientRect().left) >= left - 70 &&
		Math.round(card.getBoundingClientRect().left) <= right + 70
	  )
	  const boxLeft = Math.round(team_box.current.getBoundingClientRect().left + 40)
	  const boxRight = Math.round(team_box.current.getBoundingClientRect().right - 70)

	  if(intercepting){
		document.querySelector('#name').innerText = card.children[1].children[0].innerText
		document.querySelector('#job').innerText = card.children[1].children[1].innerText

		card.children[0].children[0].classList.remove('anim_image_shrink')
		card.children[0].children[0].classList.add('anim_image_grow')
	  } else {
		card.children[0].children[0].classList.remove('anim_image_grow')
		card.children[0].children[0].classList.add('anim_image_shrink')
	  }

	  if(card.getBoundingClientRect().left < boxLeft || card.getBoundingClientRect().left > boxRight){
		card.style.opacity = '0'
	  } else {
	  	card.style.opacity = '1'
	  }
  	})
  }

  const addMoreCardsRight = ()=> {
  	cardsToShow.current = [...team_cards.current]
  	cardsToShow.current.forEach((card)=> {
	  const newCard = card.cloneNode(true)
	  newCard.setAttribute('id',`card${document.querySelectorAll('.team_card').length + 1}`)
	  newCard.classList.add('anim_image_shrink')
	  team_box.current.appendChild(newCard)
  	})
  	cardsToShow.current = []
  }

  const addMoreCardsLeft = ()=> {
  	cardsToShow.current = [...team_cards.current]
  	const firstCard = document.getElementById(team_box.current.children[0].id)
  	cardsToShow.current.forEach((card)=> {
	  const newCard = card.cloneNode(true)
	  newCard.setAttribute('id',`card${document.querySelectorAll('.team_card').length + 1}`)
	  newCard.classList.add('anim_image_shrink')
	  team_box.current.insertBefore(newCard, firstCard)
  	})
  	team_box.current.style.overflow = 'hidden'
  	setTimeout(()=>{
  	  team_box.current.style.overflow = 'auto'
  	},10) 
  	cardsToShow.current = []
  }

  if(team_box.current){
	team_box.current.addEventListener('scroll', ()=>{
  	  if (team_box.current.scrollLeft + team_box.current.clientWidth >= team_box.current.scrollWidth - 130){
    	addMoreCardsRight()
  	  }
  	  if (team_box.current.scrollLeft <= 130){
		addMoreCardsLeft()
  	  }
  	  animateScroll()
	})
  }

	const startInfiniteLoop = ()=> {
  	  const width = (getComputedStyle(team_box.current.firstChild).width).split('px')[0]
	  let timeoutId

	  const start = ()=> {
		timeoutId = setTimeout(()=> team_box.current.scrollBy({left: width}))
	  }

	  const stop = ()=> {
		clearTimeout(timeoutId)
		timeoutId = null
	  }
	  
	  setInterval(()=> {
		const teamMemberText = document.querySelectorAll('.team_member_text')
		const isShown = String(team_box.current.parentElement.classList).split(' ').includes('animate__fadeIn')

  		if(isShown){
		  start()
  		}else{
		  stop()
  		}
		
		teamMemberText.forEach(tmt => {
		  tmt.classList.remove("animate__animated", "animate__fadeOut")
		  tmt.classList.add("animate__animated", "animate__fadeIn")

		  setTimeout(()=>{
			tmt.classList.remove("animate__animated", "animate__fadeIn")
			tmt.classList.add("animate__animated", "animate__fadeOut")
		  },2700)
		})
	  },3000)

  	  addMoreCardsLeft()
  	  animateScroll()
	}

  return (
    <>
	  <nav id="s_our_team"></nav>
  	  <section className="s_our_team box" id="s_our_team">
		<h2 className="team_title" id="team_title">Our Team</h2>
		<p>
		  We have an excellent staff of professionals, each one committed to offer our costumers a service that meets the highest quality standards.
		</p>
		<h3 className="team_member_text" id="name" style={{color: '#37a1c6', fontWeight: 'bold', width: '100%', fontSize: '100%'}}></h3>
		<span className="team_member_text" id="job"></span>
		<p id="gossip" hidden></p>		  
		<div className="team_box" id="team_box" ref={team_box} >
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