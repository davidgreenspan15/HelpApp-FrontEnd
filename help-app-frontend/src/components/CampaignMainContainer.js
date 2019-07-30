import React from 'react'



class CampaignMainContainer extends React.Component{

  render(){
    console.log(this.props)
    return(
      <div>
        <img src={this.props.campaign.image} alt=""/>
        <div className="header">{this.props.campaign.title}</div>
        <div class="description">{this.props.campaign.description}</div>
      </div>
    )
  }
}

export default CampaignMainContainer
