// - - - - - - - - - - - - - - - - - - - Imports  - - - - - - - - - -
      require('dotenv').config();
      const express  = require('express');
      const mongoose = require('mongoose');
      const bcrypt   = require('bcrypt');
      const jwt      = require('jsonwebtoken');
      const User     = require('./models/User');

// - - - - - - - - - - - - - - - - - - Declarações - - - - - - - -  -
      const app = express();

      app.use('static', express.static('public'));

      app.use('/assets', express.static(__dirname + '/assets'));

      app.use(express.json());

// - - - - - - - - - - - - - - - - Banco de dados - - - - - - - - - -
      const dbUser = process.env.DB_USER;
      const dbPassword = process.env.DB_PASS;

      mongoose.connect(
                  `mongodb+srv://${dbUser}:${dbPassword}@ikgai.rwz6wjq.mongodb.net/?retryWrites=true&w=majority&appName=ikgai`
            ).then(() => {
                  app.listen(3000);
                  console.log("Server Aberto");
            }
            ).catch(
                  (err) => console.log(err)
            );

// - - - - - - - - - - - - - - - - Log in and Register - - - - - -  -
      function checkToken(req, res, next) {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(" ")[1];

            if(!token) {
                  return res.status(401).json({ msg: 'Usuário não encontrado' })
            } 
            
            try {
                  const secret = process.env.SECRET;

                  jwt.verify(token, secret);

                  next();
            } catch(err) {
                  res.status(400).json({ msg: "Token inválido" });
            }
      }

      app.get('/user/:id', checkToken, async(req, res) => {
            const id = req.params.id;

            // check if user exists
            const user = await User.findById(id, '-senha');

            if(!user) {
                  return res.status(404).json({ msg: "Usuário não encontrado" })
            }

            res.status(200).json({ user })
      })

      app.post('/auth/cadastro', async(req, res) => {
            const {name, email, senha, confirmasenha} = req.body;

            // validations
            if(!name) {
                  return res.status(422).json({ msg: 'O nome é obrigátorio' });
            }

            if(!email) {
                  return res.status(422).json({ msg: 'O email é obrigatório' });

            }

            if(!senha) {
                  return res.status(422).json({ msg: 'A senha é obrigatória' });
            }

            if(senha !== confirmasenha) {
                  return res.status(422).json({ msg: 'A senhas não conferem' });
            }

            // check user exist
            const userExists = await User.findOne({ email: email });

            if(userExists) {
                  return res.status(422).json({ msg: 'Use outro e-mail' });
            }

            // create password
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(senha, salt);

            // create user
            const user = new User({
                  name,
                  email,
                  password: passwordHash
            })

            await user.save();
            
      })
      
      app.post('/auth/login', async(req, res) => {
            const {email, senha} = req.body;

            // validations
            if(!email) {
                  return res.status(422).json({ msg: 'O email é obrigatório' });
            }

            if(!senha) {
                  return res.status(422).json({ msg: 'A senha é obrigatória' });
            }

            //check if user exist
            const user = await User.findOne({ email: email });

            if(!user) {
                  return res.status(422).json({ msg: 'Usuário não encontrado!' })
            }

            // check if password match
            const checkPassword = await bcrypt.compare(senha, user.senha)

            if(!checkPassword) {
                  return res.status(422).json({ msg: 'Senha inválida' });
            }

            try {
                  const secret = process.env.SECRET;

                  const token = jwt.sign(
                        {
                              id: user._id,
                        },
                        secret
                  );

                  res.status(200).json({ msg: 'Autentificação realizada com sucesso', token });
            } catch(err) {
                  console.log(err)
            }
      })

// - - - - - - - - - - - - - - - - - Redirecionamento - - - - - - - - 
      app.get('/', (req, res) => {
            res.sendFile(__dirname + `/public/index.html`);
      });

      app.get('/aulas', (req, res) => {
            res.sendFile(__dirname + `/public/aulas.html`);
      });

      app.get('/consumosustentavel', (req, res) => {
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

      app.get('/login', (req, res) => {
            res.sendFile(__dirname + "/public/login.html");
      })

      app.get('/cadastro', (req, res) => {
            res.sendFile(__dirname + "/public/cadastro.html");
      })