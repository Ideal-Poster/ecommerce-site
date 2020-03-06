import bcrypt from 'bcrypt';
import { User } from './models';
const jwt = require('jsonwebtoken');

export async function validateUser(req: any, res: any, next: any) {
  const user = await User.find(req.body.email);
  if (!user) return res.sendStatus(401);
  const validated = await validatePassword(req.body.password, user.password);
  if (!validated) return res.sendStatus(401);
  next();
}

export const hashPassword = async (plainTextPassword: string) => {
	const saltRounds = 10;
	const salt = await bcrypt.genSalt(saltRounds);
	return await bcrypt.hash(plainTextPassword, salt)
}

export async function validatePassword(plainTextPassword: any, password: any) {
  return await bcrypt.compare(plainTextPassword, password);
}

export function generateAccessToken(user: any) {  
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRY_TIME })
};

export function generateRefreshToken(email: any,) {
  jwt.sign(email, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY_TIME });
}

export function authenticateToken(token: any) {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err:any, user:any) => {
    if (err) {
      console.log(err);
      return undefined
    }
    return user
  });
}