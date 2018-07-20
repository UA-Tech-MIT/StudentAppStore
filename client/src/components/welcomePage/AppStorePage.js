import React from 'react';
import HomepageCarousel from './homepageCarousel';
import { Jumbotron, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/AsyncActionCreators'; // TODO
// import { connect, Provider, bindActionCreators } from 'react-redux'
// TODO Add react redux to stack

const message = `to the MIT Student App Store, the one stop location for student made resources.\n
to get started, browes the apps below or...`;

class AppStorePage extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <div>
        <Jumbotron className="Title">
          <h1> Welcome </h1>
          <p>{message}</p>
          <Button>Sign in with Kerberos!</Button>
        </Jumbotron>
        <HomepageCarousel />
        <div>
          <span {...this.props}>there
          s some text here</span>
        </div>

      </div>
    );
  }
}

AppStorePage.propTypes = {
  actions: PropTypes.object.isRequired,
  homepageapps: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    homepageapps: state.appRepository
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppStorePage);


// export default AppStorePage;
