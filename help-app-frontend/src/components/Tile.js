import React from 'react'
import ProgressBar from '../components/ProgressBar'
import { Link } from 'react-router-dom'

class Tile extends React.Component{

  state = {
    progress: (30000/this.props.event.goal)*100
  }

  stringEventUrl = () => {
    return `/events/${this.props.event.id}`
  }

  render(){
    return(
      <div className="individual-card">
        <div class="ui card">
          <div class="image">

          </div>
          <div class="content">
            <Link to={this.stringEventUrl()} className="header">{this.props.event.title}</Link>
            <div class="meta">
              <span class="date">Created On: {this.props.event.created_at.split('T')[0]}</span>
            </div>
            <div class="description">
              {this.props.event.description.substring(0,100) + "..."}
            </div>
          </div>
          <div class="extra content">
              <i class="dollar sign icon"></i>
              <div>
                Amount Raised: {this.props.event.raised_donation + "/" + this.props.event.goal }
                </div>
                <ProgressBar progress={this.state.progress}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Tile
