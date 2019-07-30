import React from 'react';
import './App.css';
import Navbar from './containers/NavBar'
import TilesContainer from './containers/TilesContainer.js';
import Campaign from './components/Campaign.js';
import CampaignForm from './components/CampaignForm.js'
import SignupForm from './components/SignupForm.js'
import LoginForm from './components/LoginForm.js'
import {Route, Switch} from 'react-router-dom'
import Profile from './containers/Profile.js'



class App extends React.Component {

  state = {
    currentUser: {},
    campaigns: [],
    filterCampaigns: [],
    dontations: [],
    foundCampaign: {},
    loggedIn: false

  }

  componentDidMount(){
    fetch("http://localhost:3000/auto_login",{
       headers: {
         "Authorization": localStorage.user_id
       }
     })
     .then(resp => resp.json())
     .then(user => {
       if(user.errors){
         alert(user.errors)
       }else{
         this.setState({
           currentUser: user,
           loggedIn: true
         })
       }
     })

  fetch("http://localhost:3000/campaigns")
    .then(r=> r.json())
    .then(campaigns => {
      this.setState({
        campaigns: campaigns,
        filterCampaigns: campaigns
      }, () => {
      })
    })

    fetch("http://localhost:3000/donations")
    .then(r=>r.json())
    .then(donations => {
      this.setState({
        donations: donations
      })
    })

  }

  logout = () => {
    this.setState({
      currentUser: null,
      loggedIn: false
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
        loggedIn: true,
        currentUser: user
      },() => {
        localStorage.user_id = user.id
        this.props.history.push("/campaigns")
      })
  }

  findCampaigns = (search) => {
    this.setState({
      campaigns: this.state.filterCampaigns.filter( campaign => campaign.title.toLowerCase().includes(search.toLowerCase()))
    })
  }

  findClickedCampaign = (selectedCamapaign,event) => {
    this.setState({
      foundCampaign: this.state.campaigns.find(campaign => campaign.id === selectedCamapaign.id)
    },() =>{
      this.props.history.push(this.stringCamapaignUrl())
    } )
  }

  stringCamapaignUrl = () => {
    return `/camapaigns/${this.state.foundCampaign.id}`
  }

  stringProfileUrl = () => {
    return `/profile/${localStorage.user_id}`
  }

  updatedCampaign = (updatedCampaign) => {
    this.setState({
      campaigns: this.state.campaigns.map(campaign => {
        if (campaign.id === updatedCampaign.id){
          return updatedCampaign
        }else {
          return campaign
        }
      }),
      filterCampaigns: this.state.filterCampaigns.map(campaign =>
      {
        if (campaign.id === updatedCampaign.id){
          return updatedCampaign
        }else {
          return campaign
        }
      }),
      foundCampaign: updatedCampaign
    })
  }


  render(){
    return (
      <div className="App">
        <Navbar logout={this.logout} loggedIn={this.state.loggedIn} findCampaigns={this.findCampaigns} />
        <Switch >
          <Route path={this.stringProfileUrl()} render={()=> <Profile user={this.state.currentUser}/>}/>
          <Route path={this.stringCamapaignUrl()} render={()=><Campaign donations={this.state.donations} updatedCampaign={this.updatedCampaign} loggedIn={this.state.loggedIn} campaign={this.state.foundCampaign}/> }/>
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
