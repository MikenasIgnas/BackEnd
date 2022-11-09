const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserRegisterSchema = new Schema({
    email: {
        type:String,
        required: true
    },
    password: {
        type:String,
        required: true
    },
    repeatPassword: {
        type:String,
        required: true
    },
    username: {
        type:String,
        required: true
    },
    secret: {
        type:String,
        required: true
    },
})

const exportUser = mongoose.model("FinTrack", UserRegisterSchema)

module.exports = exportUser