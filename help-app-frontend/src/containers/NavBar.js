import React from 'react'
import SearchBar from '../components/SearchBar'
import {Link} from 'react-router-dom'
class Navbar extends React.Component{
  state = {
    search: "",
  }

  setSearchState = (event) => {
    this.setState({
      search: event.target.value
    }, () => {
      this.props.findCampaigns(this.state.search)
    })
  }

  handleSearch = () => {
    console.log("Here")
  }


  clearState = () => {
    this.setState({
      search:""
    }, () => {

      this.props.findCampaigns(this.state.search)
    })
  }

  render(){
    return(
      <div className="nav-container">
        <i className="dollar sign icon"></i>

        <div onClick={this.clearState}><Link to="/campaigns"><div  className="company-name">

          Help
        </div></Link></div>
      <SearchBar findCampaigns={this.props.findCampaigns} setSearchState={this.setSearchState} search={this.state.search}/>
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
