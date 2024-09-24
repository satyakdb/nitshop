const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://vicky4112004:Vicky2004@cluster0.wzckwst.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const mongoURI = "mongodb://localhost:27017/NITstore";

async function connectToMongo() {
    await mongoose.connect(mongoURI).then(()=> console.log("Connected to Mongo Successfully")).catch(err => console.log(err));
  }

module.exports = connectToMongo;