import React from 'react'
import SearchBar from '../components/SearchBar'
import {Link} from 'react-router-dom'
class Navbar extends React.Component{
  state = {
    search: "",
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
      <SearchBar findCampaigns={this.props.findCampaigns}/>
        {
          this.props.loggedIn ?
          <span>
          <Link to="/campaignform">
            <button className="ui blue button new-event">
              <i className="calendar plus icon"></i>
            </button>
          </Link>
          <Link to="/profile">  <button className="ui yellow button"><i className="user outline icon"></i></button></Link>
            <button onClick={this.props.logout} className="ui red button">Logout</button>
          </span>
          :
          <span>
            <Link to="/login"><button className="ui red button login">Login</button></Link>
              <Link to="/signup"><button className="ui green button">Signup</button></Link>
          </span>

        }
      </div>
        )
      }
    }

export default Navbar;
