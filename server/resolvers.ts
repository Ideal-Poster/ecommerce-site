import { IResolvers } from 'apollo-server-express';
import { Pool, PoolClient, QueryResult } from 'pg';

import { hashPassword } from './utilities';

const pool : Pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING
});

const Query = {
  product: async (root: any, {id}: any) =>  {
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
          product.price,
          product.images
        FROM
          product
        JOIN brand ON product.brand_id = brand.id
        JOIN category ON product.category_id = category.id
        JOIN color ON product.color_id = color.id
        WHERE product.id = '${id}'`
      );
      return res.rows[0];
    } catch (err) {
      console.log(err);
    } finally {
      client.release();
    };
  },

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

  productSizeStockFootwear: async (root: any, {id}: any) => {
    const client : PoolClient = await pool.connect();
    try {
      const res : QueryResult = await client.query(
        `SELECT *
        FROM footwear_stock
        WHERE id = ${id}`
      );
      return res.rows[0];
      console.log(res.rows[0]);

    } catch (err) {
      console.log(err);
    } finally {
      client.release();
    };
  },

  productSizeStockApparel: async (root: any, {id}: any) =>  {
    const client : PoolClient = await pool.connect();
    try {
      const res : QueryResult = await client.query(
        `SELECT *
        FROM apparel_stock
        WHERE id = ${id}`
      );
      return res.rows[0];
      console.log(res.rows[0]);

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

  brands: async () => {
    const client : PoolClient = await pool.connect();
    try {
      const res : QueryResult = await client.query(
        `SELECT * FROM brand`
      );
      return res.rows;
    }
    catch(err) {
      console.log(err);
    } finally {
      client.release();
    }
  },

  categoryFilter: async (root: any, {name}: any) => {
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
          product.price,
          product.images
        FROM
          product
        JOIN brand ON product.brand_id = brand.id
        JOIN category ON product.category_id = category.id
        JOIN color ON product.color_id = color.id
        WHERE category.name = '${name}';`
      );
      return res.rows;
    } catch (err) {
      console.log(err);
    } finally {
      client.release();
    };
  },

  brandFilter: async (root: any, {name}: any) => {
    const client : PoolClient = await pool.connect();
    try {
      const res : QueryResult = await client.query(
        `SELECT
          product.id,
          brand.name AS brand,
          product.name,
          category.name AS category,
          product.description,
          product.price,
          product.images
        FROM
          product
        JOIN brand ON product.brand_id = brand.id
        JOIN category ON product.category_id = category.id
        JOIN color ON product.color_id = color.id
        WHERE brand.name = '${name}';`
      );
      return res.rows;
    } catch (err) {
      console.log(err);
    } finally {
      client.release();
    };
  },

  createUser: async (root: any, {email, username, password}: any ) => {
    const hash = await hashPassword(password);
    const client : PoolClient = await pool.connect();
    try {
      const user : QueryResult = await client.query(
        `SELECT username, email
        FROM users
        WHERE email = '${email}';`
      );
      if(user.rowCount > 0 ? false : true) {
        await client.query(
          `INSERT INTO users (username, email, password)
          VALUES ('${username}', '${email}', '${hash}');`
        );
        const res : QueryResult = await client.query(
          `SELECT id, username, email
          FROM users
          WHERE email = '${email}';`
        );
        return res.rows[0];
      }
    } catch (error) {
      console.log(error);
    } finally {
      client.release();
    }
  }
};

export default {Query};