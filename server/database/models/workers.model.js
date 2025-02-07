import mongoose from 'mongoose'

const Schema = mongoose.Schema
const workerSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	ocupation: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	reference: {
		type: String,
		required: true
	}

},{
	timestamps: true
})

workerSchema.set('toJSON', {
	transform: (document,returnedObject) => {
		returnedObject.id = returnedObject._id
		delete returnedObject._id
		delete returnedObject.__v
		delete returnedObject.password
	}
})

export default mongoose.model('worker', workerSchema)
