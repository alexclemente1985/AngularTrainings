var express = require('express');
var router = express.Router();
const db = require('../db');
const Users = db.Mongoose.model('users', db.UserSchema, 'users');
/* GET users listing. */
router.get('/', async function(req, res, next) {
  
  const docs = await Users.find({}).lean().exec();

  res.render('user',{docs});
});

/* router.get('/user',(req,res)=>{
  res.render('user',{title: 'Cadastro de Usuário'});
}); */

router.post('/user', async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;

  const user = new Users({ username, email });

  try {
    await user.save();
    res.redirect("/");
  } catch (err) {
    next(err);
  }

})


module.exports = router;
