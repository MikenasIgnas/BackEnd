const express = require("express")
const router = express.Router()

const {
    registerValidation,
    userPostDataValid
} = require("../middleware/middle")

const {
    registerUser, 
    login,
    getAll,
    postBudgetData,
    savedBudgetData,
    postMoneyValues,
    deletePost,
    updateMoneyValues,
    latestMoneyValues
} = require("../controllers/mainController")

router.post("/registerUser", registerValidation, registerUser)
router.post("/login", login)
router.post("/budgetData", postBudgetData)
router.post("/postMoneyValues", postMoneyValues)
router.post("/updateMoneyValues", updateMoneyValues)


router.get("/userData", getAll)
router.get("/savedBudgetData/:id/:secret", userPostDataValid, savedBudgetData)
router.get("/deletePost/:id/:secret", deletePost)
router.get("/latestMoneyValues/:id/:secret", latestMoneyValues)
module.exports = router

