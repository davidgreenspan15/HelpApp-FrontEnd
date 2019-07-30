import React from 'react'

class CampaignMainContainer extends React.Component{

  render(){
    console.log(this.props)
    return(
      <div className="left-side">
        <img className="campaign-image" src="https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313__340.jpg" alt=""/>
        <h3>Created On: {this.props.campaign.created_at.split('T')[0]}</h3>
        <div className="description">{this.props.campaign.description}</div>
      </div>
    )
  }
}

export default CampaignMainContainer
