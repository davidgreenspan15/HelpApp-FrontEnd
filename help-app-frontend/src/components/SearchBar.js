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
            <input onChange={this.props.setSearchState} type="text" value={this.props.search} placeholder="Search..."/>
          </form>
      )
    }
}

export default SearchBar;
