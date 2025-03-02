import Media from '../database/models/medias.model.js'
import sendEmail from '../libs/mailer.js'

const passAuth = (req) => {
  const auth = req.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer')) {
    return true
  }
}

// Get All Medias
export const getAllMedias = async (req, res) => {
    try {
      const medias = await Media.find().sort({'createdAt': -1})
        res.json(medias)
    } catch (error) {
      return res.status(500).json({
        message: `ALL Medias: Something went wrong: ${error}`
      })
    }
}

// Add a Media
export const createMedia = async (req, res) => {
  const { name, album } = req.body

  try {
  	const newMedia = new Media({
  	    name,
  	    album
  	})
  	  
  	await newMedia.save()
  	//sendEmail('NEW Media', name, ocupation, image)
  	
    console.log(`New Media ${name} added`)
    res.sendStatus(204)
  	  
  } catch (error){
	return res.status(500).json({
	message: `CREATE Media: Something went wrong: ${error}`})
  }
}

// Update a Media
export const updateMedia = async (req, res) => {
  const { name, ocupation, image, reference } = req.body
  const { id } = req.params

  try {
    const updt = await Media.updateOne({_id:id}, {name, ocupation, image, reference})
    if (updt.matchedCount === 1) {
      console.log(`Updated Media ${name}`)
      res.sendStatus(204)
    } else {
      console.log('Record not found')
      res.sendStatus(404)
    }
  } catch (error) {
    return res.status(500).json({
      message: `UPDATE Media: Something went wrong: ${error}`
    })
  }
}

// Delete a Media
export const deleteMedia = async (req, res) => {
    const { id } = req.params

    try {
	  const wkr = await Media.findById({_id:id})
	  await Media.findByIdAndDelete({_id:id})
      res.sendStatus(204)
        
	console.log(`Media ${wkr.name} has been deleted`)        
    } catch (error) {
	console.log(error)
    }
}
