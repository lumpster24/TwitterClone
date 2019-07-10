const passport = require('passport');
const { Router } = require('express');

const User = require('../models/User');

const router = Router();
const jwtAuth = passport.authenticate('jwt', { session: false });

router.post('/:_id', jwtAuth, async (req, res) => {
  const { _id } = req.params

  try {
    const user = await User.findOne({ _id })

    if(user) {
      req.user.following.push(user)
      req.user.save()
      res.send(req.user)
    } else {
      res.sendStatus(404)
    }
  } catch(err) {
    res.sendStatus(500)
  }
})

module.exports = router