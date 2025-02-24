const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const connectDB = require('./config/db')
const userRoutes = require('./routes/user')

const PORT = process.env.PORT || 5000
connectDB()
app.use(bodyParser.json())

// app.use('/', (req, res) => {
//     res.send("Working fine!!")
// })
app.use('/api/user', userRoutes)

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})
