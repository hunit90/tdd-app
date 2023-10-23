const express = require('express');
const app = express();
const PORT = 4000;
const productRoutes = require('./routes')

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://hunit612:test1234@cluster0.9nrsdmt.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log('MongoDB Connected..'))
.catch((error) => console.error(error));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/api/products', productRoutes);

app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
})