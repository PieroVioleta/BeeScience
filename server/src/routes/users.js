const router = require('express').Router();

const User = require('../models/user');

router.get('/', async(req, res) => {
    await User.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});


// const user = new Schema({
//   user_id: String,
//   userName: String,
//   email: String,
//   password: String
// });


router.post('/add/', async(req, res) => {
  const user_id = req.body.user_id;
  const userName = req.body.userName;
  const email = req.body.email;
  const password = req.body.password;

  const newUser = new User({
      user_id,
      userName,
      email,
      password
  });

  await newUser.save()
      .then(() => {
          res.json(newUser);
      })
      .catch(err => res.status(400).json('Error: ' + err));
})
module.exports = router;  