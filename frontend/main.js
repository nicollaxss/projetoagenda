import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './modules/Login';

const login = new Login('.form-login'); // passando a classe do formulario para a classe no JS
const cadastro = new Login('.form-cadastro'); // passando a classe do formulario para a classe no JS
login.init();
cadastro.init();


// import './assets/css/style.css';