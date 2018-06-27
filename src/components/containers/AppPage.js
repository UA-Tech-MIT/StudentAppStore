import React from 'react';
import Carousel from '../carousel';
import PropTypes from 'prop-types';
// import {bindActionCreators} from 'redux';
import * as helperFuncs from '../../actions/AppPageActions'; // TODO
import { Media, Jumbotron, Button, Row, Grid, Col, Glyphicon} from 'react-bootstrap';
import Rating from 'react-rating';
import { ReviewList } from './ReviewList';
import {fetchApps, fetchAppByID} from '../../actions/AsyncActionCreators';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
// TODO Add react redux to stack

const testApp= {
  author: "MIT",
  type: "App",
  name: 'Stellar',
  img: 'stellar.png',
  url: 'https://stellar.mit.edu',
  rating: 4,
  description: `
  Lorem ipsum dolor sit amet, mel facer sanctus ne, duo et cibo verterem,
  ne doming appetere vim. Nostro iisque accumsan pro at, ex nam tota consulatu,
  ne minim fuisset senserit nec. Meis elitr aliquip eos at, ex has debet accommodare,
  id purto paulo vis. Ceteros nominati no eam. Per eu nonumy euripidis, mel et tantas melius.
  Per autem dictas eligendi cu.
  `,
  tags: ["school", "management", "software", "this sucks"],
  reviews: []
};

class AppPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }


  render() {
    return (
      <div>
      <Jumbotron>
        <h1>{this.props.name}</h1>
        <p>
          {this.props.description}
        </p>

          <Grid>
            <Row>
              <Col xs={12} md={8}>
            <Button bsStyle="primary">Like <Glyphicon glyph="heart"/></Button>
            </Col>
            <Col xs={6} md={4} >
            <Button bsStyle="primary">Write a review</Button>
            </Col>
            </Row>
          </Grid>

      </Jumbotron>
      <br/>
      <div className='app-page'>
      <Media>
      <Media.Left>
       <img src={require(`../../public/${this.props.img}`)} className="tile" onClick={()=> window.location.replace(this.props.url)} alt="loading..." />
      </Media.Left>
      <Media.Body>
        <Media.Heading>{this.props.name}</Media.Heading>
        <p>
          An app by {this.props.author}
        </p>
        <Rating
  emptySymbol={<img src="../../public/star-empty.png" className="icon" />}
  fullSymbol={<img src="../../public/star-full.png" className="icon" />}
  onChange={(value) => console.log(value)}
/>
      </Media.Body>
      <Media.List>
      <h3>Review List Component:</h3>
        <ReviewList/>
        </Media.List>
    </Media>

    <Button bsStyle="primary" onClick={() => this.props.fetchApps()}>fetch apps (Check Redux Devtools)</Button>

    </div>
    </div>

      // <section className="app-page">
      //   <h1 className="header"> {this.state.name} </h1>
      //   <h3 className="author"> {this.state.author} </h3>
      //   <img src={require(`../../public/${this.state.img}`)} className="tile" onClick={()=> window.location.replace(this.state.url)} alt="loading..." />
      // </section>
    );
  }
}



AppPage.propTypes = {
  // actions: PropTypes.object.isRequired,
  // app: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  // reviews: PropTypes.object.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  fetchApps: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps = {}) => {
  return {
    name: testApp.name,
    author: testApp.author,
    type:  testApp.type,
    reivews: testApp.reivews,
    url: testApp.url,
    rating: testApp.rating,
    description: testApp.description,
    img: testApp.img,
    tags: testApp.tags,
    saving: false,
    isEditing: false
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchApps: fetchApps,
    fetchAppByID: fetchAppByID
  }, dispatch);
};

export default connect(mapStateToProps,mapDispatchToProps)(AppPage);
