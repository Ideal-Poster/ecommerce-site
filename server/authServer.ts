import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { generateAccessToken, validateUser, authenticateToken } from './utilities';

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
  const expiryTime = process.env.TOKEN_EXPIRY_TIME;
  const accessToken = generateAccessToken({ email: req.body.email });
  const refreshToken = generateAccessToken({ email: req.body.email });
  refreshTokens.push(refreshToken);
  res.cookie('refresh_token', refreshToken, {
    // maxAge: 1000 * 60 * 15 , // 15 minutes
    httpOnly: true,
    // secure: false
  });
  res.json({ accessToken, expiryTime });
});

app.post('/refresh_token', (req: any, res: any) => {
  const expiryTime = process.env.TOKEN_EXPIRY_TIME;
  const refreshToken = req.cookies.refresh_token;
  if (!refreshToken) return res.sendStatus(401);
  const user = authenticateToken(refreshToken);
  if(!user) return res.sendStatus(403);
  const accessToken = generateAccessToken({ username: user.email });
  const newRefreshToken = generateAccessToken({ username: user.email });
  res.cookie('refresh_token', newRefreshToken, {
    // maxAge: 1000 * 60 * 15 , // 15 minutes
    httpOnly: true,
    // secure: false
  });
  res.json({ accessToken, expiryTime });
});

app.listen(process.env.PORT || 8092, () : void => console.log('Listening on port 8092.\n'));