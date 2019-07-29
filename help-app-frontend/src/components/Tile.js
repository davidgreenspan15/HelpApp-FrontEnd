import React from 'react'
import ProgressBar from '../components/ProgressBar'
import { Link } from 'react-router-dom'

class Tile extends React.Component{

  state = {
    progress: (30000/this.props.campaign.goal)*100
  }

  stringEventUrl = () => {
    return `/events/${this.props.campaign.id}`
  }

  render(){
    return(
      <div className="individual-card" onClick={()=>this.props.findClickedCampaign(this.props.campaign)}>
        <div class="ui card">
          <div class="image">

          </div>
          <div class="content">
            <Link to={this.stringEventUrl()} className="header">{this.props.campaign.title}</Link>
            <div class="meta">
              <span class="date">Created On: {this.props.campaign.created_at.split('T')[0]}</span>
            </div>
            <div class="description">
              {this.props.campaign.description.substring(0,100) + "..."}
            </div>
          </div>
          <div class="extra content">
              <i class="dollar sign icon"></i>
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
