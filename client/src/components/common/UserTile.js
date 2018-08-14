import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Card, Image, Popup, Icon } from 'semantic-ui-react';
import faker from 'faker';
import { TagLabel } from './TagLabel';

const modFlag = {
    as: 'a',
    href: 'mailto:ua-technology@mit.edu',
    corner: 'left',
    color: 'orange',
    size: 'mini',

};
class UserTile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: [],
        };
        this.generateLabels = this.generateLabels.bind(this);
    }

    generateLabels() {
        const labels = [].concat(this.props.user.flair);
        return (
            <Container style={{ display: 'inline' }}>
                {labels.map((tag, index) => <TagLabel tag={tag} key={index} />)}
            </Container>
        );
    }

    render() {
        let user = this.props.user;
        return (
            <Popup trigger={
                <Image circular src={user.image ?
                    user.image : faker.internet.avatar()} alt='user'
                    label={user.isModerator ? modFlag : null} size='tiny' />
            } flowing hoverable >
                <Card style={{ 'boxShadow': 'none' }}  >
                    <Card.Content>
                        <Card.Header style={{ maxWidth: 100 + '%', display: 'inline' }}>
                            {user.firstName + ' ' + user.lastName + '\t'}

                                <a href={'mailto:' + user.email} className='user-tile-mail'>
                                    <Icon name='mail' />
                                </a>
                        </Card.Header>
                    </Card.Content>
                    <Card.Description as='div' style={{ 'alignContent': 'center' }}>
                        {this.generateLabels()}
                    </Card.Description>

                </Card>
            </Popup>
        );
    }
}

UserTile.propTypes = {
    user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(UserTile);