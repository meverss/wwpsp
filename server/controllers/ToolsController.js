import axios from 'axios'

export const ipInfo = (req, res)=> {
  const {ip} = req.body
  let countryFlag = ''

  const getIpInfo = async ()=>{
	try{
	  const ipData = await axios.get(`https://api.ipquery.io/${ip}`)
	  const countryCode = ipData.data.location.country_code

	  const getFlagEmoji = (countryCode)=> {
  		if (!countryCode || countryCode.length !== 2) return ''
  		const codePoints = countryCode
      	  .toUpperCase()
      	  .split('')
      	  .map(char => 127397 + char.charCodeAt())
  		return String.fromCodePoint(...codePoints)
	  }

	  countryFlag = getFlagEmoji(countryCode)
	  //console.log({...ipData.data, country_flag: countryFlag})
	
	  res.status(200).json({...ipData.data, country_flag: countryFlag})
	} catch (err){
		res.status(500).json({
      	  ...err, message: 'Sorry, there were some network issues.'
		})
		console.log(err)
	}
  }
  getIpInfo()
}