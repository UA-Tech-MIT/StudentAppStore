import React from 'react';
import Carousel from '../carousel';
// import PropTypes from 'prop-types';
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import * as actions from '../../actions/AppStoreActions'; // TODO
// import { connect, Provider, bindActionCreators } from 'react-redux'
// TODO Add react redux to stack

export class AppStorePage extends React.Component {
  render() {
    return (
      <section>
        <h1> AppStore </h1>
        <Carousel />
      </section>
    );
  }
}

// AppStorePage.propTypes = {
//   actions: PropTypes.object.isRequired,
//   homePageApps: PropTypes.object.isRequired
// };

// function mapStateToProps(state) {
//   return {
//     homePageApps: state.homePageApps
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(actions, dispatch)
//   };
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(AppStorePage);


export default AppStorePage;
