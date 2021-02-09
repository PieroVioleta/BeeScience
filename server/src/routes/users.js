const router = require('express').Router();
const User = require('../models/user');

router.get('/usr=:userName&pass=:password', async(req, res) => {
    const userName = req.params.userName;
    const password = req.params.password;
    console.log(userName);
    console.log(password);
    await User.find({userName: userName, password: password})
        .then(user => {
            res.json(user)
            console.log(user)
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


// const user = new Schema({
//   user_id: String,
//   userName: String,
//   email: String,
//   password: String
// });


router.post('/add/', async(req, res) => {
  const userName = req.body.userName;
  const email = req.body.email;
  const password = req.body.password;

  const newUser = new User({
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