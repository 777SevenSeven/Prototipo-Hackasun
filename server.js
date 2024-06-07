const express = require('express');
const app = express();

app.use(express.static('./public'));

app.get('/', (req, res) => {
      res.send("<h1>Home</h1>")
})

app.get('/Consumo Sustentável', (req, res) => {
      res.sendFile("PG7.html")
})

app.listen(3000, () => {
      console.log("Aberto o server");
})