/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { disableSendButton, enableSendButton, validateAll} from '../libs/validator.js'
import { CompRates } from '../components/CompRates.js'
import { useState, useEffect, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverContext } from '../App.js'
import { formatDate } from '../libs/formatDate.js'
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri"
import { PiUserFill } from "react-icons/pi"
import { LiaCalendar } from "react-icons/lia"
import { MdClose } from "react-icons/md"
import { IoMdStar, IoMdStarOutline, IoMdStarHalf } from "react-icons/io";

const CompReviews = ({ mediaServer, mainContainer, getReviews, reviews, notify }) => {
  const server = useContext(serverContext)
  const URI = `${server}/reviews/`
  
  const [author, setAuthor] = useState('')
  const [email, setEmail] = useState('')
  const [review, setReview] = useState('')
  const [reviewLength, setReviewLength] = useState(0)
  const [reviewsToShow, setReviewsToShow] = useState(5)
  const [rate, setRate] = useState(4)

  const reviewForm = document.getElementById('s_review_form')
  const reviewFormBox = document.getElementById('review_form_box')
  const reviewCloseBtn = document.getElementById('review_close_btn')
  const formReviewName = document.getElementById('rv_name')
  const formReviewEmail = document.getElementById('rv_email')
  const formReviewMessage = document.getElementById('rv_message')
  const ratingStars = document.querySelectorAll('.rateStarVote')

  const reviews_box = useRef('')

  useEffect(()=>{
	validateAll()
	getReviews()
  },[])

  useEffect(()=>{
	setReviewLength(review.length)
	if(review.length === 0)setReviewLength(0)
  },[review])

  useEffect(()=>{
	ratingStars.forEach((rs, index)=>{
	  rs.addEventListener('click', ()=>{
		setRate(index + 1)
		rs.firstChild.classList.add('animate__animated','animate__heartBeat')
		setTimeout(()=> {
		  rs.firstChild.classList.remove('animate__animated','animate__heartBeat')
		},300)
	  })
	})
  },[ratingStars])

  // Hide 'Submit a review' form
  const  hideSubmitReview = ()=> {
	if(reviewFormBox){
  	  reviewFormBox.classList.remove('animate__animated', 'animate__zoomIn')
  	  reviewFormBox.classList.add('animate__animated', 'animate__zoomOut')
	  setReviewsToShow(5)
	  window.location = '/#s_reviews'

  	  setTimeout(()=> {
  		reviewFormBox.classList.remove('animate__animated', 'animate__zoomOut')
		setAuthor('')
		setEmail('')
		setReview('')
		setRate(4)
		setReviewLength(0)
		reviewForm.style.display = 'none'
		document.body.style.overflow = 'auto'
	  }, 200)
	}
  }

  // Create a new review
  const showCreateReview = ()=> {
	if(reviewForm){
	  reviewForm.style.display = 'flex'
	  document.body.style.overflow = 'hidden'
  
	  disableSendButton('rv_btn_send')

	  reviewFormBox.classList.add('animate__animated', 'animate__zoomIn')
	  if(window.innerHeight >= 800){
	   formReviewName.focus()
	  }
  
	  setTimeout(() => {
		reviewFormBox.classList.remove('animate__animated', 'animate__zoomIn')
	  }, 1000)

	  //getEscKey(hideSubmitReview)
	}
  }
  
  const createReview = async (e)=> {
	e.preventDefault()
	
	if(author && email && review){
	  try {
		hideSubmitReview()
	  	await axios.post(URI, { author, email, review, rate })
		getReviews()
		notify('ok', 'Your review has been submitted')
	  } catch (error) {
		notify('err', error)
	  }
	} else {
		notify('inf', 'Please, provide all required info')	
	}
  }
  
  const reviewsMoreLess = (e, opt)=> {
	let rts = reviewsToShow
	switch(opt){
	  case"more":
		if(rts <= reviews.length){
		  rts += 5
		} else {
		  rts = reviews.length + 1
		}
		if(rts > reviews.length + 1)rts = reviews.length + 1
		break
	  case"less":
		const reviewIndex = (reviews_box.current.lastChild.id).split('_')
		if(rts > 5 && rts % 5 === 0){
		  rts -= 5
		  window.location = `/#review_card_${reviewIndex[2] - 6}`
		} else {
		  rts = Math.floor(rts / 5) * 5
		  window.location = `/#review_card_${Math.floor(rts / 5) * 5 - 1}`
		}
		break
	  default:
		return
	}
	setReviewsToShow(rts)

  }
  
  return (
    <>
  	  {/* Create new review form */}
	  <section className="s_review_form" id="s_review_form">
		<div className="review_form_back" id="review_form_back">
		  <div className="review_form_box" id="review_form_box">
			<div className="review_close_btn" id="review_close_btn" onClick={hideSubmitReview}>
			  <p style={{color: 'var(--text-main)'}} ><MdClose /> </p>
			</div>
			<div className="review_form_title" id="review_form_title">
			  <h2>Submit a review</h2>
			</div>
			<form id="review_form" className="review_form form" action="https://api.web3forms.com/submit" onSubmit={createReview} >
			  <label className="text" for="rv_name">Full Name<span className="important">*</span></label>
			  <input className="frm_text" name="fullname" id="rv_name" autocomplete="off" placeholder="What's your name?" data-frminfo="name" onChange={(e)=> setAuthor(e.target.value)} value={author}/>
			  <label className="text" for="br_email">E-mail<span className="important">*</span></label>
			  <input className="frm_text" name="email" id="rv_email" type="email" autocomplete="off" placeholder="your@email.here" data-frminfo="email" onChange={(e)=> setEmail(e.target.value.toLowerCase().trim())} value={email}/>
			  <div className="review_labels">
				<label className="text" for="br_message" id="review_message">Review<span className="important">*</span></label>
				<label className="text" for="br_message" id="review_counter">({reviewLength}/160)</label>
			  </div>
			  <textarea className="frm_text frm_message" name="message" id="rv_message" rows="5" autocomplete="off" placeholder="What's your opinion about our service?" data-frminfo="message" onChange={(e)=> setReview(e.target.value)} value={review} maxlength="160"></textarea>
			  <div className="rateContainer">
				<span className="rateStar rateStarVote">{rate && rate >= 1 ? <IoMdStar /> : <IoMdStarOutline />}</span>
				<span className="rateStar rateStarVote">{rate && rate >= 2 ? <IoMdStar /> : <IoMdStarOutline />}</span>
				<span className="rateStar rateStarVote">{rate && rate >= 3 ? <IoMdStar /> : <IoMdStarOutline />}</span>
				<span className="rateStar rateStarVote">{rate && rate >= 4 ? <IoMdStar /> : <IoMdStarOutline />}</span>
				<span className="rateStar rateStarVote">{rate && rate >= 5 ? <IoMdStar /> : <IoMdStarOutline />}</span>
			  </div>
			  <input id="rv_btn_send" type="submit" className="button form_btn" value="Send" />
			</form>
		  </div>
		</div>
	  </section>
    
  	  {/* Show reviews */}
  	  <nav id="s_reviews"></nav>
	  <section className="s_reviews box" id="s_reviews">
		<h2 className="reviews_title" id="reviews_title">Reviews</h2>
		<p>
		  Please, read what our clients think about the services we have provided
		  them and, once we are done with your job, feel free to rate us and share your experience with others.
		</p>
		<CompRates data={reviews} mainContainer={mainContainer} />
		<article className="reviews_box" ref={reviews_box} id="reviews_box">
		  {reviews ? reviews.map((r, index) => (
			<div className="review_card" id={`review_card_${index + 1}`} key={r.id} >
			  <div className="review_card_text" >
				<p className="review_date" ><span><LiaCalendar className="review_icon" />&nbsp;{formatDate(r.createdAt)}</span></p>
				<p className="review_author" ><span><PiUserFill className="review_icon" />&nbsp;{r.author} wrote:</span></p>
				<p className="review_text" id="review_text">
					{r.review}
				</p>
				<div className="reviewUserRating">
				  <span className="rateStar">{r.rate >= 1 ? <IoMdStar /> : <IoMdStarOutline />}</span>
				  <span className="rateStar">{r.rate >= 2 ? <IoMdStar /> : <IoMdStarOutline />}</span>
				  <span className="rateStar">{r.rate >= 3 ? <IoMdStar /> : <IoMdStarOutline />}</span>
				  <span className="rateStar">{r.rate >= 4 ? <IoMdStar /> : <IoMdStarOutline />}</span>
				  <span className="rateStar">{r.rate >= 5 ? <IoMdStar /> : <IoMdStarOutline />}</span>
				</div>
			  </div>
			</div>
		  )).slice(0, reviewsToShow)
		  : null
		  } 
		</article>
		<div className="reviewsMoreLess">
		  <p hidden={reviews && reviewsToShow <= 5 ? true : false}
			onClick={(e)=> reviewsMoreLess(e, 'less')}>
			  View less
			</p>
		  <p hidden={reviews && reviewsToShow >= reviews.length ? true : false}
			onClick={(e)=> reviewsMoreLess(e, 'more')}>
			  View more
			</p>
		</div>
		<p className="new_review button" id="new_review" onClick={showCreateReview}>Submit a review</p>
	  </section>
    </>
  )
}

export default CompReviews
