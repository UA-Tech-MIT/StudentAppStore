import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import Router from './Router';
import Startup from './Startup';

export default class Root extends Component {
  render() {
    const { store, history } = this.props;
    console.log(this.props);
    return (
      <Provider store={store}>
        <Startup>
          <ConnectedRouter history={history}>
            <Router />
          </ConnectedRouter>
        </Startup>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
