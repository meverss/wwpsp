import mongoose from 'mongoose'

const Schema = mongoose.Schema
const albumSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	medias: [{
		type: Schema.Types.ObjectId,
		ref: 'media',
		required: true
	}]
},{
	timestamps: true
})

albumSchema.set('toJSON', {
	transform: (document,returnedObject) => {
		returnedObject.id = returnedObject._id
		delete returnedObject._id
		delete returnedObject.__v
		delete returnedObject.password
	}
})

export default mongoose.model('album', albumSchema)
