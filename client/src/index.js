/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore, { history } from './store/configureStore';
import Root from './components/Root';
import './styles/styles.scss';
require('./favicon.ico');
import { ApolloProvider } from "react-apollo";
import client from './apollo';
import 'semantic-ui-css/semantic.min.css';
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
