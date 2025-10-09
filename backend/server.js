const express = require('express')
const dotenv = require("dotenv");
const cors = require("cors")
dotenv.config();
const app = express()

const db = require('./db')



const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())

const authRoutes = require("./routes/Authroutes");

// Use routes (prefix them with /api/auth)
app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`Server has started on ${PORT}`))

