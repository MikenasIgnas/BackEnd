const isEmail = require("is-email")
const sendRes = require("../modules/universalRes")
const UserRegisterSchema = require("../../shemas/UserRegisterSchema")
const BudgetSchema = require("../../shemas/UserBudgetSchema")
module.exports  = {

    registerValidation: (req, res, next) => {
        const {email, passwordOne, repeatPassword} = req.body
        if(!isEmail(email)) return sendRes(res, true, "bad email", null)
        if(passwordOne !== repeatPassword) return sendRes(res, true, "password should match", null)
        if(passwordOne.length < 5) return sendRes(res, true, 'Bad Password Length')
        if(!passwordOne) return sendRes(res, true, "password should be longer than 0", null)
        next()
    },

    secretValidate: async (req, res, next) => {
        const {secret} = req.params
        const userExists = await UserRegisterSchema.findOne({secret})
        if(!userExists) return  sendRes(res, true, "bad user secret", null)
        next()
    },

    userPostDataValid: async (req, res, next) => {
        const {secret} = req.params
        const userExists = await BudgetSchema.findOne({secret})
        if(!userExists) return  sendRes(res, true, "bad user secret", null)
        next()
    },
}
