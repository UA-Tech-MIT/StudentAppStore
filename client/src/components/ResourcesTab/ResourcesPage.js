import React from 'react';
import { Grid } from 'semantic-ui-react';
//import SideBar from './Sidebar';
import ResourcesTab from './ResourcesTab';


export default class GridExampleVerticallyDivided extends React.Component {
  state = { }
  render() {

      return (
        <div className='page-template'>
          <ResourcesTab/>
        </div>


    )
  }
}
