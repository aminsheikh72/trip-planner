const express = require("express")
require("dotenv").config()
const colors = require("colors")
const app = express()
const cors = require("cors")
const PORT = process.env.PORT || 4000;

const allowedOrigins = [
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn("Blocked by CORS: ", origin);
      callback(null, false); //  Don't throw error
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json())
app.use(express.urlencoded({extended  : true}))

app.get("/",(req,res)=>{
    res.status(200).json({
        message : "welcome to trip planner api"
    })
})

app.use('/api/plan',require("./routes/plannerRoutes"))

app.listen(PORT,()=>console.log(`port is running at${PORT}`.bgBlue))