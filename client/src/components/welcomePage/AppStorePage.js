import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { allApps, likeApp, viewApp, getThumbnails } from '../../actions/AsyncActionCreators'; // TODO
import { Container, Header, Card, Image, Divider, Icon } from 'semantic-ui-react';
import faker from 'faker';
import AppTile from '../common/AppTile';



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
      const { ok, apps, err } = response.data.allApps;
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

    if (isLoading) {
      return (
        <p> loading... </p>
      );
    }

    return (
      <section>
        <div className='spotlight' >
        <div className='spotlight-content'>
          <Header className='left-content' content="Spotlight" size='huge'/>
          <div className="right-content">
              <Image circular src={faker.internet.avatar()} alt="creator" size="tiny" />
        </div>
          </div>
          <Image src={require('../../public/firehose.png')} centered size="massive" />

          <Divider />
          <div className="spotlight-content">
          <div className="left-content">
              <p> A course planning website.</p>
        </div>
            <div className="right-content">
              <Icon name="heart" size='big'/>
              <Icon name="eye" size='big'/>
              <Icon name="external" size='big'/>
            </div>
          </div>
        </div>
        <Container style={{ margin: 10 + 'px', width: 80 + 'vw' }}>
          <Header content="Popular" attached={false} size="huge" />
          {/* <HomepageCarousel/> */}
        </Container>
        <Container style={{ width: 80 + 'vw' }}>
          <Card.Group itemsPerRow={4}>
            {allThumbnails.map((app, index) => <AppTile app={app} key={index} />)}
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
