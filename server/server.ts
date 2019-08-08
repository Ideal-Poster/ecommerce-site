import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import { ApolloServer } from 'apollo-server-express';

import resolvers from './resolvers';;

const app : express.Express = express();

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

app.listen(process.env.PORT || 8091, () : void => console.log('Listening on port 8091.\n'));