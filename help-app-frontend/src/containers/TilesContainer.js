import React from 'react'
import Tile from '../components/Tile.js'



class TilesContainer extends React.Component{

  renderTile = () => this.props.events.map(event => <Tile key={event.id} event={event}/>)

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
