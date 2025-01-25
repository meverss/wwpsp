import { useEffect, useRef } from 'react'
import budget from "../media/images/budget.webp"
import { MdClose } from "react-icons/md"
import { getEscKey } from '../libs/getEscKey.js'

export const CompBudgetFloat = ()=> {
  const budgetIconFloat = useRef()
  
  if(budgetIconFloat){
	setInterval(()=> {
	  budgetIconFloat.current.classList.add('animate__animated', 'animate__tada')

	  setTimeout(()=> {
		budgetIconFloat.current.classList.remove('animate__animated', 'animate__tada')
	  }, 1000)
	}, 60000)
  }
  
  const showBudgetForm = ()=> {
	alert('Budget form here...!!')
  }
  
  return (
    <>
  	  {/* Budget request form */}
	  <section className="s_budget_form" id="s_budget_form">
		<div className="budget_form_back" id="budget_form_back">
		  <div className="budget_form_box" id="budget_form_box">
			<div className="budget_close_btn" id="budget_close_btn">
			  <p style={{fontFamily: 'Symbols'}} >  </p>
			</div>
			<div className="budget_form_title" id="budget_form_title">
			  <h2>Get a quote</h2>
			</div>
			<form id="budget_form" className="budget_form form" action="https://api.web3forms.com/submit" method="POST">
			  <label className="text" for="br_name">Full Name<span className="important">*</span></label>
			  <input className="frm_text" name="name" id="br_name" autocomplete="off" placeholder="Who is contacting us?" data-frminfo="name" />
			  <label className="text" for="br_email">E-mail<span className="important">*</span></label>
			  <input className="frm_text" name="email" id="br_email" autocomplete="off"	placeholder="your@email.here" data-frminfo="email" />
			  <label className="text" for="br_phone">Phone Number<span className="important">*</span></label>
			  <input className="frm_text" name="phone" id="br_phone" autocomplete="off"	placeholder="Where can we call you?" data-frminfo="phone" />
			  <label className="text" for="br_message">Request<span className="important">*</span></label>
			  <textarea className="frm_text frm_message" name="message" id="br_message" rows="5" autocomplete="off" placeholder="Please, let us know what you need." data-frminfo="message"></textarea>
			  <input id="br_btn_send" type="submit" className="button form_btn" value="Send" />
			</form>
		  </div>
		</div>
	  </section>
    
  	  {/* Budget floating button */}
	  <div className="budget_float" ref={budgetIconFloat} id="budget_float">
		<img className="budget_icon_float budget_btn" id="budget_icon_float" data-service="Budget"
		  src={budget} alt="WWP Budget - Float" onClick={showBudgetForm}/>
	  </div>
    </>
  )
}
