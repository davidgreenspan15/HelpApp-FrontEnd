import React from 'react'
import Donation from '../components/Donation'

class DonationContainer extends React.Component {

  state = {
    clicked: false,
    amount: 0
  }

  renderDonations = () => {
    return this.props.campaign.donations.map(donation => {
      return <Donation donation = {donation} />
    })
  }

  handleClick = () => {
    this.setState({
      clicked: true
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

 addDonation = (event) => {
   event.preventDefault()
   fetch("http://localhost:3000/donations", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
       "Accepted": "application/json"
     },
     body: JSON.stringify({
       user_id: 1,
       amount: amount
     })
   })
   .then(resp => resp.json())
   .then(donation => {
     if(donation.errors){
       alert(donation.errors)
     }else{
       this.props.addDonationToArray(donation)
     }
   })

   this.setState({
     clicked: false
   })
 }

  render(){
    return(
      <div>
        <div className="campaign-goal">{this.props.campaign.raised_donation} out of {this.props.campaign.goal} raised</div>
        <button onClick={this.handleClick} className="ui teal button">Donate Now</button>
        {
          this.state.clicked
          ?
          <div>
            <form onSubmit={this.addDonation} className="ui form main-container" action="index.html" method="post">
              <div className="field">
                <label>Name</label>
                <input onChange={this.handleChange} type="text" name="amount" placeholder="username"/>
                </div>
                <button className="ui teal button" type="submit">Submit</button>
              </form>
          </div>
          : null

        }
        <div className="created-at">{this.props.campaign.created_at}</div>
        {this.renderDonations()}
      </div>
    )
  }
}

export default DonationContainer
