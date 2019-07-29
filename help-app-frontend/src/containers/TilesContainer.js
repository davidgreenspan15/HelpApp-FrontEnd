import React from 'react'
import Tile from '../components/Tile.js'



class TilesContainer extends React.Component{

  renderTile = () => this.props.campaigns.map(campaign => <Tile key={campaign.id} campaign={campaign} findClickedCampaign={this.props.findClickedEvent}/>)

  render(){
    return  (

      <div className="main-container">
        {this.renderTile()}
      </div>
    )
  }
}

export default TilesContainer;
