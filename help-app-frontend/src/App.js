import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './containers/NavBar'
import TilesContainer from './containers/TilesContainer.js';
import Campaign from './components/Campaign.js';
import CampaignForm from './components/CampaignForm.js'
import SignupForm from './components/SignupForm.js'
import LoginForm from './components/LoginForm.js'
import {Route, Switch} from 'react-router-dom'



class App extends React.Component {

  state = {
    currentUser: null,
    campaigns: [],
    filterCampaigns: [],
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
    fetch("http://localhost:3000/campaigns")
    .then(r=> r.json())
    .then(campaigns => {
      this.setState({
        campaigns: campaigns,
        filterCampaigns: campaigns
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

  addCampaignToCampaigns = (newCampaign) => {
    this.setState({
      campaigns: [...this.state.campaigns,newCampaign]
    })
  }

  setUser = (user) => {
    this.setState({
      currentUser: user
    },() => {
      localStorage.user_id = user.id
      this.props.history.push("/campains")
    })
  }

  findCampaigns = (search) => {
    this.setState({
      campaigns: this.state.filterCampaigns.filter( campaign => campaign.title.toLowerCase().includes(search.toLowerCase()))
    })
  }

  // findClickedCampaign = (event) => {
  //   this.state.campaigns.find(camapaign =>)
  // }

  render(){
    return (
      <div className="App">
        <Navbar findCampaigns={this.findCampaigns} />
        <Campaign campaign={this.state.currentUser}/>
        <Switch >
          <Route path="/campaignform" render={()=> <CampaignForm />}/>
          <Route path="/signup" render={()=> <SignupForm setUser={this.setUser}/>}/>
          <Route path="/login" render={()=> <LoginForm setUser={this.setUser}/>}/>
          <Route path="/" render={() => <TilesContainer findClickedCampaign={this.findClickedCampaign} campaigns={this.state.campaigns}/>}/>
        </Switch>
      </div>
    );

  }

}

export default App;
