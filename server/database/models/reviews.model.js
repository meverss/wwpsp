import mongoose from 'mongoose'

const Schema = mongoose.Schema
const reviewSchema = new Schema({
	author: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	review: {
		type: String,
		required: true
	},
	rate: {
		type: Number,
		min: 1,
		max: 5,
		required: true
	},
	enabled: {
		type: Boolean,
		required: true
	},
	pending: {
		type: Boolean,
		required: true
	},
	mailtype: {
		type: String,
		required: true
	}

},{
	timestamps: true
})

reviewSchema.set('toJSON', {
	transform: (document,returnedObject) => {
		returnedObject.id = returnedObject._id
		delete returnedObject._id
		delete returnedObject.__v
		delete returnedObject.password
	}
})

export default mongoose.model('Review', reviewSchema)
