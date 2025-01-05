import mongoose from 'mongoose'

export const connectDB = async () => {
	try {
	    await mongoose.connect('mongodb://localhost/wwpsp')
	    console.log('>>> Connected to Database.')
	} catch (error) {
	    colsole.log(error)
	}
} 
