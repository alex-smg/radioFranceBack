let mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

let personSchema = new mongoose.Schema({
    email: String,
    password: String,
    avatar: String,
    firstname: String,
    lastname: String,
    age: Number,
    categories : [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Categorie'
        }
    ],
},{ collection : 'person' });

personSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

/*personSchema.virtual('teams', {
    ref: 'Team',
    localField: '_id',
    foreignField: 'types'
});*/

let Person = mongoose.model('Person', personSchema);

module.exports = Person;
