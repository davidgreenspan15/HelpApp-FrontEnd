import React from 'react'
import ProgressBar from '../components/ProgressBar'

class Tile extends React.Component{

  state = {
    progress: (this.props.campaign.raised_donation/this.props.campaign.goal)*100
  }

  render(){
    return(
      <div className="individual-card" onClick={(event)=>this.props.findClickedCampaign(this.props.campaign,event)}>
        <div className="ui card">
          <div className="image">
            <img src={this.props.campaign.image} alt=""/>
          </div>
          <div className="content">
            <div className="header">{this.props.campaign.title}</div>
            <div className="meta">
              <span className="date">Created On: {this.props.campaign.created_at.split('T')[0]}</span>
            </div>
            <div className="description">
              {this.props.campaign.description.substring(0,100) + "..."}
            </div>
          </div>
          <div className="extra content">
              <i className="dollar sign icon"></i>
              <div>
                Amount Raised: {this.props.campaign.raised_donation + "/" + this.props.campaign.goal }
                </div>
                <ProgressBar progress={this.state.progress}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Tile
