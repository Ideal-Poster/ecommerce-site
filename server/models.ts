import { hashPassword } from './utilities';
import { QueryResult, Pool, PoolClient } from 'pg';

const pool : Pool = new Pool({connectionString: process.env.DB_CONNECTION_STRING});

export const Product = {
	getById: async (id: any) =>  {
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
				return res.rows[0] || null;
			} catch (err) {
				console.log(err);
			} finally {
				client.release();
			};
	},
	getAll: async () => {
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
      return res.rows || null;
    } catch (err) {
      console.log(err);
    } finally {
      client.release();
    };
	},
	footwearStock: async (id: any) => {
    const client : PoolClient = await pool.connect();
    try {
      const res : QueryResult = await client.query(
        `SELECT *
        FROM footwear_stock
        WHERE id = ${id}`
      );
      return res.rows[0] || null;
    } catch (err) {
      console.log(err);
    } finally {
      client.release();
    };
	},
	apparelStock: async (id: any) => {
    const client : PoolClient = await pool.connect();
    try {
      const res : QueryResult = await client.query(
        `SELECT *
        FROM apparel_stock
        WHERE id = ${id}`
      );
      return res.rows[0] || null;
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
      return res.rows || null;
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
      return res.rows || null;
    }
    catch(err) {
      console.log(err);
    } finally {
      client.release();
		}
	},
	filterByCategory: async (name: any) => {
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
	filterByBrand: async (name: any) => {
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
  }
};

export const User = {
	create: async (email: string, username: string, password: string ) => {
    const client : PoolClient = await pool.connect();
		const hash = await hashPassword(password);
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
			return null;
		} catch (err) {
			console.log(err);
		} finally {
			client.release();
		}
	}
};