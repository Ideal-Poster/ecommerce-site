import bcrypt from 'bcrypt';
import { Pool, PoolClient, QueryResult } from 'pg';

const pool : Pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING
});

const createUser = async (username: string, email: string, password: string) => {
	try {
		const res = await pool.query(
			`SELECT id FROM footwear_stock WHEREid = 2`
		);
		console.log(res.rows[0]);
		return res.rows[0];
	} catch (err) {
		console.log(err);
	}
}

const hashpassword = async (plainTextPassword: string) => {
	const saltRounds = 10;
	const salt = await bcrypt.genSalt(saltRounds);
	return await bcrypt.hash(plainTextPassword, salt)
}

export default createUser;