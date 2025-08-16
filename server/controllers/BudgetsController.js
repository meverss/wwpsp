import Budget from '../database/models/budgets.model.js'
import sendEmail from '../libs/mailer.js'

const passAuth = (req) => {
  const auth = req.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer')) {
    return true
  }
}

// Get All Budgets
export const getAllBudgets = async (req, res) => {
    try {
      const budgets = await Budget.find().sort({'createdAt': -1})
        res.json(budgets)
    } catch (error) {
      return res.status(500).json({
        message: `ALL Budgets: Something went wrong: ${error}`
      })
    }
}

// Get One Budget
export const getOneBudget = async (req, res) => {
  const { id } = req.params
  
  try {
    const budgetFound = await Budget.findOne({_id:id})
	const { name, email, phone, budget, createdAt, updatedAt } = budgetFound
	
	res.status(200).json({ 
	name,
	email,
	phone,
	budget,
	createdAt,
	updatedAt
	})
  } catch (error) {
    return res.status(500).json({
      message: `ONE Budget: Something went wrong: ${error}`
    })
  }
}

// Add a Budget
export const createBudget = async (req, res) => {
  const { name, email, phone, budget } = req.body

  try {
  	const newBudget = new Budget({
  	    name,
  	    email,
  	    phone,
  	    budget,
  	    pending: true,
  	    mailtype: 'NEW BUDGET REQUEST'
  	})
	
  	await newBudget.save()
  	sendEmail(newBudget)
  	
    console.log(`${name} requested a budget`)
    res.status(200).json({
  	  message: 'Your budget request has been sent. We will contact you soon.'
    })
  	  
  } catch (err){
	res.status(500).json({
	  message: `Sorry, something went wrong creating a new budget request.`
	})
  }
}


// Delete a Budget
export const deleteBudget = async (req, res) => {
    const { id } = req.params

    try {
	  const bgt = await Budget.findById({_id:id})
	  await Budget.findByIdAndDelete({_id:id})
      res.sendStatus(204)
        
	console.log(`Budget ${bgt._id} has been deleted`)        
    } catch (error) {
	console.log(error)
    }
}
