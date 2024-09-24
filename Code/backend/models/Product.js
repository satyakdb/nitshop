const mongoose = require('mongoose');
const {Schema} = mongoose;
const ProductsSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    title:{
        type : String,
        required : true
    },
    description:{
        type: String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    mainImage : {
        type : [String],
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model("products",ProductsSchema);