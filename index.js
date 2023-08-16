const express = require('express')
const app = express()
const port =5000;


const mongodb = require('./db');
mongodb();
app.use((req,res,next )=>{
  res.setHeader("Access-Control-Allow-Origin","https://foodie-self-three.vercel.app/")
  res.header("Access-Control-Allow-Headers",
  "Origin,X-Requested-Width,Content-Type, Accept"
  )
  next();
})
app.use(express.json())  
app.use('/api',require("./routes/createUser")) 
app.use('/api',require("./routes/DisplayData")) 
app.use('/api',require("./routes/OrderData")) 
app.get('/', (req, res) => {
  res.send('Hello World!')
})
 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
