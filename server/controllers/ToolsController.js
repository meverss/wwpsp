import axios from 'axios'

export const ipInfo = (req, res)=> {
  const {ip} = req.body

  const getIpInfo = async ()=>{
	  await axios.get(`https://api.ipquery.io/${ip}`)
	  	.then(ipData => {
		  res.status(200).json(ipData.data)
		})
		.catch(()=> res.status(500).json({
      	  message: 'Sorry, there were some network issues.'		
		}))
  }
  getIpInfo()
}