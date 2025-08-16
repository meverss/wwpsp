/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { disableSendButton, enableSendButton, validateAll} from '../libs/validator.js'
import { serverContext } from '../App.js'
import { useState, useEffect, useRef, useContext } from 'react'
import { BiMailSend } from "react-icons/bi"
import { MdLocalPhone, MdOutlineLocationOn } from "react-icons/md"

const CompContactUs = ({ showNotification }) => {
  const server = useContext(serverContext)
  const URI = `${server}/messages`
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [messageLength, setMessageLength] = useState(0)  

  useEffect(()=>{
    validateAll()
	disableSendButton()
  },[])

  useEffect(()=>{
    setMessageLength(message.length)
    if(message.length === 0)setMessageLength(0)
  },[message])

  const handleSubmit = async (e)=> {
	e.preventDefault()
	await axios.post(URI, {name, email, subject, message})
	  .then(res => {
		showNotification('ok', res.data.message)
		window.location = '/#s_contact'
	  })
	  .catch(err => {
		showNotification('err', err.response.data.message, {title: 'Error'})
	  })
	setName('')
	setEmail('')
	setSubject('')
	setMessage('')
	disableSendButton('ct_btn_send')
  }

  return (
    <>
		<nav id="s_contact"></nav>
		<section className="s_contact box" id="s_contact">
		  <div className="contact_box" id="contact_box">
			<div className="contact_title" id="contact_title">
			  <h2>Contact</h2>
			</div>
			<div className="contact_full_msg box">
			  <div className="contact_message" id="contact_message">
				<form id="contact_form" className="contact_form form" onSubmit={handleSubmit}>
				  <label className="text" for="name">Name<span className="important">*</span></label>
				  <input className="frm_text" name="name" id="name" autocomplete="off"
					placeholder="Who is contacting us?" data-frminfo="name" value={name}
					onChange={(e)=> setName(e.target.value)} />
				  <label className="text" for="email">E-mail<span className="important">*</span></label>
				  <input className="frm_text" name="email" id="email" autocomplete="off"
					placeholder="your@email.here" data-frminfo="email" value={email}
					onChange={(e)=> setEmail(e.target.value.toLowerCase().trim())} />
				  <label className="text" for="subj">Subject</label>
				  <input className="frm_text" name="subj" id="subj" autocomplete="off"
					placeholder="What's the affair?" data-frminfo="subject" value={subject}
					onChange={(e)=> setSubject(e.target.value)} />
				  <div className="message_labels">
					<label className="text" for="message" id="contact_message_label">Message<span className="important">*</span></label>
					<label className="counter" for="message" id="message_counter">({messageLength}/160)</label>
				  </div>
				  <textarea className="frm_text frm_message" name="message" id="message" rows="5"
					autocomplete="off" placeholder="Leave us your message" maxlength="160"
					onChange={(e)=> setMessage(e.target.value)} value={message}
					data-frminfo="message"></textarea>
				  <input id="ct_btn_send" type="submit" className="button form_btn" value="Send" />
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