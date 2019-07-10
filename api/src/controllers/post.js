const passport = require('passport');
const { Router } = require('express');
const { check, validationResult } = require('express-validator/check');

const Post = require('../models/Post');

const router = Router();

const jwtAuth = passport.authenticate('jwt', { session: false });

const createValidators = [
  jwtAuth,
  check(["message"]).exists(),
];

router.get('/:_id', async (req, res) => {
  const { _id } = req.params;

  try {
    const post = await Post.findOne({ _id }).populate('user');

    if(post) {
      res.send(post);
    } else {
      res.sendStatus(404);
    }
  } catch(err) {
    res.sendStatus(500)
  } 
});

router.post('/', createValidators, async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.array() });
  }

  const { message } = req.body
 
  const post = new Post({
    message,
    user: req.user._id,
  });

  try {
    await post.save();
    res.send(post);
  } catch(err) {
    res.sendStatus(500);
  }
});

router.post('/reply/:_id', createValidators, async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.array() });
  }

  const { _id } = req.params;
  const { message } = req.body

  try {
    const parentPost = await Post.findOne({ _id })

    if(parentPost) {
      const childPost = new Post({
        message,
        user: req.user._id,
      });
      await childPost.save();

      parentPost.replies.push(childPost._id)
      parentPost.save()
      res.sendStatus(200)
    } else {
      res.sendStatus(404)
    }
  } catch(err) {
    res.sendStatus(500)
  }
})

module.exports = router;