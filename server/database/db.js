import mongoose from 'mongoose'
import { SERVERIP } from '../config.js'

const IPlist = ['127.0.0.1','192.168.','10.','169.']
let dbServer

export const connectDB = async ()=> {
  try {
//	await mongoose.connect('mongodb://localhost/wwpsp')
	await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.l4evt.mongodb.net/wwpsp`)
	console.log('>>> Connected to Database.')
  } catch (error) {
	console.log(error)
  }
} 
