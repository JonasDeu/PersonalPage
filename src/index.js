const express = require("express")

const https = require('https');
const fs = require('fs');
const helmet = require('helmet')


const cors = require("cors")
const displayRouter = require("./routes/displayRouter.js")

const app = express()
const port =process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use(displayRouter)
app.use(helmet());
app.use(express.static('public'));

const options = {
    cert: fs.readFileSync('./sslcert/fullchain.pem'),
    key: fs.readFileSync('./sslcert/privkey.pem')
};

app.listen(port, () => {
    console.log("Server up on: " + port)
})

https.createServer(options, app).listen(3001);