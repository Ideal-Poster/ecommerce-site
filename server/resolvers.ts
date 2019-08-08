import { IResolvers } from 'apollo-server-express';
import { Pool, PoolClient, QueryResult } from 'pg';

const pool : Pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING
});

const Query = {
  products: async () =>  {
    const client : PoolClient = await pool.connect();
    try {
      const res : QueryResult = await client.query(
        `SELECT
          product.id,
          brand.name AS brand,
          product.name,
          category.name AS category,
          color.name AS color,
          product.description,
          product.price
        FROM
          product
        JOIN brand ON product.brand_id = brand.id
        JOIN category ON product.category_id = category.id
        JOIN color ON product.color_id = color.id`
      );
      return res.rows;
    } catch (err) {
      console.log(err);
    } finally {
      client.release();
    };
  },

  categories: async () => {
    const client : PoolClient = await pool.connect();
    try {
      const res : QueryResult = await client.query(
        `SELECT * FROM category`
      );
      return res.rows;
    }
    catch(err) {
      console.log(err);
    } finally {
      client.release();
    }
  },

  categoryFilter: async (root: any, {id}: any) => {
    const client : PoolClient = await pool.connect();
    try {
      const res : QueryResult = await client.query(
        `SELECT
          product.id,
          brand.name AS brand,
          product.name,
          category.name AS category,
          color.name AS color,
          product.description,
          product.price
        FROM
          product
        JOIN brand ON product.brand_id = brand.id
        JOIN category ON product.category_id = category.id
        JOIN color ON product.color_id = color.id
        WHERE product.category_id = ${id}`
      );
      return res.rows;
    } catch (err) {
      console.log(err);
    } finally {
      client.release();
    };
  },

  brandFilter: async (root: any, { id }: any) => {
    const client : PoolClient = await pool.connect();
    try {
      const res : QueryResult = await client.query(
        `SELECT
          product.id,
          brand.name AS brand,
          product.name,
          category.name AS category,
          color.name AS color,
          product.description,
          product.price
        FROM
          product
        JOIN brand ON product.brand_id = brand.id
        JOIN category ON product.category_id = category.id
        JOIN color ON product.color_id = color.id
        WHERE product.brand_id = ${id}`
      );
      console.log('loop' + res.rows);
      return res.rows;
    } catch (err) {
      console.log(err);
    } finally {
      client.release();
    };
  }
};

export default {Query};