import React from 'react';
import Carousel from '../carousel';
import PropTypes from 'prop-types';
// import {bindActionCreators} from 'redux';
import * as helperFuncs from '../../actions/AppPageActions'; // TODO
import { Media } from 'react-bootstrap';
import Rating from 'react-rating';
import { ReviewList } from './ReviewList';

// import { connect } from 'react-redux'
// TODO Add react redux to stack

const testApp= {
  author: "MIT",
  type: "App",
  name: 'Stellar',
  img: 'stellar.png',
  url: 'https://stellar.mit.edu',
  rating: 4,
  tags: ["school", "management", "software", "this sucks"],
  reviews: []
};

export class AppPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    // this.state = {
    //   name: this.props.app.name,
    //   author: this.props.app.author,
    //   type:  this.props.app.type,
    //   reivews: this.props.app.reivews,
    //   url: this.props.app.url,
    //   rating: this.props.app.rating,
    //   img: this.props.app.img,
    //   tags: this.props.app.tags,
    //   saving: false,
    //   isEditing: false
    // };
    this.state = {
      name: testApp.name,
      author: testApp.author,
      type:  testApp.type,
      reivews: testApp.reivews,
      url: testApp.url,
      rating: testApp.rating,
      img: testApp.img,
      tags: testApp.tags,
      saving: false,
      isEditing: false
    };

  }

  componentWillMount() {
    this.setState({app: testApp});
  }



  render() {
    // helperFuncs.toAppUrl("http://www.google.com")
    return (
      <section className="app-page">
      <h3>App Page:</h3>
      <Media>
      <Media.Left>
       <img src={require(`../../public/${this.state.img}`)} className="tile" onClick={()=> window.location.replace(this.state.url)} alt="loading..." />
      </Media.Left>
      <Media.Body>
        <Media.Heading>{this.state.name}</Media.Heading>
        <p>
          An app by {this.state.author}
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

    </section>
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
  // app: PropTypes.object.isRequired
  // name: PropTypes.String.isRequired,
  // author: PropTypes.object.isRequired,
  // type: PropTypes.String.isRequired,
  // reivews: PropTypes.object.isRequired,
  // url: PropTypes.String.isRequired,
  // rating: PropTypes.number.isRequired,
  // img: PropTypes.String.isRequired,
  // tags: PropTypes.arrayOf(PropTypes.number)
};

// function mapStateToProps(state) {
//   return {
//     name: state.app.name,
//     author: state.app.author,
//     type:  state.app.type,
//     reivews: state.app.reivews,
//     url: state.app.url,
//     rating: state.app.rating,
//     img: state.app.img,
//     tags: state.app.tags,
//     saving: false,
//     isEditing: false
//   }
  // return {
  //   name: state.name,
  //   author: state.author,
  //   type: state.type,
  //   url: state.url,
  //   rating: state.rating,
  //   img: state.img,
  //   tags: state.tags
  // };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(actions, dispatch)
//   };
// }

// export default connect(
//   mapStateToProps,
//   // mapDispatchToProps
// )(AppPage);
export default AppPage;

