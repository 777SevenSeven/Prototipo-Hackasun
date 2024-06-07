// - - - - - - - - - - - - - - - - - - - Imports  - - - - - - - - - -
      require('dotenv').config();
      const express  = require('express');
      const mongoose = require('mongoose');
      const bcrypt   = require('bcrypt');
      const jwt      = require('jsonwebtoken');
// - - - - - - - - - - - - - - - - - - Declarações - - - - - - - -  -
      const app = express();

      app.use('static', express.static('public'));

// - - - - - - - - - - - - - - - - - Redirecionamento - - - - - - - -
function newPorta(porta, file) {
      
}

      app.get('/', (req, res) => {
            res.sendFile(__dirname + `/public/index.html`);
      });

      app.get('/aulas', (req, res) => {
            res.sendFile(__dirname + `/public/aulas.html`);
      });

      app.get('/Consumo%Sustentavel', (req, res) => {
            res.sendFile(__dirname + `/public/consumo-sustentavel.html`);
      });

      app.get('/contato', (req, res) => {
            res.sendFile(__dirname + `/public/contato.html`);
      });

      app.get('/cursos', (req, res) => {
            res.sendFile(__dirname + `/public/cursos.html`);
      });
     
      app.get('/comunidade', (req, res) => {
            res.sendFile(__dirname + `/public/forum.html`);
      });

      app.get('/blog', (req, res) => {
            res.sendFile(__dirname + `/public/news.html`);
      });

      app.get('/privacidade', (req, res) => {
            res.sendFile(__dirname + `/public/privacidade.html`);
      });

      app.get('/recompensas', (req, res) => {
            res.sendFile(__dirname + `/public/recompensas.html`);
      });

      app.get('/sobre', (req, res) => {
            res.sendFile(__dirname + `/public/sobreNos.html`);
      });

      app.get('/termos', (req, res) => {
            res.sendFile(__dirname + `/public/termos.html`);
      });
// - - - - - - - - - - - - - - - - Login in ou Sign up - - - - - -  -
      

// - - - - - - - - - - - - - - - - - Abertura do Site - - - - - - - -
      app.listen(3000);