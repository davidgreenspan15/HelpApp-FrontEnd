import React from 'react'
import Tile from '../components/Tile.js'



class TilesContainer extends React.Component{

  renderTile = () => this.props.campaigns.map(campaign => <Tile key={campaign.id} campaign={campaign} findClickedCampaign={this.props.findClickedCampaign} stringCamapaignUrl={this.props.stringCamapaignUrl}/>)

  render(){
    return  (
      <div className="main-container">
        <div className="ui relaxed grid">
          <div class="three column row">
            {this.renderTile()}
          </div>
        </div>
      </div>
    )
  }
}

export default TilesContainer;
