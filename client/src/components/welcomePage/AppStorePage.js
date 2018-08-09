import React from 'react';
import HomepageCarousel from './homepageCarousel';
import { Jumbotron, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/AsyncActionCreators'; // TODO
import {Container, Header, Card, Image, Modal, Popup, Rating, Divider, Segment, Grid } from 'semantic-ui-react';
import faker from 'faker';
const message = `to the MIT Student App Store, the one stop location for student made resources.\n
to get started, browes the apps below or...`;

class AppStorePage extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <section>
      <Container> 
        <HomepageCarousel/>
      </Container>
      <Container>
      <Card.Group itemsPerRow={4}>
        <Card color='red' image={faker.image.avatar()} />
        <Card color='orange' image={faker.image.avatar()} />
        <Card color='yellow' image={faker.image.avatar()} />
        <Card color='olive' image={faker.image.avatar()} />
        <Card color='olive' image={faker.image.avatar()} />
        <Card color='green' image={faker.image.avatar()} />
        <Card color='teal' image={faker.image.avatar()} />
        <Card color='blue' image={faker.image.avatar()} />
        <Card color='violet' image={faker.image.avatar()} />
        <Card color='purple' image={faker.image.avatar()} />
        <Card color='pink' image={faker.image.avatar()} />
        <Card color='brown' image={faker.image.avatar()} />
        <Card color='grey' image={faker.image.avatar()} />
      </Card.Group>
      </Container>
    </section>

      // <div>
      //   <Jumbotron className="Title">
      //     <h1> Welcome </h1>
      //     <p>{message}</p>
      //     <Button>Sign in with Kerberos!</Button>
      //   </Jumbotron>
      //   <HomepageCarousel />
      //   <div>
      //     <span {...this.props}>there
      //     s some text here</span>
      //   </div>

      // </div>
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
