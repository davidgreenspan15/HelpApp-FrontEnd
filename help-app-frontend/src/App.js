import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './containers/NavBar'
import TilesContainer from './containers/TilesContainer.js';
import Event from './components/Event.js';
import EventForm from './components/EventForm.js'
import SignupForm from './components/SignupForm.js'
import LoginForm from './components/LoginForm.js'



class App extends React.Component {

  state = {
    currentUser : "",
    events: [],
    dontations: []
  }
  componentDidMount(){
    fetch("http://localhost:3000/events")
    .then(r=> r.json())
    .then(events => {
      this.setState({
        events: events
      })
    })
  }

  addEventToEvents = (newEvent) => {
    this.setState({
      events: [...this.state.events,newEvent]
    })
  }


  render(){
    return (
      <div className="App">
        <Navbar />
        <TilesContainer events={this.state.events}/>
        <Event event={this.state.events[0]}/>
        <EventForm/>
        <SignupForm/>
        <LoginForm/>
      </div>
    );

  }

}

export default App;
