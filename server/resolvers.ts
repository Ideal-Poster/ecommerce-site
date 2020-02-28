import { authenticateToken } from "./utilities";

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
  getUserCart: async (root: any, args: null, {models}: any) => {
    const token = models.authHeader && models.authHeader.split(' ')[1];
    const user = authenticateToken(token);
    return models.user.getCart('eiwne@gmail.com');
  }
};

const Mutation = {
  createUser: async (root: any, {email, username, password}: any, {models}: any) => {
    return await models.user.create(email, username, password);
  },
  setUserCart: async (root: any, {cart}: any, {models}: any) => {
    const token = models.authHeader && models.authHeader.split(' ')[1];
    const user = authenticateToken(token);
    // console.log(cart);
    return models.user.setCart('eiwne@gmail.com', cart);
  }
}

export default {Query, Mutation};