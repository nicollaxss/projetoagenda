const mongoose = require('mongoose');


// MongoDB é noSQL
const HomeSchema = new mongoose.Schema({
    titulo: { type: String, required: true},
    descricao: String
});

const HomeModel = mongoose.model('Home', HomeSchema);

// classe para validar os dados
class Home {

}

module.exports = Home;