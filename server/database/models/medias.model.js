import mongoose from 'mongoose'

const Schema = mongoose.Schema
const mediaSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	album: {
		type: String,
		required: true
	}
},{
	timestamps: true
})

mediaSchema.set('toJSON', {
	transform: (document,returnedObject) => {
		returnedObject.id = returnedObject._id
		delete returnedObject._id
		delete returnedObject.__v
		delete returnedObject.password
	}
})

export default mongoose.model('media', mediaSchema)
