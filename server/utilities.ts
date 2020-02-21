import bcrypt from 'bcrypt';
import { PoolClient, Pool } from 'pg';
const jwt = require('jsonwebtoken');

const pool : Pool = new Pool({connectionString: process.env.DB_CONNECTION_STRING});

export async function validateUser(req: any, res: any, next: any) {
  const user = await findUser(req.body.email);
  if (!user) return res.sendStatus(401);
  const validated = validatePassword(req.body.password, user.password);
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
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
};

export function authenticateToken(token: any) {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err:any, user:any) => {
    if (err) {
      console.log(err);
      return err
    }
    return user
  });
}

export async function findUser(email: any) {
 const client : PoolClient = await pool.connect();
 let user;
 try {
   user = await client.query(
     `SELECT username, email, password FROM users WHERE email = '${email}'`
   )
 } catch (err) {
   console.log(err);
 }  finally {
   client.release();
 }
 user ? user = user.rows[0] : user = null;
 return user;
}
