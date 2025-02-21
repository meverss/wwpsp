import app from './app.js'
import { PORT } from './config.js'
import { connectDB } from './database/db.js'

// Settings
app.set('case sensitive routing', true)
app.set('appName', 'wwpsp-server')

// Run Server
connectDB()
app.listen(PORT, () => {
  console.log('---------|\x1b[33m Server status\x1b[0m |---------')
  console.log(`\x1b[32m>>> Server listenning on port \x1b[36m${PORT}.\x1b[0m`)
})
