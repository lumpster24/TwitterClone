const passport = require('passport');
const { Router } = require('express');
const { check, validationResult } = require('express-validator/check');

const Post = require('../models/Post');

const router = Router();

const jwtAuth = passport.authenticate('jwt', { session: false });

const createValidators = [
  jwtAuth,
  check(["title", "body"]).exists(),
];

router.get('/:_id', async (req, res) => {
  const { _id } = req.params;

  const post = await Post.findOne({ _id }).populate('user');

  if(post) {
    res.send(post);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', createValidators, async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.array() });
  }

  const post = new Post({
    ...req.body,
    user: req.user._id,
  });
  try {
    await post.save();
    res.send(post);
  } catch(err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;