import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { allApps, likeApp, viewApp, getThumbnails, getBetaThumbnails } from '../../actions/AsyncActionCreators';
import { Container, Header, Card, Image, Divider, Icon, Dimmer, Loader } from 'semantic-ui-react';
import AppTile from '../common/AppTile';
import UserTile from '../common/UserTile';
// import {NavLink} from 'react-router-dom';
import faker from 'faker';

const message = `to the MIT Student App Store, the one stop location for student made resources.\n	
to get started, browes the apps below or...`;	

 const testUser = {	
  firstName: 'Yaateh',	
  lastName:  'Richardson',	
  email: 'yaatehr@mit.edu',	
  tags: ['Course 6', 'Love & a 🥪', 'Jr.'],	
  isModerator: true,	
  image: require('../../public/yaateh.jpg'),	
};

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
      const { ok, apps, err } = response.data.spotlightApps;
      if (ok) {
        this.setState({
          isLoading: false,
          allThumbnails: apps
        });
      }
      else {
        /* eslint-disable no-console */
        console.log(err);
      }
    });
  }

  render() {
    const { isLoading, allThumbnails } = this.state;
    const spotlightApp = allThumbnails.pop(faker.random.number(0, allThumbnails.length -1));
    const hasCreators = spotlightApp.creators && spotlightApp.creators.length;

    if (isLoading) {
      return (
        <section>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        </section>
      );
    }

    return (
      <section>
        <div className='spotlight' >
        <div className='spotlight-content'>
          <Header className='left-content' content="Spotlight" size='huge'/>
          <div className="right-content">
              <UserTile user={testUser} />
        </div>
          </div>
          <Image src={require('../../public/firehose.png')} centered size="massive" />

          <Divider />
          <div className="spotlight-content">
          <div className="left-content">
              <p> A course planning website.</p>
        </div>
            <div className="right-content">
                <a>
                    <Icon name={
                      /*eslint-disable */
                      false ? 'heart' : 'heart outline'} size='big' color="black" />
                </a>
              <NavLink to='/app-page'>
                <Icon color='black' name="external" size='big'/>
              </NavLink>
            </div>
          </div>
        </div>
        <Container style={{ margin: 10 + 'px', width: 80 + 'vw' }}>
          <Header content="Popular" attached={false} size="huge" />
        </Container>
        <Container style={{ width: 80 + 'vw' }}>
          <Card.Group itemsPerRow={4}>
            {allThumbnails.map((app, index) => <AppTile app={app} key={index} />)}
          </Card.Group>
        </Container>
      </section>
    );
  }
}

AppStorePage.propTypes = {
  spotlightApp: PropTypes.object,
  allApps: PropTypes.func,
  getThumbnails: PropTypes.func,
  likeApp: PropTypes.func,
  viewApp: PropTypes.func,
  homepageapps: PropTypes.object.isRequired,
  getBetaThumbnails: PropTypes.func,
};

function mapStateToProps(state) {
  return {
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