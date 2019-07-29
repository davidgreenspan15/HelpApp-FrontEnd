import React from 'react'
import CampaignMainContainer from './CampaignMainContainer.js'
import DonationContainer from '../containers/DonationContainer.js'

class Campaign extends React.Component{

  componentDidMount(){
  }
  render(){
    return(
      <div>
      <CampaignMainContainer campaign={this.props.campaign}/>
      <DonationContainer campaign={this.props.campaign}/>
      </div>
    )
  }
}

export default Campaign
