/* eslint-disable import/default */
import Express from 'express';
import GraphHTTP from 'express-graphql';
import cors from 'cors';
import bodyParser from 'body-parser';
import initDatabase from './initDB';
import { makeExecutableSchema } from 'graphql-tools';
import { query, mutation, appSchema, reviewSchema, teamSchema, userSchema, itemTagSchema, tagSchema, error } from './schema/';
import resolvers from './resolvers';
import models from './models';

const schema = makeExecutableSchema({
  typeDefs: [query, mutation, appSchema, reviewSchema, teamSchema, userSchema, itemTagSchema, tagSchema, error],
  resolvers: { ...resolvers },
});


const graphqlEndpoint = '/graphql';
const SECRET = 'asiodfhoi1hoi23jnl1kejd';
const SECRET2 = 'a0y7986g786c4uetrytb705864durc';
const addUser = async (req, res, next) => {
  const token = req.headers['x-token'];
  if (token) {
    try {
      const { user } = jwt.verify(token, SECRET);
      req.user = user;
    } catch (err) {
      const refreshToken = req.headers['x-refresh-token'];
      const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET2);
      if (newTokens.token && newTokens.refreshToken) {
        res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
        res.set('x-token', newTokens.token);
        res.set('x-refresh-token', newTokens.refreshToken);
      }
      req.user = newTokens.user;
    }
  }
  next();
};

console.log('Server is running  ');

const APP_PORT = 8080;

const app = Express();
app.use(cors('*'));
app.use(addUser);


app.use(graphqlEndpoint, bodyParser.json(), GraphHTTP( async (req, res) => ({
  schema: schema,
  pretty: true,
  // cacheControl: true,
  graphiql: true,
  context: {
    models,
    user: req.user,
    SECRET,
    SECRET2,
  },
})));

setTimeout(() => {
  initDatabase();
}, 4000);

app.listen(APP_PORT, () => {
  console.log('DB Listening on port 8080\n');
});