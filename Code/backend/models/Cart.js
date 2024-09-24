const mongoose = require('mongoose');
const {Schema} = mongoose;
const CartproductsSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
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

module.exports = mongoose.model("cartproducts",CartproductsSchema);