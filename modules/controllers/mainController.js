const UserRegisterSchema = require("../../shemas/UserRegisterSchema");
const BudgetSchema = require("../../shemas/UserBudgetSchema")
const MoneyValueSchema = require("../../shemas/MoneyValuesSchema")
const {uid} = require("uid");
const bcrypt = require("bcrypt");
const sendRes = require("../modules/universalRes");
module.exports = {
    registerUser: async (req, res) => {
        const {email, passwordOne, repeatPassword, username} = req.body
        const password = await bcrypt.hash(passwordOne, 10)
        const myUser = new UserRegisterSchema({
            email,
            password,
            repeatPassword,
            username,
            secret: uid()
        })
        await myUser.save()
        return sendRes(res, false, "all good", null)
    },
    login: async (req, res) => {
        const {email, password} = req.body
        const userExists = await UserRegisterSchema.findOne({email})
        if(userExists) {
            const compare = await bcrypt.compare(password, userExists.password)
            if(compare) {
                return sendRes(res, false, "all good", userExists)
            }
        }
        return sendRes(res, true, "bad credentials", null)
    },

    getAll: async (req, res) => {
        const messages = await UserRegisterSchema.find()
        return sendRes(res, false, "all good", messages)
    },

    postBudgetData: async(req, res)=> {
        const budget = await BudgetSchema(req.body)
        await budget.save()
        return sendRes(res, false, 'all good', budget)
    },

    savedBudgetData: async(req, res)=> {
        const {id} = req.params
        const budgetData = await BudgetSchema.find({id})
        return sendRes(res, false, 'all Good', budgetData)
    },

    deletePost: async (req, res) => {
        const {id} = req.params
        await BudgetSchema.findOneAndDelete({_id: id})
        res.send({success: true})
    },

    postMoneyValues: async (req, res) => {
        const budget = await MoneyValueSchema(req.body)
        await budget.save()
        return sendRes(res, false, 'all good', budget)
    },

    updateMoneyValues: async (req, res) => {
        const {_id, income, expenses, balance, secret} = req.body
        const moneyValues = await MoneyValueSchema.findOneAndUpdate(
            {secret: secret},
            {$set: {income: income, expenses:expenses, balance:balance}},
            {new : true}
        )
        return sendRes(res, false, 'all good', moneyValues)
    },

    latestMoneyValues: async (req, res) => {
        const {secret} = req.params
        const lastestValues = await MoneyValueSchema.findOne({secret})
        return sendRes(res, false, 'all Good',lastestValues)
    }
  

}