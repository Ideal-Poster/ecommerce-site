import { Pool } from 'pg';

const pool : Pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING
});

const Query = {
  getProductById: async (root: any, {id}: any, {models}: any) =>  {
    return await models.product.getById(id);
  },
  getAllProducts: async (root: any, args: undefined, {models}: any) =>  {
    return await models.product.getAll();
  },
  footwearStock: async (root: any, {id}: any, {models}: any) => {
    return await models.product.footwearStock(id);
  },
  apparelStock: async (root: any, {id}: any, {models}: any) =>  {
    return models.product.apparelStock(id);
  },
  categories: async (root: any, args: undefined, {models}: any) => {
    return await models.product.categories();
  },
  brands: async (root: any, args: undefined, {models}: any) => {
    return await models.product.brands();
  },
  filterByCategory: async (root: any, {name}: any, {models}: any) => {
    return await models.product.filterByCategory(name);
  },
  filterByBrand: async (root: any, {name}: any, {models}: any) => {
    return await models.product.filterByBrand(name);
  },
  createUser: async (root: any, {email, username, password}: any, {models}: any ) => {
    return await models.user.create(email, username, password);
  }
};

export default {Query};