import React from 'react'

class SearchBar extends React.Component{


  handleChange = (event) => {
    this.setState({
      search: event.target.value
    }, () => {

      this.props.findCampaigns(this.state.search)
    })
  }




  render(){
    return(
          <form className="ui icon input" action="index.html" method="post">
            <i class="search icon"></i>
            <input onChange={this.props.setSearchState} type="text" value={this.props.search} placeholder="Find Campaigns..."/>
          </form>
      )
    }
}

export default SearchBar;
