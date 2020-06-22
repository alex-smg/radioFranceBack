let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function (req, res) {
  console.log(req.body);
  new Promise((resolve, reject) => {
    resolve(new Person())
  }).then(person => {
    person.email= req.body.email;
    person.password= req.body.password;
    person.avatar = req.body.avatar;
    person.firstname = req.body.firstname;
    person.lastname = req.body.lastname;
    req.body.categories.forEach(el => {
        person.categories.push(mongoose.Types.ObjectId(el._id));
    })
    return person.save();
  })
});
module.exports = router;
