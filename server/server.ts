import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

const app : express.Express = express();

app.use(cors(), bodyParser.json());

app.get('/', (req, res) : any => {
  res.send('Hello World');
});

// app.post('/login', (req,res) => {})

app.listen(process.env.PORT || 8091, () : void => console.log('Listening on port 8091'));