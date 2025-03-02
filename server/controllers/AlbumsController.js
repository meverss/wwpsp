import Album from '../database/models/albums.model.js'
import sendEmail from '../libs/mailer.js'

const passAuth = (req) => {
  const auth = req.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer')) {
    return true
  }
}

// Get All Albums
export const getAllAlbums = async (req, res) => {
    try {
      const albums = await Album.find().sort({'createdAt': -1}).populate('medias')
        res.json(albums)
    } catch (error) {
      return res.status(500).json({
        message: `ALL Albums: Something went wrong: ${error}`
      })
    }
}

// Get One Album
export const getOneAlbum = async (req, res) => {
  const { id } = req.params
  
  try {
    const albumFound = await Album.findById(id).populate('medias')
      res.json(albumFound)
  } catch (error) {
    return res.status(500).json({
      message: `ONE Album: Something went wrong: ${error}`
    })
  }
}

// Add a Album
export const createAlbum = async (req, res) => {
  const { name, medias } = req.body

  try {
  	const newAlbum = new Album({
  	    name,
  	    medias
  	})
  	  
  	await newAlbum.save()
  	//sendEmail('NEW Album', name, ocupation, image)
  	
    console.log(`New Album ${name} added`)
    res.sendStatus(204)
  	  
  } catch (error){
	return res.status(500).json({
	message: `CREATE Album: Something went wrong: ${error}`})
  }
}

// Update a Album
export const updateAlbum = async (req, res) => {
  const { name, ocupation, image, reference } = req.body
  const { id } = req.params

  try {
    const updt = await Album.updateOne({_id:id}, {name, ocupation, image, reference})
    if (updt.matchedCount === 1) {
      console.log(`Updated Album ${name}`)
      res.sendStatus(204)
    } else {
      console.log('Record not found')
      res.sendStatus(404)
    }
  } catch (error) {
    return res.status(500).json({
      message: `UPDATE Album: Something went wrong: ${error}`
    })
  }
}

// Delete a Album
export const deleteAlbum = async (req, res) => {
    const { id } = req.params

    try {
	  const wkr = await Album.findById({_id:id})
	  await Album.findByIdAndDelete({_id:id})
      res.sendStatus(204)
        
	console.log(`Album ${wkr.name} has been deleted`)        
    } catch (error) {
	console.log(error)
    }
}
