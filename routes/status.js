let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');


let Status = require('../models/Status');

router.get("/", function(req,res) {
    Status.find({})
        .then(function(status) {
            res.send(status);
        })
        .catch(function(err) {
            res.json(err);
        })
});

router.post('/', function (req, res) {
    console.log(req.body);
    new Promise((resolve, reject) => {
        resolve(new Status())
    }).then(status => {
        status.phrasing= req.body.phrasing;
        const date = Date.now();
        status.createdAt= date;
        status.type = req.body.type;
        status.categorie = req.body.categorie;
        status.person = req.body.idPerson;
        status.save( (err, savedStatus) => {
            if (err) console.log(err);
            else {
                return res.send(savedStatus)
                /*return res.sendStatus(200)*/
            }
        });
    })
});

module.exports = router;
