import React from 'react'

class SearchBar extends React.Component{
  state = {
    search: ""
  }

  handleChange = (event) => {
    this.setState({
      search: event.target.value
    })
  }

  handleSearch = (e) => {
    e.preventDefault()
    this.props.findEvents(this.state.search)
  }

  render(){
    return(
          <form onSubmit={this.handleSearch} className="ui icon input" action="index.html" method="post">
            <input onChange={(e) => this.handleChange(e)} type="text" placeholder="Search..."/>
            <button type="Submit"><i className="ui icon search"></i></button>
          </form>
      )
    }
}

export default SearchBar;
