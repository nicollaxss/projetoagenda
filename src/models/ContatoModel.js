const mongoose = require('mongoose');
const validator = require('validator');

// MongoDB é noSQL
const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true},
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    criadoEm: { type: Date, default: Date.now },
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

    // criando esse com constructor function
function Contato(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
}

/*  Como vai trabalhar diretamente com a base de dados, ela precisa ser assincrona 
    Ela também por ser assincrona, retorna uma promessa.
*/ 

Contato.prototype.register = async function() {
    this.valida();
    if(this.errors.length > 0) return;
    this.contato = await ContatoModel.create(this.body);

};

Contato.prototype.valida = function() {
    this.cleanUp();
    // Validação
    // Se existir um email e ele não for válido, retorna um erro
    if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
    if(!this.body.nome) this.errors.push('Nome é um campo obrigatório.');
    if(!this.body.email && !this.body.telefone) {
        this.errors.push('Pelo menos um contato precisa ser enviado: e-mail ou telefone.');
    } 
};
    // limpar meu objeto
Contato.prototype.cleanUp = function() {
    for(const key in this.body) {
        if(typeof this.body[key] !== 'string') {
            this.body[key] = '';
        }
    }

    this.body = {
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        email: this.body.email,
        telefone: this.body.telefone,
    };
};

Contato.prototype.edit = async function(id) {
    if(typeof id !== 'string') return;
    this.valida();
    if(this.errors.length > 0) return;
    //                                             retornar dados atualizados         
    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
};

// Métodos estáticos
// não vão para o prototype e não tem acesso a palavra this -> como this.valida(), etc
Contato.buscaPorId = async function(id) {
    if(typeof id !== 'string') return;
    const contato = await ContatoModel.findById(id); // 
    return contato;
}

Contato.buscaContatos = async function() {
    const contatos = await ContatoModel.find().sort({ criadoEm: -1 });
    console.log(contatos);
    return contatos;
}

Contato.delete = async function(id) {
    if(typeof id !== 'string') return;
    const contato = await ContatoModel.findOneAndDelete({ _id: id });
    return contato;
}

module.exports = Contato;