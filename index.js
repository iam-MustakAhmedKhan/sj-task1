const express = require('express');
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const swagger = require('swagger-ui-express')
const YML = require('yamljs')
const cors = require('cors')
const swaggerDocument = YML.load('./swagger.yaml')
const taskRoute= require('./routes/tasks.route');
const globalError = require('./middlewares/globalError.middleware');
dotenv.config()

const app = express();
app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors())
app.use('/docs/v1',swagger.serve,swagger.setup(swaggerDocument))


app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK'
    })
})

app.use('/', taskRoute)

app.use(globalError)


const port = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => {
        console.log('Connected to MongoDB')

        app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
})

