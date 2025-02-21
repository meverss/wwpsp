import Message from '../database/models/messages.model.js'
import nodemailer from 'nodemailer'

const sendEmail = (mailType, mailData) => {
	
	// Mail Server configuration:
	const transporter = nodemailer.createTransport({
	  host: "smtp.gmail.com",
	  port: 465,
	  secure: true,
	  auth: {
	    user: "kiniundev@gmail.com",
	    pass: process.env.GMAIL_KEY,
	  },
	})

	  async function send(data) {
		try {
		  let msg
		  switch(mailType){
			case('NEW REVIEW'):
			  const rate = '⭐'.repeat(data.rate)
			  msg = await transporter.sendMail({
	  		  from: '"KiniunDev" <no-replay@kiniun.dev>',
	  		  to: "meverss@my.com",
	  		  subject: `You have a ${mailType}`,
	  		  html: `
	  			<p style='color: #085c97'>
	  			  <b>You have received a ${mailType}.</b>
	  			</p>
	  			<p style='color: #37a1c6'>
	  			  <b>Details:</b>
	  			</p>
	  			<p>
	  			  <span style='color: #A2B992'>Name:</span>&nbsp;${data.author}<br /><br />
	  			  <span style='color: #A2B992'>E-mail:</span>&nbsp;${data.email}<br /><br />
	  			  <span style='color: #A2B992'>Service rate:</span>&nbsp;${rate}<br /><br />
	  			  <span style='color: #A2B992'>Review:</span><br />${data.review}
	  			</p>   
	  		  `,
			  })
			  break
			case('NEW BUDGET REQUEST'):
			  msg = await transporter.sendMail({
	  		  from: '"KiniunDev" <no-replay@kiniun.dev>',
	  		  to: "meverss@my.com",
	  		  subject: `You have a ${mailType}`,
	  		  html: `
	  			<p style='color: #085c97'>
	  			  <b>You have received a ${mailType}.</b>
	  			</p>
	  			<p style='color: #37a1c6'>
	  			  <b>Details:</b>
	  			</p>
	  			<p>
	  			  <span style='color: #A2B992'>Name:</span>&nbsp;${data.user}<br /><br />
	  			  <span style='color: #A2B992'>E-mail:</span>&nbsp;${data.email}<br /><br />
	  			  <span style='color: #A2B992'>Budget request:</span><br />${data.message}
	  			</p>   
	  			`,
			  })
			  break
			case('NEW MESSAGE'):
			  msg = await transporter.sendMail({
	  	  	  from: '"KiniunDev" <no-replay@kiniun.dev>',
	  		  to: "meverss@my.com",
	  		  subject: `You have a ${mailType}`,
	  		  html: `
	  			<p style='color: #085c97'>
	  			  <b>You have received a ${mailType}.</b>
	  			</p>
	  			<p style='color: #37a1c6'>
	  			  <b>Details:</b>
	  			</p>
	  			<p>
	  			  <span style='color: #A2B992'>Name:</span>&nbsp;${data.name}<br /><br />
	  			  <span style='color: #A2B992'>E-mail:</span>&nbsp;${data.email}<br /><br />
	  			  <span style='color: #A2B992'>Subject:</span>&nbsp;${data.subject}<br /><br />
	  			  <span style='color: #A2B992'>Message:</span><br />${data.message}
	  			</p>   
	  			`,
				})
				break
		  }
		  const mailSent = await Message.updateOne({_id:data.id}, {pending: false})
		  if(mailSent.matchedCount === 1)console.log(`\x1b[32mMessage sent! E-mail ID: \x1b[36m${msg.messageId}\x1b[0m`)
		} catch (err) {
		  console.log(`\x1b[31mError sending the email.\n\x1b[31mCouldn't resolve server ${err.hostname}\x1b[0m`)
		  const emailToQueue = await Message.updateOne({_id:md.id}, {pending: true})
		}
	}

	async function checkIfPendings() {
	  setInterval(async ()=> {
		const queuedEmails = await Message.find({pending:true})
		if(queuedEmails.length !== 0){
		  queuedEmails.forEach(email => {
			send(email)
		  })
		}
		//console.log(`${queuedEmails.length} emails pending`)
	  },60000)
	}
	
	if(mailType && mailData) send(mailData)
	checkIfPendings()	
}

export default sendEmail
