import Message from '../database/models/messages.model.js'
import sendEmail from '../libs/mailer.js'

const passAuth = (req) => {
  const auth = req.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer')) {
    return true
  }
}

// Get All Messages
export const getAllMessages = async (req, res) => {
  await Message.find().sort({'createdAt': -1})
    .then(messages => {
      res.json(messages)
    })
    .catch(err => {
      res.status(500).json({
    	icon: 'err',
        message: 'Sorry, unable to retrive messages from tve server'
  	  })
    })
}

// Add a Message
export const createMessage = async (req, res) => {
  const { name, email, subject, message } = req.body
  let sub = subject
  if(!subject) sub = '(No subject)'
  
  const newMessage = new Message({
    name,
    email,
    subject: sub,
    message,
    pending: true,
    mailtype: 'NEW MESSAGE'
  })
  	  
  await newMessage.save()
	.then(newMsg => {
  	  sendEmail(newMessage)
  	  console.log(`New Message from ${name}`)
  	  res.status(200).json({
		icon: 'ok',
		message: 'Your message has been sent successfully'
  	  })
  	})
	.catch(err => {
	  res.status(500).json({
		icon: 'err',
		message: 'Sorry, something went wrong trying to send the message'
	  })
  })
}

// Update a Message
export const updateMessage = async (req, res) => {
  const { name, ocupation, image, reference } = req.body
  const { id } = req.params

  await Message.updateOne({_id:id}, {name, ocupation, image, reference})
    .then(updt => {
  	  if (updt.matchedCount === 1) {
    	console.log(`Updated Message ${name}`)
    	res.status(200).json({
    	  icon: 'ok',
    	  message: 'Message status updated successfully'
    	})
  	  } else {
    	console.log('Record not found')
    	res.status(404).json({
    	  icon: 'inf',
    	  message: 'Record not found'
    	})
  	  }
    })
  .catch(err => {
    res.status(500).json({
  	  icon: 'err',
      message: 'Sorry, there was an error trying to update the record'
	})
  })
}

// Delete a Message
export const deleteMessage = async (req, res) => {
    const { id } = req.params

    try {
	  const wkr = await Message.findById({_id:id})
	  await Message.findByIdAndDelete({_id:id})
      res.sendStatus(204)
        
	console.log(`Message ${wkr.name} has been deleted`)        
    } catch (err) {
	console.log(err)
    }
}
