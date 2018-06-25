/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import HomePage from './HomePage';
import FuelSavingsPage from './containers/FuelSavingsPage';
import AboutPage from './AboutPage';
import AppStorePage from './containers/AppStorePage';
import AppPage from './containers/AppPage';
import NotFoundPage from './NotFoundPage';
import NavigationBar from './NavigationBar';
import OnlineComponent from './onlineComponent.example';

// import { Navbar, NavItem, NavDropdown, MenuItem, Nav } from 'react';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    return (
      <div>
        {/* <div className="container"> */}
        <NavigationBar/>
        {/* </div> */}
        <div>

        </div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/fuel-savings" component={FuelSavingsPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/app-store" component={AppStorePage} />
          <Route path="/app-page" component={AppPage} />
          <Route path="/online-component" component={OnlineComponent} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
children: PropTypes.element
};

export default App;
