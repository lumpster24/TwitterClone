const express = require('express');
const passport = require('passport');
const cors = require('cors')

const { connectDatabase } = require('./database');

const AuthController = require('./controllers/auth');
const UserController = require('./controllers/user');
const PostController = require('./controllers/post');
const FollowUserController = require('./controllers/followUser')

connectDatabase();

const app = express();
require('./passport');

app.use(express.json());
app.use(passport.initialize());
app.use(cors())

app.use('/auth', AuthController);
app.use('/user', UserController);
app.use('/post', PostController);
app.use('/followUser', FollowUserController)

app.listen(4000, () => {
  console.log('Listening at localhost:4000...');
});