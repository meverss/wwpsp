/* eslint-disable react-hooks/exhaustive-deps */
import { BiMailSend } from "react-icons/bi";
import { MdLocalPhone, MdOutlineLocationOn } from "react-icons/md"

export const CompContactUs = ({ notify }) => {

  return (
    <>
		<section className="s_contact_us box" id="s_contact_us">
		  <nav id="s_m_contact_us"></nav>
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
				<p><span><MdLocalPhone class="contact_icon"/>&nbsp;</span>
				(904) 506-8535</p>
			  </div>
			  <div className="contact_me_info" id="myemail">
				<p><span><BiMailSend class="contact_icon"/>&nbsp;</span>
				wwpspllc@gmail.com</p>
			  </div>
			  <div className="contact_me_info" id="myaddtess">
				<p><span><MdOutlineLocationOn class="contact_icon"/>&nbsp;</span>
				2027 IVY PL. Sarasota, FL 34235</p>
			  </div>
			</div>
		  </div>
		</section>
    </>
  )
}