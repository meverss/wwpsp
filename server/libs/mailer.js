import nodemailer from 'nodemailer'

const sendEmail = (mailType, data) => {
	const transporter = nodemailer.createTransport({
	  host: "smtp.gmail.com",
	  port: 465,
	  secure: true,
	  auth: {
	    user: "kiniundev@gmail.com",
	    pass: process.env.GMAIL_KEY,
	  },
	})

	async function main() {
	  let msg
	  switch(mailType){
		case('NEW REVIEW'):
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
	  			<span style='color: #A2B992'>Service rate:</span>&nbsp;${data.rate} stars!<br /><br />
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
	  console.log(`Message sent! E-mail ID: ${msg.messageId}`)
	}
	main().catch(console.error)
} 

export default sendEmail
