const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserBudgetSchema = new Schema({
    _id:{
        type: String,
        required:true,
    },
    expense: {
        type:String,
        required: true
    },
    price: {
        type:Number,
        required: true
    },
    secret:{
        type:String,
        required:true,
    },
})

const exportPostData = mongoose.model("UserBudgetData", UserBudgetSchema)

module.exports = exportPostData