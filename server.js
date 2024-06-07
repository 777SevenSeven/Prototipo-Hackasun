// - - - - - - - - - - - - - - - - - - Imports - - - - - - - - - - --
      const express  = require('express');
      const mongoose = require('mongoose');
      const bcrypt   = require('bcrypt');
      const jwt      = require('jsonwebtoken');
// - - - - - - - - - - - - - - - - - - Declarações - - - - - - - - --
      const app = express();

      app.use('static', express.static('public'));

      function newPorta(porta, file) {
            app.get(porta, (req, res) => {
                  res.sendFile(__dirname + `/public/${file}`);
            })
      }
// - - - - - - - - - - - - - - - - - - Redirecionamento - - - - - - -
      newPorta('/', '/index.html');

      newPorta('/aulas', 'aulas.html');

      newPorta('/Consumo%Sustentavel', 'consumo-sustentavel.html');

      newPorta('/contato', 'contato.html');
     
      newPorta('/cursos', 'cursos.html');

      newPorta('/comunidade', 'forum.html');

      newPorta('/blog', 'news.html');

      newPorta('/privacidade', 'privacidade.html');

      newPorta('/recompensas', 'recompensas.html');

      newPorta('/sobre', 'sobreNos.html');

      newPorta('/termos', 'termos.html');
// - - - - - - - - - - - - - - - - - - Abertura do Site - - - - - - -
      app.listen(3000);