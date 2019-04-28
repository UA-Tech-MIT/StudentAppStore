import React from 'react';
import { Link } from 'react-router-dom';
import './about-page.css';
import {Card} from 'semantic-ui-react';

// Since this component is simple and static, there's no parent container for it.

class AboutPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    };
  }

//TODO Update to pictures of the developers before adding public route
render() {
  return (
    <div className="page-template">
      <h1 className="alt-header" style = {{fontSize: 46, justifyContent: 'center', display: 'flex'}} >About Us</h1>
      <p style = {{fontSize: 18, justifyContent: 'center', display: 'flex'}}>
        Otherwise known as UA Technology Systems Group, we are a committee is designed to accompany and assist all other departments of the UA in anything tech-related, while also continuously working on implementing technological solutions that improve the quality of life around campus. Our current projects include developing an MIT App Store for student resources and initiatives, consolidating resources for the UA, and planning the BetterMIT Makeathon for Winter 2019. We aim to establish and maintain all technological needs of the UA as an organization, and devise creative and new ways of bettering undergraduate life at MIT, and to do that we need your input! Feel free to reach out to us at ua-technology@mit.edu with any interest or feedback you may have.
      </p>

      <h1 className="alt-header" style = {{fontSize: 32, justifyContent: 'center', display: 'flex'}} >Meet the Team</h1>
      <Card.Group itemsPerRow={4}>
      {makeCard("Yaateh Richardson","Chair",'../../public/yaateh.jpg')}
      {makeCard("Yaateh Richardson","Chair",'../../public/yaateh.jpg')}
      {makeCard("Yaateh Richardson","Chair",'../../public/yaateh.jpg')}
      {makeCard("Yaateh Richardson","Chair",'../../public/yaateh.jpg')}
      </Card.Group>

    </div>
  );

}

}

function makeCard(name,description,image) {
  return (
    <Card image = {image} header = {name} description = {description}>
    </Card>
  );
}

export default AboutPage;
