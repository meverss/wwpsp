const jsonServer = require('json-server')
const server = jsonServer.create()
// const router = jsonServer.router('./data/database.json')
// const router = jsonServer.router('./data/db.json')
const router = jsonServer.router(require('./db.js')())
const middlewares = jsonServer.defaults()
const port = process.env.PORT || 3001

server.use(middlewares)
server.use(router)

server.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`)
})
