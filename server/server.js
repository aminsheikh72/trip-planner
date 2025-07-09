const express = require("express");
require("dotenv").config();
const colors = require("colors");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = [
  "https://trip-planner-topaz-sigma.vercel.app"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn("❌ Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
};

app.use(cors(corsOptions));

// ✅ Allow preflight for all routes
app.options(/^.*$/, cors(corsOptions)); // ✅ Regex fix

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "welcome to trip planner api"
  });
});

app.use("/api/plan", require("./routes/plannerRoutes"));

app.listen(PORT, () => {
  console.log(`port is running at ${PORT}`.bgBlue);
});
