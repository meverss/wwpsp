import mongoose from 'mongoose'

const Schema = mongoose.Schema
const budgetSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	budget: {
		type: String,
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

budgetSchema.set('toJSON', {
	transform: (document,returnedObject) => {
		returnedObject.id = returnedObject._id
		delete returnedObject._id
		delete returnedObject.__v
		delete returnedObject.password
	}
})

export default mongoose.model('budget', budgetSchema)
