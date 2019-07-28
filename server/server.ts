import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import { ApolloServer } from 'apollo-server-express';

import resolvers from './resolvers';
import { Client } from 'pg';


const app : express.Express = express();
// Connect to Prostgres
const connectionString =
process.env.DB_CONNECTION_STRING;
// 'postgresql://postgres:scrub_B8@localhost:5432/ecommerce';
const client : Client = new Client({
  connectionString
});
client.connect();
client.query('SELECT * from public.products', (err,res) => {
  console.log(err,res.rows)
  client.end()
});

// Configure Apollo server
const typeDefs : string = fs.readFileSync('./schema.graphql', {encoding: 'utf-8'});
const graphqlServer : ApolloServer = new ApolloServer({
  typeDefs,
  resolvers
});
graphqlServer.applyMiddleware({app});

app.use(cors(), bodyParser.json());
app.get('/', (req, res) : any => {
  res.send('Hello World');
});

// app.post('/login', (req,res) => {})

app.listen(process.env.PORT || 8091, () : void => console.log('Listening on port 8091'));