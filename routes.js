const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');

const { loginRequired } = require('./src/middlewares/middleware');

// Rotas da home
route.get('/', homeController.index);

// Rotas de login
route.get('/login/index', loginController.index); // deixando como /index so pra dizer que sera a pagina principal
route.post('/login/register', loginController.register); // deixando como /index so pra dizer que sera a pagina principal
route.post('/login/login', loginController.login); // deixando como /index so pra dizer que sera a pagina principal
route.get('/login/logout', loginController.logout); // deixando como /index so pra dizer que sera a pagina principal

// Rotas de contato
route.get('/contato/index', loginRequired, contatoController.index); // deixando como /index so pra dizer que sera a pagina principal
route.post('/contato/register', loginRequired, contatoController.register); 
// ":id" parametro de url
route.get('/contato/index/:id', loginRequired, contatoController.editIndex); // deixando como /index so pra dizer que sera a pagina principal
route.post('/contato/edit/:id', loginRequired, contatoController.edit); // deixando como /index so pra dizer que sera a pagina principal
route.get('/contato/delete/:id', loginRequired, contatoController.delete); // deixando como /index so pra dizer que sera a pagina principal


module.exports = route;