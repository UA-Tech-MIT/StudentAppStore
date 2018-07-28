/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import HomePage from './demo/HomePage';
import FuelSavingsPage from './demo/FuelSavingsPage';
import AboutPage from './aboutPage/AboutPage';
import AppStorePage from './welcomePage/AppStorePage';
import AppPage from './appViewPage/AppPage';
import NotFoundPage from './demo/NotFoundPage';
import NavigationBar from './navbar/NavigationBar';
import OnlineComponent from './demo/onlineComponent.example';
import TestForm from './demo/testForm';
import ImageUploadComponent from './common/ImageUploader';
import FrontPageContainer from '../containers/FrontPageContainer';
import CreateAppForm from './createAppForm/CreateAppForm';

// import { Navbar, NavItem, NavDropdown, MenuItem, Nav } from 'react';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class Router extends React.Component {
  render() {
    return (
      <div>
        {/* <div className="container"> */}
        <NavigationBar/>
        {/* </div> */}
        <div className="page-template">


        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/fuel-savings" component={FuelSavingsPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/app-store" component={AppStorePage} />
          <Route path="/app-page" component={AppPage} />
          <Route path="/online-component" component={OnlineComponent} />
          <Route path="/app-form" component={TestForm} />
          <Route path="/image-upload" component={ImageUploadComponent} />
          <Route path="/front-page-container" component={FrontPageContainer} />
          <Route path="/submit-app" component={CreateAppForm} />
          {/* <Route path="*" render={() => (<Redirect to="/" />)} />           */}

          <Route component={NotFoundPage} />
        </Switch>
        </div>
      </div>
    );
  }
}

Router.propTypes = {
children: PropTypes.element
};

export default Router;
