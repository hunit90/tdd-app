const express = require('express')

const PORT = 3000;

const app = express();
const productRoutes = require('./routes')

app.use('/api/products', productRoutes);
app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(PORT);
console.log(`Running on port ${PORT}`)