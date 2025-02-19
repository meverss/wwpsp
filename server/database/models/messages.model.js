import mongoose from 'mongoose'

const Schema = mongoose.Schema
const messageSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	subject: {
		type: String,
		required: false
	},
	message: {
		type: String,
		required: true
	}

},{
	timestamps: true
})

messageSchema.set('toJSON', {
	transform: (document,returnedObject) => {
		returnedObject.id = returnedObject._id
		delete returnedObject._id
		delete returnedObject.__v
		delete returnedObject.password
	}
})

export default mongoose.model('message', messageSchema)
