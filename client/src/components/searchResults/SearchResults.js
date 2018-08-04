import React from 'react';
 import {DropdownButton, MenuItem} from 'react-bootstrap';
//  import response from './dummyData';
 import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// we don't need a search bar in the view (its in the nav bar)
//  const apps = ['Firehose', 'TurboVote', 'Planner', 'Course Catalogue Searcher (Chrome)','Course Picker', 'Stellar' ];

 export class SearchResults extends React.Component {
     constructor(props){
         super(props);
        //  this.state = {
        //      apps: response.data.allApps,
        //    };
        // we don't need to declare apps from the dummy file anymore because we bring them in from redux
           
     }
     render (){
         console.log(this.props.apps); // apps are now a prop, not part of state
         return (
         <div>
             <h3>Search App Store </h3>
             <DropdownButton bsStyle= "primary" title = "Filter Apps" id="dropdown-size-large">
                 <MenuItem eventKey="1">Scheduling</MenuItem>
                 <MenuItem eventKey="2">Course Info</MenuItem>
                 <MenuItem eventKey="3">Other</MenuItem>
             </DropdownButton>
             <section>
                     {/* <SearchBar apps = {this.state.apps}/> */}
             </section>    
         </div>
         
         );
             
     }
 }


 SearchResults.propTypes = { // we have to declare the properties we make with the following functions
    apps: PropTypes.array.isRequired,
 };

 //state is the redux state
 const mapStateToProps = (state, { ownProps }) => {
    return {// we do this to prevent modifying the redux state. Its essentially copying
      apps: JSON.parse(JSON.stringify(state.appRepository.searchApps)),
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
    }, dispatch);
  };
  
  
  //this can be read as mapStateToProps(mapDispatchToProps(SearchResults))
  // it just adds the properties we define in these functions to the original
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchResults);


