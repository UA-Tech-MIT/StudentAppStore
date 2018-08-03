import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {allApps} from '../actions/AsyncActionCreators';
import {loadApps} from '../actions/ActionCreators';
class Startup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            errors: null
        };
    }
    componentDidMount() {
      this.props.allApps().then((response) => {
          const {ok, errors, apps} = response.data.allApps;
          if(ok) {
              this.props.loadApps(apps);
              this.setState({isLoading: true});
          } else {
            this.setState({errors: errors});
          }
      });
    }
    render() {
      return this.state.isLoading
        ? this.props.children
        : (<p>Loading...</p>);
    }
  }
Startup.propTypes = {
    allApps: PropTypes.func.isRequired,
    loadApps: PropTypes.func.isRequired,
    children: PropTypes.any,
  };

  
  const mapStateToProps = (state, {ownProps}) =>  {
    return {
        
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      allApps,
      loadApps,
    }, dispatch);
  };
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Startup);