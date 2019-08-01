import { IResolvers } from 'apollo-server-express';
import { Pool, PoolClient, QueryResult } from 'pg';

const pool : Pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING
});

const Query : IResolvers = {
  products: async () =>  {
    const client : PoolClient = await pool.connect();
    try {
      const res : QueryResult = await client.query('SELECT * from public.products');
      console.table(res.rows);
      return res.rows;
    } catch (err) {
      console.log(err);
    } finally {
      client.release();
    };
  }
};

export default {Query};