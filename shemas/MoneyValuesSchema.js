const mongoose = require("mongoose")
const Schema = mongoose.Schema

const MoneyValuesShema = new Schema({
    _id:{
        type: String,
        required:true,
    },
    income: {
        type:Number,
        required: true
    },
    expenses: {
        type:Number,
        required: true
    },
    balance: {
        type:Number,
        required: true
    },
    secret:{
        type:String,
        required:true,
    },
})

const exportPostData = mongoose.model("UserMoneyData", MoneyValuesShema)

module.exports = exportPostData