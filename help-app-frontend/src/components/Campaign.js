import React from 'react'
import CampaignMainContainer from './CampaignMainContainer.js'
import DonationContainer from '../containers/DonationContainer.js'

class Campaign extends React.Component{

  state = {
    clicked: false,
    title: this.props.campaign.title,
    description: this.props.campaign.description,
    goal: this.props.campaign.goal,
    end_date: this.props.campaign.end_date,
    image: this.props.campaign.image
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch(`http://localhost:3000/campaigns/${this.props.campaign.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
        goal: this.state.goal,
        end_date: this.state.end_date,
        image: this.state.image
      })
    })
    .then(r=>r.json())
    .then(updatedCampaign => {
      this.props.updatedCampaign(updatedCampaign)
      this.setState({
        clicked: false
      })
    })
  }

  handleDelete = () => {
    fetch(`http://localhost:3000/campaigns/${this.props.campaign.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    .then(r=> {
        this.props.removeCampaign(this.props.campaign.id)
    })

  }

  handleClick = () => {
    this.setState({
      clicked: true
    }
  )
  }

  render(){
    return(
      <div>

        <h1 className="campaignTitle">{this.props.campaign.title}</h1>
        {
          this.props.loggedIn && parseInt(localStorage.user_id) === this.props.campaign.user_id ?
          <div>
            <button onClick={this.handleClick} className="ui black button">Edit Campaign</button>
            <button onClick={this.handleDelete} className="ui red button">Delete Campaign</button>
          </div>
          : null
        }
        {
          this.state.clicked ?
            <form className="ui form" onSubmit={this.handleSubmit}>
              <div className="field">
                <label>Title</label>
                <input onChange={this.handleChange} value={this.state.title} type="text" name="title" placeholder="Title"/>
              </div>

              <div className="field">
                <label>Description</label>
                <textarea onChange={this.handleChange} value={this.state.description} type="text" name="description" placeholder="Description"></textarea>
              </div>

              <div className="field">
                <label>Goal</label>
                <input onChange={this.handleChange} value={this.state.goal} type="text" name="goal" placeholder="Goal"/>
              </div>

              <div className="field">
                <label>End Date</label>
                <input onChange={this.handleChange} value={this.state.end_date} type="date" name="end_date" placeholder="End Date"/>
              </div>

              <div className="field">
                <label>Image</label>
                <input onChange={this.handleChange} value={this.state.image} type="text" name="image" placeholder="Image URL"/>
              </div>

              <button className="ui teal button">Save Edit</button>
            </form>
         :
         <div>
         <CampaignMainContainer campaign={this.props.campaign}/>
          <DonationContainer loggedIn={this.props.loggedIn} campaign={this.props.campaign} addDonation={this.props.addDonation} donations={this.props.donations} updatedCampaign={this.props.updatedCampaign}/>
          </div>
        }

      </div>
    )
  }
}

export default Campaign
