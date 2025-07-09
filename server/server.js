const express = require("express")
require("dotenv").config()
const colors = require("colors")
const app = express()
const cors = require("cors")
const PORT = process.env.PORT || 4000;

app.use(cors({
    credentials : true,
    origin : "http://localhost:5173"
}))

app.use(express.json())
app.use(express.urlencoded({extended  : true}))

app.get("/",(req,res)=>{
    res.status(200).json({
        message : "welcome to trip planner api"
    })
})

app.use('/api/plan',require("./routes/plannerRoutes"))

app.listen(PORT,()=>console.log(`port is running at${PORT}`.bgBlue))