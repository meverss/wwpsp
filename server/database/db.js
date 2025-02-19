import mongoose from 'mongoose'
import { SERVERIP } from '../config.js'

const IPlist = ['127.0.0.1','192.168.','10.','169.']
let dbServer

export const connectDB = async ()=> {
  try {
/*	for(let i = 0; i < IPlist.length; i++){
	  if(SERVERIP.includes(IPlist[i])){
		dbServer = "mongoose.connect('mongodb://localhost/wwpsp')"	
		break
	  } else {
		dbServer = "mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.l4evt.mongodb.net/wwpsp`)"	
	  }
	}*/
	
	//await eval(dbServer)
	await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.l4evt.mongodb.net/wwpsp`)
	console.log('>>> Connected to Database.')

  } catch (error) {
	console.log(error)
  }
} 
