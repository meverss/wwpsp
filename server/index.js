import app from './app.js'
import { PORT } from './config.js'
import { connectDB } from './database/db.js'

// Settings
app.set('case sensitive routing', true)
app.set('appName', 'wwpsp-server')

// Run Server
connectDB()
app.listen(PORT, () => {
  console.log(`>>> Server listenning on port ${PORT}.`)
})
