let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let mongoose = require('mongoose');

const secret = 'secret';


let Person = require('../models/Person');

/* GET users listing. */
router.post('/login', function (req, res) {
  console.log(req.body)
  Person.findOne({
    email: req.body.email
  }).then(person => {
        if(person) {
          console.log(person);
          if(bcrypt.compareSync(req.body.password, person.password)) {
            console.log('test')
            const payload = {
              _id : person._id,
              email: person.email,
              firstname: person.firstname,
              lastname: person.lastname,
            };
            let token = jwt.sign(payload, secret, {
              expiresIn:  1440
            });
            console.log(token);
            console.log(payload);
            console.log(token);

            return res.json({
              token,
              payload,
              isToken: true
            });
          } else {
            res.json({error: 'Password incorrect', isToken: false });
          }
        } else {
          console.log('nop');
          res.json({error: 'User incorrect', isToken: false});
        }
      })
      .catch(err => {
        res.send(err)
      })
});

router.post('/', function (req, res) {
  console.log(req.body);
  new Promise((resolve, reject) => {
    resolve(new Person())
  }).then(person => {
    person.email= req.body.email;
    person.password= req.body.password;
    person.firstname = req.body.firstname;
    person.lastname = req.body.lastname;
    req.body.categories.forEach(el => {
        person.categories.push(mongoose.Types.ObjectId(el._id));
    })
    person.save( (err, savedPerson) => {
      if (err) console.log(err);
      else {
        return res.sendStatus(200)
      }
    });
  })
});
module.exports = router;
