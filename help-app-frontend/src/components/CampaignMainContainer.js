import React from 'react'

class CampaignMainContainer extends React.Component{

  render(){
    return(
      <div className="left-side">
        <img className="campaign-image" src={this.props.campaign.image} alt=""/>
        <h3>Created On: {this.props.campaign.created_at.split('T')[0]}</h3>
        <div className="description">{this.props.campaign.description}</div>
      </div>
    )
  }
}

export default CampaignMainContainer
