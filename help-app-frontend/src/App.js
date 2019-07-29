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
    dontations: [],
    foundCampaign: {},
  }

  componentDidMount(){
    const token = localStorage.token
    if(token){
      //get user info
      fetch("http://localhost:3000/auto_login",{
        headers: {
          "Authorization": token
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
      }, () => {
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
      currentUser: user.user
    },() => {
      localStorage.token = user.id
      this.props.history.push("/campains")
    })
  }

  findCampaigns = (search) => {
    this.setState({
      campaigns: this.state.filterCampaigns.filter( campaign => campaign.title.toLowerCase().includes(search.toLowerCase()))
    })
  }

  findClickedCampaign = (selectedCamapaign) => {
    this.setState({
      foundCampaign: this.state.campaigns.find(campaign => campaign.id === selectedCamapaign.id)
    },() =>{
      this.props.history.push(this.stringCamapaignUrl())
    } )
  }

  stringCamapaignUrl = () => {
    return `/camapaigns/${this.state.foundCampaign.id}`
  }

  render(){
    return (
      <div className="App">
        <Navbar findCampaigns={this.findCampaigns} />

        <Switch >
          <Route path={this.stringCamapaignUrl()} render={()=><Campaign campaign={this.state.foundCampaign}/> }/>
          <Route path="/campaignform" render={()=> <CampaignForm />}/>
          <Route path="/signup" render={()=> <SignupForm setUser={this.setUser}/>}/>
          <Route path="/login" render={()=> <LoginForm setUser={this.setUser}/>}/>
          <Route path="/" render={() => <TilesContainer findClickedCampaign={this.findClickedCampaign} progress={this.state.progress} campaigns={this.state.campaigns} stringCamapaignUrl={this.stringCamapaignUrl}/>}/>
        </Switch>
      </div>
    );

  }

}

export default App;
