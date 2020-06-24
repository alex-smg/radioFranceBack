let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');


let Person = require('../models/Person');

/* GET users listing. */
router.post('/login', function (req, res) {
  console.log(req)
  Person.findOne({
    email: req.body.email
  })
      .then(person => {
        console.log(person);
        if(person) {
          if(bcrypt.compareSync(req.body.password, person.password)) {
            const payload = {
              _id : person._id,
              email: person.email,
              firstname: person.firstname,
              lastname: person.lastname,
            };
            let token = jwt.sign(payload, process.env.SECRET_key, {
              expiresIn:  1440
            });

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
