import nodemailer from 'nodemailer'

const sendEmail = (reason, user, email, message) => {
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
	  const msg = await transporter.sendMail({
	    from: '"KiniunDev" <no-replay@kiniun.dev>',
	    to: "meverss@my.com",
	    subject: `You have a ${reason}`,
	    html: `
	    <p style='color: #085c97'>
	  	  <b>You have received a ${reason}.</b>
	    </p>
	    <p style='color: #37a1c6'>
	  	  <b>Details:</b>
	    </p>
	    <p>
	  	  <span style='color: #A2B992'>Name:</span>&nbsp;${user}<br /><br />
	  	  <span style='color: #A2B992'>E-mail:</span>&nbsp;${email}<br /><br />
	  	  <span style='color: #A2B992'>Message:</span><br />${message}
	    </p>   
	    `,
	  })
	
	  console.log("Message sent: ID %s", msg.messageId)
	}
	
	main().catch(console.error)
} 

export default sendEmail
