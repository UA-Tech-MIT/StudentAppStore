import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../actions/AsyncActionCreators';
import AppStorePage from '../components/welcomePage/AppStorePage';


class FrontPageContainer extends Component {

    constructor(props) {
        super(props);

        this.allApps = ActionCreators.allApps.bind(this);
        this.fetchUserData = ActionCreators.customFetch.bind(this);
    }

    componentDidMount = () => {
      //fetch apps
        this.allApps();
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
    allApps: PropTypes.func,
    customFetch: PropTypes.func,
    spotlightApps: PropTypes.object,
};

const mapStateToProps = (state, ownProps = {}) => {
    return {
        spotlightApps: state.appRepository,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        allApps: ActionCreators.allApps,
        customFetch: ActionCreators.customFetch,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FrontPageContainer);
