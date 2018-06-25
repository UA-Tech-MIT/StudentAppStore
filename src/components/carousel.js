import React from 'react';
// import PropTypes from 'prop-types';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as helperFuncs from '../actions/AppPageActions';

// import AppTile from '../AppPage/AppTile.js';
// import { connect, Provider, bindActionCreators } from 'react-redux';

// import PhoneAuthTest from './Components/phoneAuthTest'

// mapDispatchToProps = dispatch => bindActionCreators({
//     toAbout: () => push('/')
//   }, dispatch)

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
      name: 'Course Catalogue Searcher (Chrome)',
      img: 'ccsearcher.png',
      url: 'https://chrome.google.com/webstore/detail/mit-course-catalog-search/gnakgohnkbkolbefnekinmmkmdfcogfa'
    },
    {
      name: 'Course Picker',
      img: 'picker.png',
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
function appTile(object, i) {
  const imageClick = () => {
    helperFuncs(object.url);
  };
  return (
    <div className="app-tile-container" key={i}> 
      <img src={require(`../public/${object.img}`)} className="app-tile" onClick={imageClick} alt="loading..." />
      <span>
        {object.name}
      </span>
    </div>
  );
}

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: dummyState.tiles,
    };
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true,
      centerMode: false,
      arrows:true

    };

    if (!this.state.tiles) {
      return (
        <div>
          <h3> carousel: </h3>
          <h2>Browse Student Apps</h2>
          <Slider {...settings}>
            <div className="tile-preview">Loading...</div>
          </Slider>
        </div>
      );
    }

    if (this.state.tiles.length === 0) {
      return (
        <div>
          <h2>Browse Student Apps</h2>
          <Slider {...settings}>
            <div className="tile-preview">No articles are here... yet.</div>
          </Slider>
        </div>
      );
    }
    return (
      <div>
        <h2>Browse Student Apps</h2>
        <Slider {...settings}>
          {this.state.tiles.map((tile, index) => appTile(tile, index))}
        </Slider>
      </div>
    );
  }
}

export default Carousel;

//leave in (react-redux syntax)
// export default connect(
//     mapStateToProps,
//     null
//   )(carouselComponent);

//   const mapStateToProps = state => ({
//     ...state,
//     tiles: state.tiles
//     // profile: state.profile
//   });
