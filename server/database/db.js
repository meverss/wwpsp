import mongoose from 'mongoose'
import { SERVERIP } from '../config.js'
import sendMail from '../libs/mailer.js'

export const connectDB = ()=> {
  let isConnected = false

  const connect = async ()=> {
//	await mongoose.connect('mongodb://localhost/wwpsp')
	await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.l4evt.mongodb.net/wwpsp`)
	.then(()=>{
	  console.log('\x1b[32m>>> Connected to Database.\x1b[0m')
	  console.log('-----------------------------------')
	  isConnected = true
	  sendMail()
	})
	.catch((err)=> console.log('\x1b[31m>>> Error connecting to database.\x1b[0m'))
  }
  
  connect()
  setInterval(()=> {
	if(isConnected !== true){
		connect()
	}
  },15000)
} 
