import React from 'react';
import PropTypes from 'prop-types';
import * as helperFuncs from '../../actions/AppPageActions'; // TODO
import { Media } from 'react-bootstrap';
import Rating from 'react-rating';


const testReview= {
  user: 'User Hash Here',
  text: 'this is an aweseome website. 10/10',
  img: 'stellar.png',
  rating: 4,
  tags: ["school", "management", "software", "awesome"],
};


class Review extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: props.user,
      text: props.text,
      img: props.img,
      rating: props.rating,
      tags: props.tags
    };
  }
  render() {
    return (
      <Media>
      <Media.Left>
        Some Text
        {/* {this.state.appRepository} */}
        </Media.Left>
        <Media.Body>
          Body Text
          </Media.Body>
      </Media>
    );
  }
}

Review.propTypes = {
  user: PropTypes.string,
  text: PropTypes.string,
  img: PropTypes.string,
  rating: PropTypes.number,
  tags: PropTypes.arrayOf(PropTypes.string)
};

export class ReviewList extends React.Component {
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
      reviews: [testReview] };

  }


  render() {
    // helperFuncs.toAppUrl("http://www.google.com")
    return (
      <ul>
        {this.state.reviews.map((review, index)=> reviewObjGenerator(review, index))}
    </ul>


      // <section className="app-page">
      //   <h1 className="header"> {this.state.name} </h1>
      //   <h3 className="author"> {this.state.author} </h3>
      //   <img src={require(`../../public/${this.state.img}`)} className="tile" onClick={()=> window.location.replace(this.state.url)} alt="loading..." />
      // </section>
    );
  }
}

function   reviewObjGenerator(object, i) {
  return (
    <Review key={i} {...object} />
  );
}