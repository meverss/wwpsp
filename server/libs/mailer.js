import Message from '../database/models/messages.model.js'
import Review from '../database/models/reviews.model.js'
import Budget from '../database/models/budgets.model.js'
import nodemailer from 'nodemailer'

const sendEmail = (mailData) => {
	let sending = []
	
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
	
	  const send = (data)=> {
		try {
		  let msg
		  if(!sending.includes(data.id)) sending.push(data.id)
		  
		  const notifyByEmail = async ()=> {
		  switch(data.mailtype){
			case('NEW REVIEW'):
			  const rate = '⭐'.repeat(data.rate)
			  msg = await transporter.sendMail({
	  		  from: '"KiniunDev" <no-replay@kiniun.dev>',
	  		  to: "meverss@proton.me",
	  		  subject: `You have a ${data.mailtype}`,
	  		  html: `
	  			<p style='color: #085c97'>
	  			  <b>You have received a ${data.mailtype}.</b>
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
			  await Review.updateOne({_id:data.id}, {pending: false})
			  console.log(`\x1b[32mMessage sent! E-mail ID: \x1b[36m${msg.messageId}\x1b[0m`)
			  break
			case('NEW BUDGET REQUEST'):
			  msg = await transporter.sendMail({
	  		  from: '"KiniunDev" <no-replay@kiniun.dev>',
	  		  to: "meverss@proton.me",
	  		  subject: `You have a ${data.mailtype}`,
	  		  html: `
	  			<p style='color: #085c97'>
	  			  <b>You have received a ${data.mailtype}.</b>	  			</p>
	  			<p style='color: #37a1c6'>
	  			  <b>Details:</b>
	  			</p>
	  			<p>
	  			  <span style='color: #A2B992'>Name:</span>&nbsp;${data.name}<br /><br />
	  			  <span style='color: #A2B992'>E-mail:</span>&nbsp;${data.email}<br /><br />
	  			  <span style='color: #A2B992'>Phone:</span>&nbsp;${data.phone}<br /><br />
	  			  <span style='color: #A2B992'>Budget request:</span><br />${data.budget}
	  			</p>   
	  			`,
			  })
			  await Budget.updateOne({_id:data.id}, {pending: false})
			  console.log(`\x1b[32mMessage sent! E-mail ID: \x1b[36m${msg.messageId}\x1b[0m`)
			  break
			case('NEW MESSAGE'):
			  msg = await transporter.sendMail({
	  	  	  from: '"KiniunDev" <no-replay@kiniun.dev>',
	  		  to: "meverss@proton.me",
	  		  subject: `You have a ${data.mailtype}`,
	  		  html: `
	  			<p style='color: #085c97'>
	  			  <b>You have received a ${data.mailtype}.</b>
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
			  await Message.updateOne({_id:data.id}, {pending: false})
			  console.log(`\x1b[32mMessage sent! E-mail ID: \x1b[36m${msg.messageId}\x1b[0m`)
			  break
		  }
		  }
		  
		  notifyByEmail()
		} catch (err){
		  console.log(`\x1b[33mError sending the email.\n\x1b[31mCouldn't resolve server ${transporter.options.host}\x1b[0m`)
		  setTimeout(()=> {notifyByEmail()}, 5000)
		}
	}

	const checkIfPendings = async ()=> {
		const pendingMessages = await Message.find({pending:true})
		const pendingReviews = await Review.find({pending:true})
		const pendingBudgets = await Budget.find({pending:true})
		const pendingEmails = [...pendingMessages,...pendingReviews,...pendingBudgets]
		if(pendingEmails.length !== 0){
		  console.log(`${pendingEmails.length} emails pending`)
		  setInterval(()=> {
			pendingEmails.forEach((email) => {
			  transporter.verify().then(()=> {
				if(!sending.includes(email.id)) send(email)
  			  })
			  .catch (err=> console.log(`\x1b[31mError sending the email.\n\x1b[31mCouldn't resolve server ${transporter.options.host}\x1b[0m`))
			})
		  }, 10000)
		}
	}
	
	if(mailData) send(mailData)
	checkIfPendings()
}

export default sendEmail
