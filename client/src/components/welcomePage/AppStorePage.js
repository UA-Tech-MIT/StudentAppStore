import React from 'react';
import HomepageCarousel from './homepageCarousel';
import { Jumbotron, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {allApps, likeApp, viewApp, getThumbnails} from '../../actions/AsyncActionCreators'; // TODO
import {Container, Header, Card, Image, Label, Popup, Rating, Divider, Segment, Icon} from 'semantic-ui-react';
import faker from 'faker';



const message = `to the MIT Student App Store, the one stop location for student made resources.\n
to get started, browes the apps below or...`;

class AppStorePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      allThumbnails: [],
    };
  }

  componentWillMount() {
    this.props.getThumbnails().then((response) => {
      const {ok, apps, err} = response.data.allApps;
      if(ok) {
        this.setState({
          isLoading: false,
          allThumbnails: apps
        });
      }
      else {
        console.log(err);
      }
    });
  }


  render() {
    const {isLoading, allThumbnails} = this.state;

    if(isLoading) {
      return (
        <p> loading... </p>
      );
    }

    return (
      <section>
      <Container> 
        <HomepageCarousel/>
      </Container>
      <Container>
        <Header content="Popular this week" attached={false} size="large" />
      <Card.Group itemsPerRow={4}>
        {allThumbnails.map((app, index) => appTile(app, index))}
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



const appTile = (app, id) => {
  return (
    <Card key={id*77}>
    <Image src={faker.image.avatar()} />
    <Card.Content>
      <Card.Header>{app.name}</Card.Header>
      <Card.Meta>
        <span className='date'>by {app.author}</span>
      </Card.Meta>
      <Card.Description as='div'>{generateLabels(app)}</Card.Description>
    </Card.Content>
    <Card.Content extra as='div' className="no-padding">
    {extraSegment(app)}
    </Card.Content>
  </Card>
  );
};

const appRating = (rating) => {
  return (
    <div>
      <Rating icon="star"/> {rating}
    </div>
  );
};


const extraSegment = (app) => {
  // TODO liking doesn't work
  return (
    <Segment.Group horizontal style={{margin: 0}}>
    <Segment>
      <a onClick={() => likeApp(app.id).bind(this)}>
        <Icon name='heart' color="pink" />
        {app.likes} Likes
      </a>
    </Segment>

    <Segment>
    <Popup trigger={appRating(app.rating)} flowing hoverable>
      <Rating icon='star' defaultRating={0} maxRating={5} />
    </Popup>

    </Segment>
    <Segment>
    <Icon name='eye' />
      {app.views} Views
    </Segment>
  </Segment.Group>
  );
};


/**
 * @param {string} tag
 */
const tagLabel = (tag, i) => {
  return (
    <a key={i} onClick={() => console.log('search by label??')}>
      <Label >
        {tag}
      </Label>
    </a>
  );
};


/**
 * @param {!Array<string>} tags
 */
const generateLabels = (app) => { // standard css won't work because these are lazily generated. use style objects instead
  const labels = [].concat(app.genre).concat(app.medium);
  return (
    <div className="app-tile-label">
      {labels.map((tag, index) => tagLabel(tag, index))}
    </div>
  );
};




AppStorePage.propTypes = {
  allApps: PropTypes.func,
  getThumbnails: PropTypes.func,
  likeApp: PropTypes.func,
  viewApp: PropTypes.func,
  homepageapps: PropTypes.object.isRequired
};


function mapStateToProps(state) {
  return {// eventually pass the carousel apps in through here
    homepageapps: state.appRepository
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      allApps,
      likeApp,
      viewApp,
      getThumbnails
    }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppStorePage);


// export default AppStorePage;
