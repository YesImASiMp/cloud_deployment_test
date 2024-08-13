const express = require('express')
const app = express()
app.use(express.static('public'))




//1) declare & config "mongoose"
const mongoose = require('mongoose')
const db = "mongodb+srv://anhnctgch220436:JYNlxgEP023FjXyN@cloudflashgames.fbfpp.mongodb.net/"  //flash_games: db name

mongoose.connect(db)
   .then(() => console.log('connect to db succeed !'))
.catch((err) => console.error('connect to db failed ! ' + err))

//2) declare & config "body-parser"
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//3) declare & config CORS
//Note: must declare before any route
const cors = require('cors')
app.use(cors())

//4) declare & register router
const flashRouter = require('./api/routes/flashRouter')
flashRouter(app)

//5) run server by listening port
const port = 4444
app.listen(process.env.PORT || port)


