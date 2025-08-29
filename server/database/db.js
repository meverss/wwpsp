import mongoose from 'mongoose'
import { SERVERIP } from '../config.js'
import sendMail from '../libs/mailer.js'

export const connectDB = ()=> {
  const mongoURLs = [
	{ url: 'mongodb://localhost/wwpsp', name: 'Localhost'},
	{ url: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.l4evt.mongodb.net/wwpsp`, name: 'MongoDB Atlas'}
  ]

  // SETTINGS
  const dbServer = 0	// 0-Localhost, 1-MongoDB Atlas
  const timeout = 3.5	// Timeout in seconds

  const connect = ()=> {
	mongoose.connect(mongoURLs[dbServer].url)
	.then(()=>{
	  const msg = `>>> Connected to Database Server in ${mongoURLs[dbServer].name}.`
	  const msgLength = msg.split('').length
	  console.log(`\x1b[32m${msg} \x1b[0m`)
	  console.log('-'.repeat(msgLength))
	  sendMail()
	})
	.catch((err)=> {
	  console.log(`\x1b[31m>>> Error connecting to database server. \nTrying again in ${timeout} seconds\x1b[0m`)
	  setTimeout(()=> connect(), timeout * 1000)
	})
  }
  
  connect()
} 
