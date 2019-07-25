import React from 'react'
import Tile from '../container/Tile.js'



class TilesContainer extends React.Component{

  renderTile = () => this.props.events.map(event => <Tile key={event.id} event={event}/>)

  render(){
    return  (
      <div>
        {this.renderTile()}
      </div>
    )
  }
}

export default TilesContainer;
