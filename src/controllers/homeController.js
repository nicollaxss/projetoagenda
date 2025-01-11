const Contato = require('../models/ContatoModel');

exports.index = async (req, res) => {
    const contatos = await Contato.buscaContatos();
    res.render('index', { contatos }); // ja quero passar o objeto com o mesmo nome
};
