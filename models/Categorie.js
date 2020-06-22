let mongoose = require('mongoose');

let categorieSchema = new mongoose.Schema({
    name: String,
    image: String,

},{ collection : 'categorie' });


let Categorie = mongoose.model('Categorie', categorieSchema);

module.exports = Categorie;
