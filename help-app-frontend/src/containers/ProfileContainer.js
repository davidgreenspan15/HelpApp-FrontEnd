import  React from 'react'
import UserInfo from '../components/UserInfo.js'
import UserCampaigns from '../components/UserCampaigns.js'

class ProfileContainer extends React.Component{
  render(){
    return(
      <div>
      <UserInfo user={this.props.user} changeCurrentUser={this.props.changeCurrentUser}/>
      <UserCampaigns findClickedCampaign={this.props.findClickedCampaign} stringCamapaignUrl={this.props.stringCamapaignUrl} user={this.props.user} campaigns={this.props.campaigns}/>
      </div>
    )
  }
}

export default ProfileContainer
