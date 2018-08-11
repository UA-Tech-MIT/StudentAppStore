import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {likeApp as queryLike} from '../../actions/AsyncActionCreators'; // TODO
import {Container, Card, Image, Label, Popup, Rating, Segment, Icon} from 'semantic-ui-react';

//TODO cap tags at 16 characters and check back. does it overflow? can we do 20
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
            <Image src={require('../../public/stellar.png')} />
            <Card.Content>
            <Card.Header style={{maxWidth: 100 +'%'}}>
                            {this.props.app.name}</Card.Header>
              <Card.Meta>
                <span className='date'>by {this.props.app.author}</span>
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
                <Popup trigger={AppRating(this.props.app.rating)} flowing hoverable>
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


class TagLabel extends React.Component {
    render() {
        return (
            <a onClick={() => console.log('search by label??')}>
              <Label style={{ marginLeft: 2.5 + '%', marginRight: 2.5 + '%'}}>
                {this.props.tag}
              </Label>
            </a>
          );
    }
}

TagLabel.propTypes = {
    tag: PropTypes.string.isRequired,
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