/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react'
import { BiMailSend } from "react-icons/bi"
import { MdLocalPhone, MdOutlineLocationOn } from "react-icons/md"

const CompContactUs = ({ sesContact, setSesContact, mh }) => {
  const s_contact = useRef('')

  useEffect(()=>{
  	getNavPos()
  },[mh])

  // Set navigators
  const getNavPos = ()=> {
    const pos = s_contact.current.offsetTop
    if(s_contact.current){
        setSesContact(pos)
    }
  }
  
  return (
    <>
		<nav id="s_contact" ref={s_contact} ></nav>
		<section className="s_contact box" id="s_contact">
		  <div className="contact_box" id="contact_box">
			<div className="contact_title" id="contact_title">
			  <h2>Contact</h2>
			</div>
			<div className="contact_full_msg box">
			  <div className="contact_message" id="contact_message">
				<form id="contact_form" className="contact_form form">
				  <label className="text" for="name">Name<span className="important">*</span></label>
				  <input className="frm_text" name="name" id="name" autocomplete="off"
					placeholder="Who is contacting us?" data-frminfo="name" />
				  <label className="text" for="email">E-mail<span className="important">*</span></label>
				  <input className="frm_text" name="email" id="email" autocomplete="off"
					placeholder="your@email.here" data-frminfo="email" />
				  <label className="text" for="subj">Subject</label>
				  <input className="frm_text" name="subj" id="subj" autocomplete="off"
					placeholder="What's the affair?" data-frminfo="subject" />
				  <label className="text" for="message">Message<span className="important">*</span></label>
				  <textarea className="frm_text frm_message" name="message" id="message" rows="5"
					autocomplete="off" placeholder="Leave us your message"
					data-frminfo="message"></textarea>
				  <input id="btn_send" type="button" className="button form_btn" value="Send" />
				</form>
			  </div>
			</div>
			<div className="contact_me" id="contact_me">
			  <div className="contact_me_info" id="myphone">
				<MdLocalPhone class="contact_icon"/>&nbsp;
				<p>(904) 506-8535</p>
			  </div>
			  <div className="contact_me_info" id="myemail">
				<BiMailSend class="contact_icon"/>&nbsp;
				<p>wwpspllc@gmail.com</p>
			  </div>
			  <div className="contact_me_info" id="myaddtess">
				<MdOutlineLocationOn class="contact_icon"/>&nbsp;
				<p>2027 IVY PL. Sarasota, FL 34235</p>
			  </div>
			</div>
		  </div>
		</section>
    </>
  )
}

export default CompContactUs