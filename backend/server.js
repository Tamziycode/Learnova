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
const courseRoutes = require("./routes/Courseroutes");
const enrollmentRoutes = require("./routes/Enrollmentroutes");
const userRoutes = require("./routes/Userroutes");

// Use routes (prefix them with /api/auth)
app.use("/api/auth", authRoutes);
app.use("/courses", courseRoutes);
app.use("/enroll", enrollmentRoutes);
app.use("/user",userRoutes);

app.listen(PORT, () => console.log(`Server has started on ${PORT}`));

