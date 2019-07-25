import React from 'react';
import logo from './logo.svg';
import './App.css';
import TilesContainer from './component/TilesContainer.js';
import Event from './component/Event.js';
import EventForm from './component/EventForm.js'
import SignupForm from './component/SignupForm.js'
import LoginForm from './component/LoginForm.js'



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
