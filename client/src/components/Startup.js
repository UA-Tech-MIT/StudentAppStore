import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchApps} from '../actions/AsyncActionCreators';
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
      this.props.fetchApps().then((response) => {
          const {ok, errors, apps} = response.data.fetchApps;
          if(ok) {
              this.state.setState({isLoading: true});
              this.loadApps(apps);
          } else {
            this.state.setState({errors: errors});
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
    fetchApps: PropTypes.func.isRequired,
    loadApps: PropTypes.func.isRequired,
    children: PropTypes.any,
  };

  
  const mapStateToProps = (state, {ownProps}) =>  {
    return {
        
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      fetchApps,
      loadApps,
    }, dispatch);
  };
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Startup);