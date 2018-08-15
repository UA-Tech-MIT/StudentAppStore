import React from 'react';
import { Media } from 'react-bootstrap';
import Rating from 'react-rating';
import { ReviewList } from '../common/ReviewList';

const testApp = {
  author: "MIT",
  type: "App",
  name: 'Stellar',
  img: 'stellar.png',
  url: 'https://stellar.mit.edu',
  rating: 4,
  tags: ["school", "management", "software", "this sucks"],
  reviews: []
};

export class AppViewPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: testApp.name,
      author: testApp.author,
      type: testApp.type,
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
    this.setState({ app: testApp });
  }



  render() {
    return (
      <section className="app-page">
        <h3>App Page:</h3>
        <Media>
          <Media.Left>
            <img src={require(`../../public/${this.state.img}`)} className="tile" onClick={() => window.location.replace(this.state.url)} alt="loading..." />
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
            <ReviewList />
          </Media.List>
        </Media>

      </section>
    );
  }
}

export default AppViewPage;

