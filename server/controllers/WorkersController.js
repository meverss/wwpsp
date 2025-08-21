import Worker from '../database/models/workers.model.js'
import sendEmail from '../libs/mailer.js'

const passAuth = (req) => {
  const auth = req.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer')) {
    return true
  }
}

// Get All Workers
export const getAllWorkers = async (req, res) => {
    try {
      const workers = await Worker.find().sort({'createdAt': -1})
        res.json(workers)
    } catch (error) {
      return res.status(500).json({
        message: `Sorry, couldn't retrive the workers list.`
      })
    }
}

// Get One Worker
export const getOneWorker = async (req, res) => {
  const { id } = req.params
  
  try {
    const workerFound = await Worker.findOne({_id:id})
	const { name, ocupation, image, reference, createdAt, updatedAt } = workerFound
	
	res.status(200).json({ 
	name,
	ocupation,
	image,
	reference,
	createdAt,
	updatedAt
	})
  } catch (error) {
    return res.status(500).json({
      message: `ONE Worker: Something went wrong: ${error}`
    })
  }
}

// Add a Worker
export const createWorker = async (req, res) => {
  const { name, ocupation, image } = req.body

  try {
  	const newWorker = new Worker({
  	    name,
  	    ocupation,
  	    image
  	})
  	  
  	await newWorker.save()
  	//sendEmail('NEW Worker', name, ocupation, image)
  	
    console.log(`New Worker ${name} added`)
    res.sendStatus(204)
  	  
  } catch (error){
	return res.status(500).json({
	message: `Sorry, something went wrong adding the worker ${name}`})
  }
}

// Update a Worker
export const updateWorker = async (req, res) => {
  const { name, ocupation, image, reference } = req.body
  const { id } = req.params

  try {
    const updt = await Worker.updateOne({_id:id}, {name, ocupation, image, reference})
    if (updt.matchedCount === 1) {
      console.log(`Updated Worker ${name}`)
      res.sendStatus(204)
    } else {
      console.log('Record not found')
      res.sendStatus(404)
    }
  } catch (error) {
    return res.status(500).json({
      message: `UPDATE Worker: Something went wrong: ${error}`
    })
  }
}

// Delete a Worker
export const deleteWorker = async (req, res) => {
    const { id } = req.params

    try {
	  const wkr = await Worker.findById({_id:id})
	  await Worker.findByIdAndDelete({_id:id})
      res.sendStatus(204)
        
	console.log(`Worker ${wkr.name} has been deleted`)        
    } catch (error) {
	console.log(error)
    }
}
