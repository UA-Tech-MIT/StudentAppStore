import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Segment, Card } from 'semantic-ui-react';
import { academic , advising, mentoring, learning, integrity, community} from './Resources'

const resources = [
    advising,
    academic,
    mentoring,
    learning,
    integrity,
    community
]

  export default class MenuExampleAttachedTabular extends React.Component {
    state = { activeItem: 'Advising',
              resource: resources[0]}

    handleItemClick = (e, { name , id}) => {
      console.log(id)
      this.setState({ activeItem: name ,
                      resource: resources[id]
            })
    }

    render() {
      const { activeItem } = this.state

      return (
        <div attached='top'>
          <Menu attached='top' tabular>
            <Menu.Item id = {0} name='Advising' active={activeItem === 'Advising'} onClick={this.handleItemClick} />
            <Menu.Item id = {1} name='Academic Support' active={activeItem === 'Academic Support'} onClick={this.handleItemClick} />
            <Menu.Item id = {2} name='Mentoring' active={activeItem === 'Mentoring'} onClick={this.handleItemClick} />
            <Menu.Item id = {3} name='Learning' active={activeItem === 'Learning'} onClick={this.handleItemClick} />
            <Menu.Item id = {4} name='Academic Integrity' active={activeItem === 'Academic Integrity'} onClick={this.handleItemClick} />
            <Menu.Item id = {5} name='Academic Community' active={activeItem === 'Academic Community'} onClick={this.handleItemClick} />

          </Menu>
          <Segment attached='bottom'>
            <Card.Group centered items={this.state.resource} />
          </Segment>
        </div>
      )
    }
  }
