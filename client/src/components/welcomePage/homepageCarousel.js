import React from 'react';
// import PropTypes from 'prop-types';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as helperFuncs from '../../utils/helperFunctions';
import {Carousel} from 'react-bootstrap';
import {Image} from 'semantic-ui-react';

const dummyState = {
  tiles: [
    {
      name: 'Firehose',
      img: 'firehose.png',
      url: 'https://firehose.mit.edu',
    },
    {
      name: 'TurboVote',
      img: 'turbovote.jpeg',
      url: 'https://mit.turbovote.org',
    },
    {
      name: 'Planner',
      img: 'planner.png',
      url: 'https://planner.mit.edu',
    },
    {
      name: 'Course Catalogue Searcher',
      img: 'course-catalogue-searcher.png',
      url: 'https://chrome.google.com/webstore/detail/mit-course-catalog-search/gnakgohnkbkolbefnekinmmkmdfcogfa'
    },
    {
      name: 'Course Picker',
      img: 'course-picker.png',
      url: 'https://picker.mit.edu'
    },
    {
      name: 'Stellar',
      img: 'stellar.png',
      url: 'https://stellar.mit.edu'
    }
  ],
};
// eslint won't like the require notation, but this is the only way to serve images dynamically
function appTile(app, i) {
  const imageClick = () => {
    helperFuncs(app.url);
  };
  // semantic has no carousel unfortunately
  return (
    <Carousel.Item className="homepage-tile-container" key={i}> 
      <img src={require(`../../public/${app.img}`)} className="homepage-tile" onClick={imageClick} alt="loading..." />
      <Carousel.Caption>
        <h3>{app.name}</h3>
      </Carousel.Caption>
    </Carousel.Item>
  );
}

class HomepageCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: dummyState.tiles,
    };
  }


  // I think we should move away from the bootstrap carousel 
  // because when you lose wifi connectivity the styles don't load (not a great reason so i'll leave it for now)

  render() {
    const headerMessage = "Spotlight Apps";

    if (!this.state.tiles) {
      return (
        <div>
          <h2>{headerMessage}</h2>
          <Carousel className="homepage-carousel">
            <Carousel.Caption className="tile-preview">Loading...</Carousel.Caption>
          </Carousel>
        </div>
      );
    }

    if (this.state.tiles.length === 0) {
      return (
        <div>
          <h2>{headerMessage}</h2>
          <Carousel className="homepage-carousel">
            <Carousel.Caption className="tile-preview">No articles are here... yet.</Carousel.Caption>
          </Carousel>
        </div>
      );
    }
    return (
      <div>
        <h2>{headerMessage}</h2>
        <Carousel className="homepage-carousel">
          {this.state.tiles.map((tile, index) => appTile(tile, index))}
        </Carousel>
      </div>
    );
  }
}

export default HomepageCarousel;