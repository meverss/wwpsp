const wwpsp = require('./data/db.json')
const users = require('./data/users.json')
const posts = require('./data/posts.json')

module.exports = () => {
  return {
    wwpsp: wwpsp,
    users: users,
    posts: posts
  }
}