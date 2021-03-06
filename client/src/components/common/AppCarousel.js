import React from 'react';
// import PropTypes from 'prop-types';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as helperFuncs from '../../utils/helperFunctions';
import { Container, Card, Icon, Image } from 'semantic-ui-react';

// import AppTile from '../AppViewPage/AppTile.js';
// import { connect, Provider, bindActionCreators } from 'react-redux';

// mapDispatchToProps = dispatch => bindActionCreators({
//     toAbout: () => push('/')
//   }, dispatch)

const dummyState = {
  tiles: [
    {
      name: 'Firehose',
      img: 'firehose.png',
      url: 'https://firehose.mit.edu',
      genre: "Planning Tool",
    },
    {
      name: 'TurboVote',
      img: 'turbovote.jpeg',
      url: 'https://mit.turbovote.org',
      genre: "Planning Tool",

    },
    {
      name: 'Planner',
      img: 'planner.png',
      url: 'https://planner.mit.edu',
      genre: "Planning Tool",

    },
    {
      name: 'Course Catalogue Searcher',
      img: 'course-catalogue-searcher.png',
      url: 'https://chrome.google.com/webstore/detail/mit-course-catalog-search/gnakgohnkbkolbefnekinmmkmdfcogfa',
      genre: "Planning Tool",

    },
    {
      name: 'Course Picker',
      img: 'course-picker.png',
      url: 'https://picker.mit.edu',
      genre: "Planning Tool",

    },
    {
      name: 'Stellar',
      img: 'stellar.png',
      url: 'https://stellar.mit.edu',
      genre: "Planning Tool",
    }
  ],
};
// eslint won't like the require notation, but this is the only way to serve images dynamically
function appTile(app, i) {
  const imageClick = () => {
    helperFuncs(app.url);
  };
  return (
    // <div className="app-tile-container" key={i}> 
    //   <img src={require(`../../public/${app.img}`)} className="app-tile" onClick={imageClick} alt="loading..." />
    //   <span>
    //     {app.name}
    //   </span>
    // </div>
    <Card key={i} className="app-tile">
      <Image src={require(`../../public/${app.img}`)} onClick={imageClick} alt="loading..." centered/>
      <Card.Content>
        <Card.Header>{app.name}</Card.Header>
        <Card.Meta>{app.genre}</Card.Meta>
        <Card.Description>Short app description?</Card.Description>
      </Card.Content>
    </Card>


  );
}

class AppCarousel extends React.Component {
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
      arrows: true

    };



    if (!this.state.tiles) {
      return (
        <div>
          <Slider {...settings}>
            <div className="tile-preview">Loading...</div>
          </Slider>
        </div>
      );
    }

    if (this.state.tiles.length === 0) {
      return (
        <div>
          <Slider {...settings}>
            <div className="tile-preview">No articles are here... yet.</div>
          </Slider>
        </div>
      );
    }
    return (
      <div>
        <Slider className="app-tile-container" {...settings}>
          {this.state.tiles.map((tile, index) => appTile(tile, index))}
        </Slider>
      </div>
    );
  }
}

export default AppCarousel;

//leave in (react-redux syntax)
// export default connect(
//     mapStateToProps,
//     null
//   )(AppCarouselComponent);

//   const mapStateToProps = state => ({
//     ...state,
//     tiles: state.tiles
//     // profile: state.profile
//   });
