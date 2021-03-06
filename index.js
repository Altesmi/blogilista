const http = require("http")
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const blogsRouter = require("./controllers/blogs")
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const commentsRouter = require('./controllers/comments')
const config = require("./utils/config")

app.use(cors())
app.use(bodyParser.json())
app.use(function(request,response,next) { 
  // a simple tokenExtractor function
  //puts the token from request headers to request.body.token
  //if the token exists
  const authorization = request.get('authorization')

  if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }

  next()

})


app.use('/api/blogs',blogsRouter)
app.use('/api/users',usersRouter)
app.use('/api/login',loginRouter)
app.use('/api/comments', commentsRouter)
app.use(express.static('build'))

const server = http.createServer(app)

const port = process.env.port || config.port
server.listen(port, () => {
  console.log(`Server running on port ${config.port}`)
});

server.on("close", () => {
  blogsRouter.close()
})

module.exports = {
  app,server
}