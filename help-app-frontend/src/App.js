import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './containers/NavBar'
import TilesContainer from './containers/TilesContainer.js';
import Event from './components/Event.js';
import EventForm from './components/EventForm.js'
import SignupForm from './components/SignupForm.js'
import LoginForm from './components/LoginForm.js'
import {Route, Switch} from 'react-router-dom'



class App extends React.Component {

  state = {
    currentUser: null,
    events: [],
    dontations: []
  }

  componentDidMount(){
    const user_id = localStorage.user_id
    if(user_id){
      //get user info
      fetch("http://localhost:3000/auto_login",{
        headers: {
          "Authorization": user_id
        }
      })
      .then(resp => resp.json())
      .then(user => {
        if(user.errors){
          alert(user.errors)
        }else{
          this.setState({
            currentUser: user
          })
        }
      })

    }else{
      //don't do anything
    }
    fetch("http://localhost:3000/events")
    .then(r=> r.json())
    .then(events => {
      this.setState({
        events: events
      })
    })


  }

  logout = () => {
    this.setState({
      currentUser: null
    },() => {
      localStorage.removeItem("user_id")
      this.props.history.push("/login")
    })
  }

  addEventToEvents = (newEvent) => {
    this.setState({
      events: [...this.state.events,newEvent]
    })
  }

  setUser = (user) => {
    this.setState({
      currentUser: user
    },() => {
      localStorage.user_id: user.id,
      this.props.history.push("/events")
    })
  }


  render(){
    return (
      <div className="App">
        <Navbar />
        <Event event={this.state.events[0]}/>
        <Switch >
          <Route path="/eventform" render={()=> <EventForm/>}/>
          <Route path="/signup" render={()=> <SignupForm/>}/>
          <Route path="/login" render={()=> <LoginForm/>}/>
          <Route path="/" render={() => <TilesContainer events={this.state.events}/>}/>
        </Switch>
      </div>
    );

  }

}

export default App;
