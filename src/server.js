const express = require("express")

const cors = require("cors")
const displayRouter = require("./routes/displayRouter.js")

//const bodyParser = require('body-parser');

const app = express()
const port = 3000 //process.env.PORT

app.use(express.json())
app.use(cors())
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(displayRouter)

app.use(express.static('public'));

app.listen(port, () => {
    console.log("Server up on: " + port)
})
