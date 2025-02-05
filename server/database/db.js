import mongoose from 'mongoose'

export const connectDB = async () => {
	try {
//	    await mongoose.connect('mongodb://localhost/wwpsp')
	    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.l4evt.mongodb.net/wwpsp`)
	    console.log('>>> Connected to Database.')
	} catch (error) {
	    console.log(error)
	}
} 
