"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const apollo_server_express_1 = require("apollo-server-express");
const resolvers_1 = __importDefault(require("./resolvers"));
const pg_1 = require("pg");
const app = express_1.default();
// Connect to Prostgres
const connectionString = process.env.DB_CONNECTION_STRING;
// 'postgresql://postgres:scrub_B8@localhost:5432/ecommerce';
const client = new pg_1.Client({
    connectionString
});
client.connect();
client.query('SELECT * from public.products', (err, res) => {
    console.log(err, res.rows);
    client.end();
});
// Configure Apollo server
const typeDefs = fs_1.default.readFileSync('./schema.graphql', { encoding: 'utf-8' });
const graphqlServer = new apollo_server_express_1.ApolloServer({
    typeDefs,
    resolvers: resolvers_1.default
});
graphqlServer.applyMiddleware({ app });
app.use(cors_1.default(), body_parser_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello World');
});
// app.post('/login', (req,res) => {})
app.listen(process.env.PORT || 8091, () => console.log('Listening on port 8091'));
