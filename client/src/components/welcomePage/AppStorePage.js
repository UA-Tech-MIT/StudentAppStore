import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { allApps, likeApp, viewApp, getBetaThumbnails } from '../../actions/AsyncActionCreators';
import { Container, Header, Card, Image, Divider, Icon, Dimmer, Loader } from 'semantic-ui-react';
import AppTile from '../common/AppTile';
import UserTile from '../common/UserTile';
import {NavLink} from 'react-router-dom';
import faker from 'faker';

class AppStorePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      allThumbnails: [],
    };
  }

  componentWillMount() {
    this.props.getBetaThumbnails().then((response) => {
      const { ok, apps, err } = response.data.spotlightApps;
      if (ok) {
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
                {hasCreators ? 
                  <UserTile user={spotlightApp.creators[0]} /> 
                  : <p>{spotlightApp.author} </p>} 
            </div>
          </div>
          <Image src={spotlightApp.image} centered size="massive" />
          <Divider />
          <div className="spotlight-content">
            <div className="left-content">
                <p>{spotlightApp.description}</p>
            </div>
            <div className="right-content">
              <div style={{display: 'inline-flex', verticalAlign: 'center'}}>
                <Icon color='black' name="external" size='big'/>
                <Icon name='eye' size='big' color="black" />
                <span>{spotlightApp.views} views</span> 
              </div>
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
  allApps: PropTypes.func,
  getBetaThumbnails: PropTypes.func,
  likeApp: PropTypes.func,
  viewApp: PropTypes.func,
  homepageapps: PropTypes.object.isRequired
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
    getBetaThumbnails
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppStorePage);