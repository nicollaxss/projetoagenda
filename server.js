require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        app.emit('pronto');
    })
    .catch(e => console.log(e));

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');
const csurf = require('csurf');

app.use(helmet());
    // transformar o body da req como objeto
app.use(express.urlencoded( { extended : true} )); 
    // usar os conteudos estaticos
app.use(express.static(path.resolve(__dirname, 'public'))); //pasta q ta esse arquivo + a pasta public

    // configurando sessao
const sessionOptions = session({
    secret: 'asdasdasfasdasdasda()',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // em milesimos de seg
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flash());

    // settando as views do projeto
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs'); // ejs mais se assemelha ao html

    // usando o csurf
app.use(csrf());
    // fazendo todas as rotas passarem pelo middleware global
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
    // usando o arquivo routes no app
app.use(routes);

    // fazendo com que escute apenas depois da conexão com o db
app.on('pronto', () => {
    // fazendo o nodemon atualizar automaticamente
    app.listen(3000, () => {
        console.log('Acessar http://localhost:3000');
        console.log('Servidor executando na porta 3000');
    });
});
