import React, { PropTypes } from 'react';
import styles from './styles.scss';


import Slider from '../src/slider';
import { connect, Provider, bindActionCreators } from 'react-redux';

// import PhoneAuthTest from './Components/phoneAuthTest'


// mapDispatchToProps = dispatch => bindActionCreators({
//     toAbout: () => push('/')
//   }, dispatch)

const dummyState= {
      tiles:
          [{
              name: "Firehose",
              img: "../../public/firehose.png",
              url:"https://firehose.mit.edu"

            },
          {
            name: "TurboVote",
            img: "../../public/turbovote.jpeg",
            url: "https://mit.turbovote.org"

          },
        {
            name: "Planner",
            img: "../../public/planner.png",
            url:"https://planner.mit.edu"
        }]
}
  
//   const mapStateToProps = state => ({
//     ...state,
//     tiles: state.tiles
//     // profile: state.profile
//   });

export default class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tiles: props.tiles
        };
    }

  render() {
    var settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true
    };
    return (
      <div>
        <h2>Browse Student Apps</h2>
        <Slider {...settings}>
        {

        if (!this.state.tiles) {
            return (
            <div className="tile-preview">Loading...</div>
            );
        }

        if (this.state.tiles.length === 0) {
            return (
            <div className="tile-preview">
                No articles are here... yet.
            </div>
            );
        }

        this.state.tiles.map((tile) => appTile(tile))
        }
        </Slider>
      </div>
    );
  }
}



function appTile(object) {
    return (
    <div>
        <img src={object.img} onClick={() => { // launch a page from an image
            window.location.href = object.url;
        }}/>
        <h3>{object.name}</h3>
    </div>

    )
}



// export default Carousel;

// export default connect(
//     mapStateToProps, 
//     null
//   )(carouselComponent);