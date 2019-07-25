import React from 'react'

class SearchBar extends React.Component{
  state = {
    search: ""
  }

  handleChange = (event) => {
    this.setState({
      search: event.target.value
    }, () => console.log(this.state.search))
  }

  handleSearch = () => {
    console.log("Here")
  }

  render(){
    return(
        <div className="ui icon input">
          <input onChange={(e) => this.handleChange(e)} type="text" placeholder="Search..."/>
          <i onClick={this.handleSearch} className="search icon"></i>
        </div>
      )
    }
}

export default SearchBar;
