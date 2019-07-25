import React from 'react'
import SearchBar from '../components/SearchBar'

class Navbar extends React.Component{
  state = {
    search: "",
    loggedIn: false
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
      <div className="nav-container">
        <i className="dollar sign icon"></i>
        <div className="company-name">
          Help
        </div>
        <SearchBar/>
        {
          this.state.loggedIn ?
          null
          :
          <span>
            <button className="ui red button login">Login</button>
            <button className="ui green button">Signup</button>
          </span>

        }
        {
          this.state.loggedIn
          ? <button className="ui yellow button"><i className="user outline icon"></i></button>
            : null
        }
        <button className="ui blue button new-event">
          <i className="calendar plus icon"></i>
        </button>
      </div>
        )
      }
    }

export default Navbar;
