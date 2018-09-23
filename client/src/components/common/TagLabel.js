import React from 'react';
import PropTypes from 'prop-types';
import {Label} from 'semantic-ui-react';
export class TagLabel extends React.Component {
    render() {
        return (
            <a onClick={() => console.log('search by label??')}>
              <Label style={{ marginLeft: 2 + 'px', marginRight: 2 + 'px'}}
              color={yearToColor(this.props.tag)}>
                {this.props.tag}
              </Label>
            </a>
          );
    }
}

// null is no color
const yearToColor = (year) => {
    switch(year) {
        case 'Fr.': return 'red';
        case 'So.': return 'yellow';
        case 'Jr.': return 'green';
        case 'Sr.': return 'blue';
        default: null;
    }
 };

TagLabel.propTypes = {
    tag: PropTypes.string.isRequired,
};