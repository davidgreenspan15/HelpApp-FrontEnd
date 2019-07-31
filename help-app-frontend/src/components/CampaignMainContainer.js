import React from 'react'
import moment from 'moment'

class CampaignMainContainer extends React.Component{

  render(){
    return(
      <div className="left-side">
        <img className="campaign-image" src={this.props.campaign.image} alt=""/>
        <h3>Created On: {moment(this.props.campaign.created_at).format('MMMM Do YYYY')}</h3>
        <div className="description">{this.props.campaign.description}</div>
      </div>
    )
  }
}
export default CampaignMainContainer
