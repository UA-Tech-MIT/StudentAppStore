import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from '../../../node_modules/redux';
import * as ActionCreators from '../../actions/AsyncActionCreators';
import AppStorePage from './AppStorePage';

class FrontPageContainer extends Component {

    constructor(props) {
        super(props);

        this.fetchSpotlightApps = ActionCreators.fetchApps.bind(this);
        this.fetchUserData = ActionCreators.customFetch.bind(this);
    }

    componentDidMount = () => {
      //fetch apps
        this.fetchSpotlightApps();
    }
    
  render() {
    return (
        <div>
            <span>front page container</span>
            <AppStorePage props={this.props.spotlightApps}/>
        </div>
    );
  }
}

FrontPageContainer.propTypes = {
    fetchSpotlightApps: PropTypes.func,
    customFetch: PropTypes.func,
    spotlightApps: PropTypes.object,
}

const mapStateToProps = (state, ownProps = {}) => {
    return {
        spotlightApps: state.appRepository,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchSpotlightApps: ActionCreators.fetchApps,
        customFetch: ActionCreators.customFetch,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FrontPageContainer);
