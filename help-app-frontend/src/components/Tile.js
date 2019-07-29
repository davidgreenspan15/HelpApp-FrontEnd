import React from 'react'

class Tile extends React.Component{




  render(){
    return(
      <div onClick={()=>this.props.findClickedCampaign(this.props.campaign)}>
        <h1>{this.props.campaign.title}</h1>
        <h2>{this.props.campaign.description}</h2>
        <h2>{this.props.campaign.goal}</h2>
        <h2>{this.props.campaign.raised_donation}</h2>
      </div>
    )
  }
}

export default Tile
