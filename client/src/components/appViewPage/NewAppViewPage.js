/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import * as helperFuncs from "../../utils/helperFunctions";
import { ReviewList } from "../common/ReviewList";
import { allApps, fetchAppByID } from "../../actions/AsyncActionCreators";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AppCarousel from "../common/AppCarousel";
import {
  Container,
  Card,
  Image,
  Modal,
  Popup,
  Rating,
  Divider,
  Segment,
  Header
} from "semantic-ui-react"; // just threw in a bunch of components i thought u might find useful
import dummyData from "../common/dummyData"; // ctrl + click to check it out

class AppViewPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      app: dummyData.data.allApps[0]
    };
  }

  render() {
    let state = this.state;
    let style = {};

    return (
      <div className="page-template">
        <div className="app-page">
          <Container style={style}>
            <Image src={require("../../public/stellar.png")} />
            <Header size="huge" color="teal">
              {this.state.app.name}
            </Header>
            <Header as="h2" dividing>
              {this.state.app.author}
            </Header>
            {this.state.app.description}
          </Container>
        </div>
      </div>
    );
  }
}

AppViewPage.propTypes = {
  fetchAppByID: PropTypes.func, // we may use this wit ha startup component here
  app: PropTypes.object,
  allApps: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps = {}) => {
  return {
    // here we are getting the first app from the search repo. This isn't how we will do things in the end. See the ocmment in router.js for more details
    app: state.appRepository.searchApps[0]
  };
};
// you can use this app via this.props.app, however you view static dummy data samples here

// You can expect to work with the following fields (ignore the testapp thing)...
// name: testApp.name,
// author: testApp.author,
// type: testApp.type,
// reivews: testApp.reivews,
// url: testApp.url,
// rating: testApp.rating,
// description: testApp.description,
// img: testApp.img,
// tags: testApp.tags,
// saving: false,
// isEditing: false

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      allApps: allApps,
      fetchAppByID: fetchAppByID
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppViewPage);
