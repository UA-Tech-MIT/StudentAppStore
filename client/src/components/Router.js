/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, NavLink } from 'react-router-dom';
import HomePage from './demo/HomePage';
import FuelSavingsPage from './demo/FuelSavingsPage';
import AboutPage from './aboutPage/AboutPage';
import AppStorePage from './welcomePage/AppStorePage';
import AppPage from './appViewPage/AppPage';
import NotFoundPage from './demo/NotFoundPage';
import Navbar from './navbar/NavBar';
import OnlineComponent from './demo/onlineComponent.example';
import TestForm from './demo/testForm';
import ImageUploadComponent from './common/ImageUploader';
import FrontPageContainer from '../containers/FrontPageContainer';
import CreateAppForm from './createAppForm/CreateAppForm';
import RegisterForm from './registerForm/RegisterForm';
import LoginForm from './loginForm/loginForm';
import AutocompoleteSearch from './autocompleteSearch/AutocompleteSearch';
import SearchResults from './searchResults/SearchResults';

// import { Navbar, NavItem, NavDropdown, MenuItem, Nav } from 'react';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

const leftItems = [
  { as: NavLink, exact: true, to: "/", content: "Home", key: "home" },
  { as: NavLink, to: "/app-store", content: "App Store", key: "appStore" },
  { as: NavLink, to: "/app-page", content: "App Page", key: "appPage" },
  { as: NavLink, to: "/submit-app", content: "Create App", key: "submitApp" },
  { as: NavLink, to: "/online-component", content: "DB Entries", key: "online" },
  { as: NavLink, to: "/about", content: "About", key: "about" },
  { as: NavLink, to: "/search", content: "Search Results", key: "search" },
];
const rightItems = [
  { as: AutocompoleteSearch, key: "search" },
  { as: NavLink, to: "/login", content: "Login", key: "login" },
  { as: NavLink, to: "/register-user", content: "Register", key: "register" }
];


class Router extends React.Component {
  render() {
    return (
      <div>
        {/* <div className="container"> */}
        <Navbar leftItems={leftItems} rightItems={rightItems} />
        {/* </div> */}
        <div className="page-template">


        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/fuel-savings" component={FuelSavingsPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/app-store" component={AppStorePage} />
          <Route path="/app-page" component={AppPage} />
          <Route path="/online-component" component={OnlineComponent} />
          <Route path="/test-form" component={TestForm} />
          <Route path="/image-upload" component={ImageUploadComponent} />
          <Route path="/front-page-container" component={FrontPageContainer} />
          <Route path="/submit-app" component={CreateAppForm} />
          <Route path="/register-user" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/search" component={SearchResults} />
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
