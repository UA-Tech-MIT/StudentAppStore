/* eslint-disable import/default */
import Express from 'express';
import GraphHTTP from 'express-graphql';
import cors from 'cors';
import bodyParser from 'body-parser';
import initDatabase from './database';
import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';
import models from './models';
import { query, mutation, appSchema, reviewSchema, teamSchema, userSchema, itemTagSchema, tagSchema } from './schema/';
import resolvers from './resolvers';

console.log([query, mutation, appSchema, reviewSchema, teamSchema, userSchema, itemTagSchema, tagSchema]);
console.log({ ...resolvers });
// const schemaTypeDefs = [...schema];

// const schemaResolvers = {...resolvers};// this is for clarity w/ the docs and debugging

const schema = makeExecutableSchema({
  typeDefs: [query, mutation, appSchema, reviewSchema, teamSchema, userSchema, itemTagSchema, tagSchema],
  resolvers: { ...resolvers },
});


const graphqlEndpoint = '/graphql';

console.log('Server is running  ');

const APP_PORT = 8080;

const app = Express();
app.use(cors());

app.use('/graphql', bodyParser.json(), GraphHTTP({
  schema: schema,
  pretty: true,
  // cacheControl: true,
  graphiql: true
}));

setTimeout(() => {
  initDatabase();
}, 10000);

app.listen(APP_PORT, () => {
  console.log('DB Listening on port 8080\n');
});
