import React from 'react'
import Donation from '../components/Donation.js'
import ProgressBar from '../components/ProgressBar'

class DonationContainer extends React.Component{




  state = {
      clicked: false,
      amount: 0,
      progress: (this.props.campaign.raised_donation/this.props.campaign.goal)*100
    }

    handleClick = () => {
      this.setState({
        clicked: true
      })
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: parseInt(e.target.value)
      })
    }



    addDonation = (event) => {
      event.preventDefault()
      fetch("http://localhost:3000/donations",{
        method: "POST",
        headers:{
         "Content-Type": "application/json",
         "Accept": "application/json"
       },
       body: JSON.stringify({
         campaign_id: this.props.campaign.id,
         user_id: localStorage.user_id,
         amount: this.state.amount
       })
     })
       .then(resp => resp.json())
       .then(obj => {
         this.props.updatedCampaign(obj.campaign)
         this.props.addDonation(obj)
         this.setState({
           progress:(this.props.campaign.raised_donation/this.props.campaign.goal)*100,
           clicked: false
         }, () => alert("Thanks for donating!"))
       })
    }

    renderDonationTiles = () => {
      return this.props.donations.map(donation => {
        if(donation.campaign.id === this.props.campaign.id){
          return <Donation campaign={this.props.campaign.id} donation={donation}/>
        }
      })
    }


  render(){
   return(
     <div className="right-side">
       <div className="campaign-goal">
        <span className="donation">
          <h2>
          {this.props.campaign.raised_donation}
          <i className="dollar sign icon"></i>
          </h2>
        </span>
        <span className="donation"><h4>out of</h4></span>
        <span className="donation"><h3>{this.props.campaign.goal}</h3></span>
        <span className="donation"><h4>raised</h4></span>
      </div>
       <div className="progressBar"><ProgressBar progress={this.state.progress}/></div>
       <button onClick={this.handleClick} className="ui teal button donate">Donate Now</button>
         {

           this.props.loggedIn
           ? this.state.clicked
              ? <div>
                <form onSubmit={this.addDonation} className="ui form main-container" action="index.html" method="post">
                  <div className="field">
                    <label>Donation</label>
                    <input onChange={this.handleChange} type="number" name="amount" placeholder="Donation Amount"/>
                    </div>
                    <button className="ui teal button donations" type="submit">Donate</button>
                  </form>
                  </div>
                  : null
            : <div>Log in to donate</div>

         }
         <div className="tile-container">{this.renderDonationTiles()}</div>

     </div>
   )
 }
}

export default DonationContainer
