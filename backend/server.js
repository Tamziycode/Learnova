const express = require('express')
const app = express()
const PORT = 5000
const db = require('./db')

app.use(express.json());


app.get("/" , (req, res) => {

})
app.post("/" , (req, res) => {

})
app.put("/" , (req, res) => {

})
app.delete("/" , (req, res) => {

})


app.listen(PORT, () => console.log(`Server has started on ${PORT}`))

