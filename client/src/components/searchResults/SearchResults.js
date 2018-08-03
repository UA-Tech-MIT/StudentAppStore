import React from 'react';
 import {DropdownButton, MenuItem} from 'react-bootstrap';
 import response from './dummyData';
//  import SearchBar from ;
// haven't pushed the search bar yet 
//  const apps = ['Firehose', 'TurboVote', 'Planner', 'Course Catalogue Searcher (Chrome)','Course Picker', 'Stellar' ];

 export class SearchResults extends React.Component {
     constructor(props){
         super(props);
         this.state = {
             apps: response.data.allApps,
           };
           
     }
     render (){
         console.log(this.state.apps);
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

 export default SearchResults; 