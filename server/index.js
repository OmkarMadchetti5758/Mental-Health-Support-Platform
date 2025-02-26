const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const connectDB = require('./config/db')
//Routes import
const userRoutes = require('./routes/user.routes')
const therapistRoutes = require('./routes/therapist.routes')
const resourseRoutes = require('./routes/resourse.routes')
const groupRoutes = require('./routes/group.routes')

const PORT = process.env.PORT || 5000
connectDB()
app.use(bodyParser.json());
app.use('/api/therapist', therapistRoutes)
app.use('/api/user', userRoutes)
app.use('/api/resourse', resourseRoutes)
app.use('/api/groups', groupRoutes)

// app.use('/', (req, res) => {
//     res.send("Working fine!!")
// })

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})
