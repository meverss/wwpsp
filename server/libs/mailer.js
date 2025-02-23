import Message from '../database/models/messages.model.js'
import Review from '../database/models/reviews.model.js'
import Budget from '../database/models/budgets.model.js'
import nodemailer from 'nodemailer'

const sendEmail = (mailType, mailData) => {
	let mt = mailType
	let mailSent
	
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

		  switch(mt){
			case('NEW REVIEW'):
			  const rate = '⭐'.repeat(data.rate)
			  msg = await transporter.sendMail({
	  		  from: '"KiniunDev" <no-replay@kiniun.dev>',
	  		  to: "meverss@my.com",
	  		  subject: `You have a ${mt}`,
	  		  html: `
	  			<p style='color: #085c97'>
	  			  <b>You have received a ${mt}.</b>
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
	  		  to: "meverss@my.com",
	  		  subject: `You have a ${mt}`,
	  		  html: `
	  			<p style='color: #085c97'>
	  			  <b>You have received a ${mt}.</b>	  			</p>
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
			  await Budget.updateOne({_id:data.id}, {pending: false})
			  console.log(`\x1b[32mMessage sent! E-mail ID: \x1b[36m${msg.messageId}\x1b[0m`)
			  break
			case('NEW MESSAGE'):
			  msg = await transporter.sendMail({
	  	  	  from: '"KiniunDev" <no-replay@kiniun.dev>',
	  		  to: "meverss@my.com",
	  		  subject: `You have a ${mt}`,
	  		  html: `
	  			<p style='color: #085c97'>
	  			  <b>You have received a ${mt}.</b>
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
		} catch (error) {
		  console.log(`\x1b[31mError sending the email.\n\x1b[31mCouldn't resolve server ${transporter.options.host}\x1b[0m`)
		}
	}

	async function checkIfPendings() {
	  setInterval(async ()=> {
		const pendingMessages = await Message.find({pending:true})
		const pendingReviews = await Review.find({pending:true})
		const pendingBudgets = await Budget.find({pending:true})
		const pendingEmails = [...pendingMessages,...pendingReviews,...pendingBudgets]
		if(pendingEmails.length !== 0){
		  console.log(`${pendingEmails.length} emails pending`)
		  pendingEmails.forEach(email => {
			switch(true){
			  case(email.review !== undefined):
				mt = 'NEW REVIEW'
				break
			  case(email.message !== undefined):
				mt = 'NEW MESSAGE'
				break
			  case(email.budget !== undefined):
				mt = 'NEW BUDGET REQUEST'
				break
			}
			send(email)
		  })
		}
	  },20000)
	}
	
	if(mailType && mailData) send(mailData)
	checkIfPendings()
}

export default sendEmail
