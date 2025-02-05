/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { disableSendButton, enableSendButton, validateAll} from '../libs/validator.js'
import { useState, useEffect, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverContext } from '../App.js'
import { formatDate } from '../libs/formatDate.js'
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import { PiUserFill } from "react-icons/pi"
import { LiaCalendar } from "react-icons/lia"
import { MdClose } from "react-icons/md"

const CompReviews = ({ getReviews, reviews, notify }) => {
  const server = useContext(serverContext)
  const URI = `${server}/reviews/`
  
  const [author, setAuthor] = useState('')
  const [email, setEmail] = useState('')
  const [review, setReview] = useState('')
  const [reviewLength, setReviewLength] = useState(0)

  const reviewForm = document.getElementById('s_review_form')
  const reviewFormBox = document.getElementById('review_form_box')
  const reviewCloseBtn = document.getElementById('review_close_btn')
  const formReviewName = document.getElementById('rv_name')
  const formReviewEmail = document.getElementById('rv_email')
  const formReviewMessage = document.getElementById('rv_message')

  const reviews_box = useRef('')

  useEffect(()=>{
	validateAll()
	getReviews()
  },[])

  useEffect(()=>{
	setReviewLength(review.length)
	if(review.length === 0)setReviewLength(0)
  },[review])

  // Hide 'Submit a review' form
  const  hideSubmitReview = ()=> {
	if(reviewFormBox){
  	  reviewFormBox.classList.remove('animate__animated', 'animate__zoomIn')
  	  reviewFormBox.classList.add('animate__animated', 'animate__zoomOut')

  	  setTimeout(()=> {
  		reviewFormBox.classList.remove('animate__animated', 'animate__zoomOut')
		setAuthor('')
		setEmail('')
		setReview('')
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
  
	  disableSendButton()

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
	  	await axios.post(URI, { author, email, review })
		getReviews()
		notify('ok', 'Your review has been submitted')
	  } catch (error) {
		notify('err', error)
	  }
	} else {
		notify('inf', 'Please, provide all required info')	
	}
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
			  <input className="frm_text" name="fullname" id="rv_name" autocomplete="off" placeholder="What's your name?" data-frminfo="fullname" onChange={(e)=> setAuthor(e.target.value)} value={author}/>
			  <label className="text" for="br_email">E-mail<span className="important">*</span></label>
			  <input className="frm_text" name="email" id="rv_email" type="email" autocomplete="off"	placeholder="your@email.here" data-frminfo="email" onChange={(e)=> setEmail(e.target.value.toLowerCase().trim())} value={email}/>
			  <div className="review_labels">
				<label className="text" for="br_message" id="review_message">Review<span className="important">*</span></label>
				<label className="text" for="br_message" id="review_counter">({reviewLength}/160)</label>
			  </div>
			  <textarea className="frm_text frm_message" name="message" id="rv_message" rows="5" autocomplete="off" placeholder="What's your opinion about our service?" data-frminfo="message" onChange={(e)=> setReview(e.target.value)} value={review} maxlength="160"></textarea>
			  <input id="rv_btn_send" type="submit" className="button form_btn" value="Submit" />
			</form>
		  </div>
		</div>
	  </section>
    
  	  {/* Show reviews */}
  	  <nav id="s_reviews"></nav>
	  <section className="s_reviews box" id="s_reviews">
		<h2 className="reviews_title" id="reviews_title">Reviews</h2>
		<p>This is what our clients think about the services we provide:</p>
		<article className="reviews_box" ref={reviews_box} id="reviews_box">
		  {reviews ? reviews.map((r) => (
			<div className="review_card" id="review_card" key='_id' >
			  <div className="review_card_text" >
				<p className="review_date" ><span><LiaCalendar className="review_icon" />&nbsp;{formatDate(r.createdAt)}</span></p>
				<p className="review_author" ><span><PiUserFill className="review_icon" />&nbsp;{r.author} wrote:</span></p>
				<p className="review_text" id="review_text">
					{r.review}
				</p>
			  </div>
			</div>
		  )).slice(0, 11)
		  : null
		  } 
		</article>
		<p className="new_review button" id="new_review" onClick={showCreateReview}>Submit a review</p>
	  </section>
    </>
  )
}

export default CompReviews