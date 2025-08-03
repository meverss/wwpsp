import Review from '../database/models/reviews.model.js'
import sendEmail from '../libs/mailer.js'
import axios from 'axios'

const passAuth = (req) => {
  const auth = req.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer')) {
    return true
  }
}

// Get All Reviews
export const getAllReviews = async (req, res) => {
  await Review.find().sort({'createdAt': -1}).populate('author')
	.then((reviews)=> res.json(reviews))
    .catch(()=> res.status(500).json({
      message: 'Sorry, something went wrong retriving the reviews.'
    }))
}

// Create a review
export const createReview = async (req, res) => {
  const { author, email, review, rate } = req.body

  try {
  	const newReview = new Review({
  	    author,
  	    email,
  	    review,
  	    rate,
  	    enabled: true,
  	    pending: true,
  	    mailtype:'NEW REVIEW'
  	})
  	  
  	await newReview.save()
  	sendEmail(newReview)
  	
    console.log(`${author} added a new review`)
    res.sendStatus(204)
  	  
  } catch (error){
	return res.status(500).json({
	message: `CREATE Review: Something went wrong: ${error}`})
  }
}

// Update a review (ALL)
export const updateReview = async (req, res) => {
  const { review, password, enabled, fullname } = req.body
  const passwordHashed = await argon2.hash(password, {type: argon2.argon2id})
  const { id } = req.params

  try {
    const updt = await review.updateOne({_id:id}, {review,fullname,password:passwordHashed,enabled})
    if (updt.matchedCount === 1) {
      console.log(`Updated review ${fullname}`)
      res.sendStatus(204)
    } else {
      console.log('Record not found')
      res.sendStatus(404)
    }
  } catch (error) {
    return res.status(500).json({
      message: `UPDATE review: Something went wrong: ${error}`
    })
  }
}

// Update a review (No-Password)
export const updateReviewNoPass = async (req, res) => {
  const { review, enabled, fullname } = req.body
  const { id } = req.params

  try {
    const updt = await review.updateOne({_id:id}, {review,fullname,enabled})
    if (updt.matchedCount === 1) {
      console.log(`Updated review ${fullname}`)
      res.sendStatus(204)
    } else {
      console.log('Record not found')
      res.sendStatus(404)
    }
  } catch (error) {
    return res.status(500).json({
      message: `UPDATE review: Something went wrong: ${error}`
    })
  }
}

// Delete a review
export const deleteReview = async (req, res) => {
    const { id } = req.params

    try {
	const usr = await review.findById({ _id:id})
        await review.findByIdAndDelete({_id:id})
        res.sendStatus(204)
        
	console.log(`review ${usr.fullname} has been deleted`)        
    } catch (error) {
	console.log(error)
    }
}
