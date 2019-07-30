import React from 'react'
import Tile from './Tile.js'



class UserCampaigns extends React.Component{

  filterMyCampaigns = () => this.props.campaigns.filter(campaign => campaign.user_id === parseInt(localStorage.user_id))

  renderTiles = () => this.filterMyCampaigns().map(campaign => <Tile key={campaign.id} campaign={campaign} findClickedCampaign={this.props.findClickedCampaign} stringCamapaignUrl={this.props.stringCamapaignUrl}/>)

  render(){
    return(

      <div>
      {this.renderTiles()}
      </div>
    )
  }
}

export default UserCampaigns
