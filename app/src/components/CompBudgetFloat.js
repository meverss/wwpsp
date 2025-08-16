import axios from 'axios'
import { useEffect, useState, useContext, useRef } from 'react'
import { disableSendButton, enableSendButton, validateAll} from '../libs/validator.js'
import { serverContext } from '../App.js'
import budgetIcon from "../media/images/budget.webp"
import { MdClose } from "react-icons/md"
import { getEscKey } from '../libs/getEscKey.js'

export const CompBudgetFloat = ({ showNotification })=> {
  const server = useContext(serverContext)
  const URI = `${server}/budgets/`

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [budget, setBudget] = useState('')
  const [budgetLength, setBudgetLength] = useState(0)

  const budgetForm = document.getElementById('s_budget_form')
  const budgetFormBox = document.getElementById('budget_form_box')
  const budgetCloseBtn = document.getElementById('budget_close_btn')
  const formBudgetName = document.getElementById('br_name')
  const formBudgetEmail = document.getElementById('br_email')
  const formBudgetPhone = document.getElementById('br_phone')
  const formBudgetRequest = document.getElementById('br_request')

  // Budget Request form
  useEffect(()=>{
	validateAll()
  },[budget])
  
  useEffect(()=>{
	setBudgetLength(budget.length)
	if(budget.length === 0)setBudgetLength(0)
  },[budget])
  

  // Budget float button
  const budgetIconFloat = useRef()

  if(budgetIconFloat){
	setInterval(()=> {
	  budgetIconFloat.current.classList.add('animate__animated', 'animate__tada')

	  setTimeout(()=> {
		budgetIconFloat.current.classList.remove('animate__animated', 'animate__tada')
	  }, 1000)
	}, 60000)
  }

  // Hide 'Budget Request' form
  const  hideBudgetForm = ()=> {
	if(budgetFormBox){
	  budgetFormBox.classList.remove('animate__animated', 'animate__zoomIn')
	  budgetFormBox.classList.add('animate__animated', 'animate__zoomOut')

	  setTimeout(()=> {
		budgetFormBox.classList.remove('animate__animated', 'animate__zoomOut')
		setName('')
		setEmail('')
		setBudget('')
		setPhone('')
		setBudgetLength(0)
		budgetForm.style.display = 'none'
		document.body.style.overflow = 'auto'
  	  }, 200)
	}
  }

  // Create a new budget request
  const showCreateBudgetRequest = ()=> {
  if(budgetForm){
    budgetForm.style.display = 'flex'
    document.body.style.overflow = 'hidden'
  
    disableSendButton('br_btn_send')

    budgetFormBox.classList.add('animate__animated', 'animate__zoomIn')
    if(window.innerHeight >= 800){
     formBudgetName.focus()
    }
  
    setTimeout(() => {
	budgetFormBox.classList.remove('animate__animated', 'animate__zoomIn')
    }, 1000)

    //getEscKey(hideSubmitBudget)
  }
  }
  
  const createBudgetRequest = async (e)=> {
	e.preventDefault()
  
  if(name && email && phone && budget){
    try {
	  hideBudgetForm()
  	  await axios.post(URI, { name, email, phone, budget })
	  showNotification('ok', 'Your request has been sent. We will contact you shortly.', {title: 'New budget request'})
    } catch (err) {
	  showNotification('err', err.response?.data?.message || err.message, {title: 'Error'})
    }
  } else {
	showNotification('inf', 'Please, provide all required information', {title: 'New budget request'})	
  }
  }
  
  return (
    <>
  	  {/* Budget request form */}
	  <section className="s_budget_form" id="s_budget_form">
		<div className="budget_form_back" id="budget_form_back">
		  <div className="budget_form_box" id="budget_form_box">
			<div className="budget_close_btn" id="budget_close_btn" >
	  		  <p style={{color: 'var(--text-main)'}} ><MdClose onClick={hideBudgetForm}/></p>
			</div>
			<div className="budget_form_title" id="budget_form_title">
			  <h2>Get a quote for free!</h2>
			</div>
			<form id="budget_form" className="budget_form form" onSubmit={createBudgetRequest} >
			  <label className="text" for="br_name">Full Name<span className="important">*</span></label>
			  <input className="frm_text" name="name" id="br_name" autocomplete="off" placeholder="Who is contacting us?"
			  onChange={(e)=> setName(e.target.value)} value={name} data-frminfo="name" />
			  <label className="text" for="br_email">E-mail<span className="important">*</span></label>
			  <input className="frm_text" name="email" id="br_email" autocomplete="off"	placeholder="your@email.here"
			  onChange={(e)=> setEmail(e.target.value)} value={email} data-frminfo="email" />
			  <label className="text" for="br_phone">Phone Number<span className="important">*</span></label>
			  <input className="frm_text" name="phone" id="br_phone" autocomplete="off"	placeholder="Where can we call you to?"
			  onChange={(e)=> setPhone(e.target.value)} value={phone} data-frminfo="phone" />
			  <label className="text" for="br_request">Request<span className="important">*</span></label>
			  <textarea className="frm_text frm_message" name="request" id="br_request" rows="5" autocomplete="off" placeholder="Please, let us know what you need."
			  onFocus={()=> setPhone(formBudgetPhone.value)} onChange={(e)=> setBudget(e.target.value)} value={budget} data-frminfo="message"></textarea>
			  <input id="br_btn_send" type="submit" className="button form_btn" value="Send" />
			</form>
		  </div>
		</div>
	  </section>
    
  	  {/* Budget floating button */}
	  <div className="budget_float" ref={budgetIconFloat} id="budget_float">
		<img className="budget_icon_float budget_btn" id="budget_icon_float" data-service="Budget"
		  src={budgetIcon} alt="WWP Budget - Float" onClick={showCreateBudgetRequest}/>
	  </div>
    </>
  )
}
