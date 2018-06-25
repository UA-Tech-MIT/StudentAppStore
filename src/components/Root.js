import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import App from './App';
import AppPage from './containers/AppPage';

export default class Root extends Component {
  render() {
    const { store, history } = this.props;
    console.log(this.props);
    console.log(store);
    const testApp= {
      author: "MIT",
      type: "App",
      name: 'Stellar',
      img: 'stellar.png',
      url: 'https://stellar.mit.edu',
      rating: 4,
      tags: ["school", "management", "software", "this sucks"],
      reviews: []
    };


    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
