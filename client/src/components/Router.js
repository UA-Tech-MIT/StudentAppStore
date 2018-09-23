/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, NavLink } from 'react-router-dom';
import AboutPage from './aboutPage/AboutPage';
import AppStorePage from './welcomePage/AppStorePage';
import AppViewPage from './appViewPage/AppViewPage';
import NotFoundPage from './demo/NotFoundPage';
import Navbar from './navbar/NavBar';
import OnlineComponent from './demo/onlineComponent.example';
import AutocompoleteSearch from './autocompleteSearch/AutocompleteSearch';

const leftItems = [
  { as: NavLink, exact: true, to: "/", content: "App Store", key: "appStore" },
  { as: NavLink, to: "/online-component", content: "DB Entries", key: "online" },
  { as: NavLink, to: "/about", content: "About", key: "about" },
  { as: NavLink, to: "/other", content: "Other Resources", key: "other" },
];
const rightItems = [
  { as: AutocompoleteSearch, key: "search" },
];


class Router extends React.Component {
  render() {
    return (
      <div>
        <Navbar leftItems={leftItems} rightItems={rightItems} />
        <Switch>
          <Route exact path="/" component={AppStorePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/app-store" component={AppStorePage} />
          <Route path="/app-page" component={AppViewPage} />
          <Route path="/online-component" component={OnlineComponent} />
          <Route component={NotFoundPage} />
        </Switch>
        </div>
    );
  }
}

Router.propTypes = {
children: PropTypes.element
};

export default Router;
