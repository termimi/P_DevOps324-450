const router = require('express').Router();
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const UserModel = require('../database/models/user.model');
const { key } = require('../env/keys');

const cleanUser = (user) => {
  // eslint-disable-next-line no-unused-vars
  const { _id, password, __v, ...cleanedUser } = user.toObject();
  return cleanedUser;
};

// login user
router.post('/', async (req, res) => {
  const body = req.body;
  const user = await UserModel.findOne({ email: body.email }).exec();
  if (user) {
    if (bcrypt.compareSync(body.password, user.password)) {
      const token = jsonwebtoken.sign({}, key, {
        subject: user._id.toString(),
        expiresIn: 60 * 60 * 24 * 30 * 6,
        algorithm: 'RS256',
      });
      res.cookie('token', token);
      res.json(cleanUser(user));
    } else {
      console.error('LOGIN: Mauvais email ou mot de passe!');
      res.status(400).json('Mauvais email ou mot de passe!');
    }
  } else {
    console.error('LOGIN: Utilisateur non trouvé');
    res.status(400).json('Utilisateur non trouvé');
  }
});

module.exports = router;
