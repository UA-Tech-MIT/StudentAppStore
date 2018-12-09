/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import * as helperFuncs from "../../utils/helperFunctions";
import { ReviewList } from "../common/ReviewList";
import { allApps, fetchAppByID } from "../../actions/AsyncActionCreators";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Slider from "../Slider/Slider";
import {
  Container,
  Card,
  Image,
  Modal,
  Popup,
  Rating,
  Divider,
  Segment,
  Header,
  Button,
  Form,
  TextArea,
  Input,
  Label
} from "semantic-ui-react"; // just threw in a bunch of components i thought u might find useful
import dummyData from "../common/dummyData"; // ctrl + click to check it out

class AppViewPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      app: dummyData.data.allApps[0],
      showTextBox: false
    };
  }

  render() {
    let state = this.state;
    let style = {};

    return (
      <div className="page-template">
        <div className="app-page">
          <Container style={style}>
            <Image src={require("../../public/stellar.png")} floated="left" />
            <Header size="huge" color="teal">
              {this.state.app.name}
            </Header>
            <Button
              basic
              color="teal"
              content="Edit"
              icon="edit"
              floated="right"
            />
            <Rating
              icon="star"
              defaultRating={this.state.app.rating}
              maxRating={5}
              onRate={this.handleRate}
            />
            <Button
              basic
              content="Get this app"
              color="purple"
              icon="external alternate"
              floated="right"
            />
            <Header as="h2">{this.state.app.author}</Header>
            <div>
              <Header size="tiny" color="teal" floated="left">
                Genre:
              </Header>
              {this.state.app.genre}
            </div>
            <Header size="tiny" color="teal" floated="left">
              Tags:
            </Header>
            {this.state.app.tags.map(appTag => (
              <Label
                style={{ marginLeft: 1 + "%", marginRight: 1 + "%" }}
                key={appTag}
              >
                {appTag}
              </Label>
            ))}
            <Input
              icon="tags"
              iconPosition="left"
              label={{ tag: true, content: "Add Tag" }}
              labelPosition="right"
              placeholder="Enter tags"
            />
            <Divider dividing />
            <Header size="small" color="teal">
              Description:
            </Header>
            {this.state.app.description}
            <Divider dividing />
            <Button
              basic
              color="purple"
              content="Like"
              icon="heart"
              label={{
                basic: false,
                color: "purple",
                pointing: "left",
                content: this.state.app.likes
              }}
            />
            <Button
              basic
              color="purple"
              content="Write a Review"
              icon="write"
              onClick={this.showText}
              label={{
                basic: false,
                color: "purple",
                pointing: "left",
                content: "10"
              }}
            />
            {this.state.showTextBox ? (
              <Form>
                <TextArea autoHeight placeholder="Tell us about this app!" />
              </Form>
            ) : (
              <div />
            )}
            <Slider />
          </Container>
        </div>
      </div>
    );
  }
  showText = () => {
    this.setState({ showTextBox: true });
  };

  handleRate = () => {
    //something
  };
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
