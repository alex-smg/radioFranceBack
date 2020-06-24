let mongoose = require('mongoose');

let statusSchema = new mongoose.Schema({
    phrasing: String,
    type: String,
    createdAt: Date,
    person :
    {
        type: mongoose.Types.ObjectId,
        ref: 'Person'
    },
    categorie :
    {
        type: mongoose.Types.ObjectId,
        ref: 'Categorie'
    }
},{ collection : 'status' });

statusSchema.pre('save', function(next){
    next();
});

/*personSchema.virtual('teams', {
    ref: 'Team',
    localField: '_id',
    foreignField: 'types'
});*/

let Status = mongoose.model('Status', statusSchema);

module.exports = Status;
