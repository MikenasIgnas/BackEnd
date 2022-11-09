const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const mainRouter = require("./modules/routes/router")
const session = require("express-session")
mongoose.connect("mongodb+srv://admin:admin@cluster0.ygjtj4s.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log('CONNECTED OK')
    }).catch(e => {
    console.log('CONNECTION ERROR')
})

app.use(cors())
app.use(
    session({
        secret: 'skasdfnsdfgdryh',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

app.use(cors({origin: "http://localhost:3000", credentials: true, methods: "GET,HEAD,PUT,PATCH,POST,DELETE"}))
app.use(express.json())

app.listen(4000)

app.use("/", mainRouter)
