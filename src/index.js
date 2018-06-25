/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore, { history } from './store/configureStore';
import Root from './components/Root';
import './styles/styles.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
require('./favicon.ico'); // Tell webpack to load favicon.ico
// import Conn from '../tools/database';

import { ApolloProvider } from "react-apollo";
import client from './server/apollo';
// import gql from "graphql-tag";


//TODO Make tests for all Helper methods


// // GRAPHQL Setup
// Conn.afterSync(() => {
//   console.log('sequlize sync has run. Online');
// })
// Conn.sync();
//TODO test Sequelize





const store = configureStore();

render(
  <AppContainer>
    <ApolloProvider client={client}>

      <Root store={store} history={history} />
    </ApolloProvider>

  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NewRoot = require('./components/Root').default;
    render(
      <AppContainer>
        <ApolloProvider client={client}>

          <NewRoot store={store} history={history} />
        </ApolloProvider>

      </AppContainer>,
      document.getElementById('app')
    );
  });
}
