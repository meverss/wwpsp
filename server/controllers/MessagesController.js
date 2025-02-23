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
    try {
      const Messages = await Message.find().sort({'createdAt': -1})
        res.json(Messages)
    } catch (error) {
      return res.status(500).json({
        message: `ALL Messages: Something went wrong: ${error}`
      })
    }
}

// Get One Message
export const getOneMessage = async (req, res) => {
  const { id } = req.params
  
  try {
    const MessageFound = await Message.findOne({_id:id})
	const { name, ocupation, image, reference, createdAt, updatedAt } = MessageFound
	
	res.status(200).json({ 
	name,
	ocupation,
	image,
	reference,
	createdAt,
	updatedAt
	})
  } catch (error) {
    return res.status(500).json({
      message: `ONE Message: Something went wrong: ${error}`
    })
  }
}

// Add a Message
export const createMessage = async (req, res) => {
  const { name, email, subject, message } = req.body
  let sub = subject
  if(!subject)sub = '(No subject)'
  
  try {
  	const newMessage = new Message({
  	    name,
  	    email,
  	    subject: sub,
  	    message,
  	    pending: true
  	})
  	  
  	await newMessage.save()
  	sendEmail('NEW MESSAGE', newMessage)
  	
    console.log(`New Message from ${name}`)
    res.sendStatus(204)
  	  
  } catch (error){
	return res.status(500).json({
	message: `CREATE Message: Something went wrong: ${error}`})
  }
}

// Update a Message
export const updateMessage = async (req, res) => {
  const { name, ocupation, image, reference } = req.body
  const { id } = req.params

  try {
    const updt = await Message.updateOne({_id:id}, {name, ocupation, image, reference})
    if (updt.matchedCount === 1) {
      console.log(`Updated Message ${name}`)
      res.sendStatus(204)
    } else {
      console.log('Record not found')
      res.sendStatus(404)
    }
  } catch (error) {
    return res.status(500).json({
      message: `UPDATE Message: Something went wrong: ${error}`
    })
  }
}

// Delete a Message
export const deleteMessage = async (req, res) => {
    const { id } = req.params

    try {
	  const wkr = await Message.findById({_id:id})
	  await Message.findByIdAndDelete({_id:id})
      res.sendStatus(204)
        
	console.log(`Message ${wkr.name} has been deleted`)        
    } catch (error) {
	console.log(error)
    }
}
