import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { bindActionCreators } from '../../../node_modules/redux';

export class FrontPageContainer extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
      //fetch apps

    }
    
  render() {
    return (
      <div>
        
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps = {}) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({

    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FrontPageContainer)
