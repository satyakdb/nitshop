const connectToMongo = require("./db");
const express = require('express')  
const cors = require('cors')
const port = 5001
const app = express()

app.use(cors())
app.use(express.json())
connectToMongo();

app.use('/api/auth',require('./routes/auth'));
app.use('/api/products',require('./routes/products'));
app.use('/api/cart',require('./routes/cart'));

app.listen(port, () => {
  console.log(`nitstore backend listening at port http://localhost:${port}/api/auth`)
})