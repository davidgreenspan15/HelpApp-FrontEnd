import React from 'react'
import SearchBar from '../components/SearchBar'
import {Link} from 'react-router-dom'
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
        <Link to="/"><div className="company-name">
          Help
        </div></Link>
      <SearchBar findEvents={this.props.findEvents}/>
        {
          this.state.loggedIn ?
          null
          :
          <span>
            <Link to="/login"><button className="ui red button login">Login</button></Link>
              <Link to="/signup"><button className="ui green button">Signup</button></Link>
          </span>

        }
        {
          this.state.loggedIn
          ? <button className="ui yellow button"><i className="user outline icon"></i></button>
            : null
        }
        <Link to="/eventform">
          <button className="ui blue button new-event">
            <i className="calendar plus icon"></i>
          </button>
        </Link>
      </div>
        )
      }
    }

export default Navbar;
