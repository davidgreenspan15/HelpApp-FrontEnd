import React from 'react';
import './App.css';
import Navbar from './containers/NavBar'
import TilesContainer from './containers/TilesContainer.js';
import Campaign from './components/Campaign.js';
import CampaignForm from './components/CampaignForm.js'
import SignupForm from './components/SignupForm.js'
import LoginForm from './components/LoginForm.js'
import {Route, Switch} from 'react-router-dom'
import ProfileContainer from './containers/ProfileContainer.js'



class App extends React.Component {

  state = {
    currentUser: {},
    campaigns: [],
    filterCampaigns: [],
    foundCampaign: {},
    loggedIn: false,
    donations: []

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

  changeCurrentUser = (updatedUser) => {
    this.setState({
      currentUser:updatedUser
    })
  }


  logout = () => {
    this.props.history.push("/login")
    this.setState({
      currentUser: null,
      loggedIn: false
    },() => {
      localStorage.removeItem("user_id")
    })
  }

  addCampaignToCampaigns = (newCampaign) => {
    this.setState({
      campaigns: [...this.state.campaigns,newCampaign],
      filterCampaigns: [...this.state.filterCampaigns,newCampaign]
    },() => {
      this.props.history.push("/campaigns")
    } )
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

  findClickedCampaign = (selectedCamapaign) => {
    fetch("http://localhost:3000/donations")
    .then(resp => resp.json())
    .then(donations => {
      let campaignDonations = donations.filter(donation => donation.campaign_id === selectedCamapaign.id)
      this.setState({
        donations: campaignDonations.reverse()
      })
    })

    this.setState({
      foundCampaign: this.state.campaigns.find(campaign => campaign.id === selectedCamapaign.id)
    },() =>{
      this.props.history.push(`/campaigns/${selectedCamapaign.id}`)
    } )
  }

  stringCamapaignUrl = () => {
    return `/camapaigns/${this.state.foundCampaign.id}`
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

  addDonation = (obj) => {
    console.log(obj);
    this.setState({
      donations: [obj.donation,...this.state.donations]
    })
  }


  removeCampaign = (campaignID) => {
    this.props.history.push("/campaigns")
    this.setState({
      campaigns: this.state.campaigns.filter(campaign => campaign.id !== campaignID),
      filterCampaigns: this.state.filterCampaigns.filter(campaign => campaign.id !== campaignID)
    })
  }



  render() {
    return (
      <div className="App">
        <Navbar logout={this.logout} loggedIn={this.state.loggedIn} findCampaigns={this.findCampaigns} />
        <Switch>
          <Route path="/campaigns/:id" render={(routerProps)=>{
              const foundCampaign = this.state.campaigns.find(campaign => campaign.id === parseInt(routerProps.match.params.id))

              if (foundCampaign) {
                return (
                  <Campaign
                  campaign={foundCampaign}
                  donations={this.state.donations}
                  updatedCampaign={this.updatedCampaign}
                  loggedIn={this.state.loggedIn}
                  removeCampaign={this.removeCampaign}
                  addDonation={this.addDonation}
                  />
                )
              }
            }}/>
          <Route path="/profile" render={()=> <ProfileContainer findClickedCampaign={this.findClickedCampaign} stringCamapaignUrl={this.stringCamapaignUrl}user={this.state.currentUser} campaigns={this.state.campaigns} changeCurrentUser={this.changeCurrentUser} />}/>
          <Route path="/campaignform" render={()=> <CampaignForm  addCampaignToCampaigns={this.addCampaignToCampaigns}/>}/>
          <Route path="/signup" render={()=> <SignupForm setUser={this.setUser}/>}/>
          <Route path="/login" render={()=> <LoginForm setUser={this.setUser}/>}/>
          <Route path="/campaigns" render={() => <TilesContainer findClickedCampaign={this.findClickedCampaign} progress={this.state.progress} campaigns={this.state.campaigns} stringCamapaignUrl={this.stringCamapaignUrl}/>}/>
        </Switch>
      </div>
    )
  }
}

export default App;
