import nodemailer from 'nodemailer'

const sendEmail = () => {
	const transporter = nodemailer.createTransport({
	  host: "smtp.gmail.com",
	  port: 465,
	  secure: true,
	  auth: {
	    user: "kiniundev@gmail.com",
	    pass: process.env.GMAIL_KEY,
	  },
	});

	/* transporter.verify().then(() => {
		console.log('Ready for sending e-mails.')
	}) */
	
	async function main() {
	  const msg = await transporter.sendMail({
	    from: '"KiniunDev" <no-replay@kiniun.dev>',
	    to: "meverss@my.com",
	    subject: "Added new user",
	    text: "A new user has been added.",
	    html: "<p style='color: green'>A new user has been added.</p>",
	  });
	
	  console.log("Message sent: %s", msg.messageId);
	}
	
	main().catch(console.error); 
} 

export default sendEmail
