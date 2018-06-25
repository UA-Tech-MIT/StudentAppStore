/* eslint-disable import/default */

import Express from 'express';
import GraphHTTP from 'express-graphql';
import Schema from './schema';
import cors from 'cors';
import bodyParser from 'body-parser';
//TODO   bodyParser.json() for apollo?


console.log('Server is running  ');

const APP_PORT = 8080;

const app = Express();
app.use(cors());

app.use('/graphql', bodyParser.json(), GraphHTTP({
    schema: Schema,
    pretty: true,
    // cacheControl: true,
    graphiql: true
}));


// add cors
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


app.listen(APP_PORT, () => {
    console.log('DB Listening on port 8080 ');
});


// const engine = new ApolloEngine({
//     apiKey: process.env.ENGINE_API_KEY
//   });
  
//   // Start the server
//   engine.listen({
//     port: APP_PORT,
//     expressApp: app
//   }, () => {
//     console.log(`Go to http://localhost:${APP_PORT}/graphiql to run queries!`);
//   });




  import gql from "graphql-tag";
  import client from "./apollo";

  setTimeout(() => {
    client
    .query({
      query: gql`
        {
          users{
            firstName,
            lastName,
            email,
            userHash
          }
        }
      `
    })
    .then(result => console.log(result));
  }, 10000);

