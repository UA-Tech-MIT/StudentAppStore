import React from 'react';
import PropTypes from 'prop-types';
import { Media } from 'react-bootstrap';


const testReview = {
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
    this.state = {
      reviews: [testReview]
    };

  }


  render() {
    return (
      <ul>
        {this.state.reviews.map((review, index) => reviewObjGenerator(review, index))}
      </ul>
    );
  }
}

function reviewObjGenerator(object, i) {
  return (
    <Review key={i} {...object} />
  );
}