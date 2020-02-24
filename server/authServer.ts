import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { generateAccessToken, validateUser } from './utilities';

var cookieParser = require('cookie-parser');
const { check } = require('express-validator');
const jwt = require('jsonwebtoken');
const app : express.Express = express();

let refreshTokens: Array<any> = [];
app.use(
  cors({ 
    origin: 'http://localhost:3000',
    credentials: true
  })
);
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.json());

const validationRules = [
  check('email').isEmail(),
  check('password').isLength({ min: 6 }),
  check('username').isAlphanumeric()
];

app.post('/login', validationRules, validateUser, async (req: any, res: any) => {
  const accessToken = generateAccessToken(req.body);
  const refreshToken = jwt.sign(req.body.email, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);
  res.cookie('refresh_token', 'fffff', {
    maxAge: 60 * 60 * 1000, // convert from minute to milliseconds
    httpOnly: true,
    // secure: false
  });
  console.log(req.cookies);
  res.json({ accessToken, refreshToken });
});

// app.post('/token', (req: any, res: any) => {
//   const refreshToken = req.body.token;
//   if (!refreshToken) return res.sendStatus(401);
//   if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
//   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err: any, user: any) => {
//     if (err) return res.sendStatus(403);
//     const accesstoken = generateAccessToken({ username: user.name });
//   });
// });

app.listen(process.env.PORT || 8092, () : void => console.log('Listening on port 8092.\n'));