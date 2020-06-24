let express = require('express');
let router = express.Router();

let Categorie = require('../models/Categorie');

router.get("/", function(req,res) {
    Categorie.find({})
        .then(function(categories) {
            res.send(categories);
        })
        .catch(function(err) {
            res.json(err);
        })
});

router.post('/', function (req, res) {
    console.log(req.body);
    new Promise((resolve, reject) => {
        resolve(new Categorie())
    }).then(categorie => {
        /*categorie.image= req.body.image;*/
        categorie.name = req.body.name;
        categorie.save( (err, savedTeam) => {
            if (err) console.log(err);
            else {
                return res.send(savedTeam)
            }
        })
    })
});
module.exports = router;
