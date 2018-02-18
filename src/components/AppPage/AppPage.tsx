import * as React from 'react';
import { Route, Link } from 'react-router-dom'

//component imports
// import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


class App extends React.Component {
  render() {
    return (    
      <div>
      <header>
        <Link to="/">Home</Link>
        <Link to="/about-us">About</Link>
      </header>
  
      <main>
        <Route exact path="/" component={HomePageComponent} />
        <Route exact path="/about-us" component={AboutPageComponent} />
      </main>
    </div>
  )}
}
  



  const Home = props => (
    <div>
      <h1>Home</h1>
      <p>Welcome to MITSS!</p>
      {/* <carousel/> */}
      <button onClick={() => props.toAbout()}> Learn more about us</button>
    </div>
  )
  
  const mapHomeDispatchToProps = dispatch => bindActionCreators({
    toAbout: () => push('/about-us')
  }, dispatch)
  
  const HomePageComponent = connect(
    null, 
    mapHomeDispatchToProps
  )(Home)

  const About = props => (
    <div>
    <h1>About</h1>
    <p> MITSS Is an initaive from the UA Technology Sytems group. As a student
        App store and launchpad, the goal of It serves to be the quintessential
        MIT Student homepage. Our missions is to increase the visibility and 
        accessibility of new student innovation making on campus as the campus
        App store we all deserve. 
    </p>
    {/* <carousel/> */}
    <button onClick={() => props.toHome()}>Go to Home</button>
  </div>
)  
const mapAboutDispatchToProps = dispatch => bindActionCreators({
    toAbout: () => push('/')
  }, dispatch)
  
  const AboutPageComponent = connect(
    null, 
    mapAboutDispatchToProps
  )(About)


  export default App;