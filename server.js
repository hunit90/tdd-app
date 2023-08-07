const express = require('express')

const PORT = 3000;

const app = express();
const productRoutes = require('./routes')
const username = encodeURIComponent("hunit612");
const password = encodeURIComponent("dlrlgns78?");
const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.9nrsdmt.mongodb.net/`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log('MongoDb Connected...'))
    .catch(err => console.log(err));

app.use(express.json());
app.use('/api/products', productRoutes);
app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message })
})

module.exports = app;