import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {likeApp as queryLike} from '../../actions/AsyncActionCreators';
import {Container, Card, Image, Popup, Rating, Segment, Icon} from 'semantic-ui-react';
import {TagLabel} from './TagLabel';
//TODO cap tags at 16 characters and check back. does it overflow? can we do 20

const cornerFlag = {
    as: 'a',
    corner: 'left', 
    content: 'MIT', 
    style:{
        padding: 6 + 'px',
        textAlign: 'left',
    }
};

class AppTile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: [],
            isLiked: false,
            isRated: false,
        };

        this.generateLabels = this.generateLabels.bind(this);
        this.likeApp = this.likeApp.bind(this);
    }

    likeApp() {
        this.setState({isLiked: true});
        this.props.queryLike(this.props.app.id);
    }

    generateLabels() {
        const labels = [].concat(this.props.app.genre).concat(this.props.app.medium);
        return (
          <Container style={{ display: 'inline'}}>
            {labels.map((tag, index) => <TagLabel tag={tag} key={index}/>)}
          </Container>
        );
    }

    render() {
        return (
          <Card style={{'boxShadow': 'none', border: 0, 'borderRadius': 0}}>
            <Image src={require('../../public/stellar.png')}
                label={this.props.app.isOfficialResource ? cornerFlag : null} />
            <Card.Content>
            <Card.Header style={{maxWidth: 100 +'%'}}>
                            {this.props.app.name}</Card.Header>
              <Card.Meta>
                <span className='author'>by {this.props.app.author}</span>
              </Card.Meta>
              <Card.Description as='div' style={{'alignContent': 'center'}}>{this.generateLabels()}</Card.Description>
            </Card.Content>
            <Card.Content extra as='div' className="no-padding">
            <Segment.Group horizontal style={{margin: 0}}>
                <Segment>
                <a onClick={() => this.likeApp()}>
                    <Icon name={this.state.isLiked ? 'heart' : 'heart outline'}  color="pink" />
                    {this.props.app.likes} Likes
                </a>
                </Segment>

                <Segment>
                <Popup trigger={AppRating(
                    parseFloat(this.props.app.rating.toFixed(1))+ '/5')} flowing hoverable>
                    <Rating icon='star' defaultRating={0} maxRating={5} />
                </Popup>

                </Segment>
                <Segment>
                <Icon name='eye' />
                {this.props.app.views} Views
                </Segment>
            </Segment.Group>
            </Card.Content>
          </Card>
          );
    }
}

AppTile.propTypes = {
    app: PropTypes.object.isRequired,
    queryLike: PropTypes.func.isRequired,
};

const AppRating = (rating) =>  {
        return (
          <div>
            <Rating icon="star"/> {rating}
          </div>
        );
};

AppRating.propTypes = {
    rating: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        queryLike,
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(AppTile);