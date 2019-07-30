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
       <div className="campaign-goal">{this.props.campaign.raised_donation} out of {this.props.campaign.goal} raised</div>
       <div className="progressBar"><ProgressBar progress={this.state.progress}/></div>
       <button onClick={this.handleClick} className="ui teal button">Donate Now</button>
         {

           this.props.loggedIn
           ? this.state.clicked
              ? <div>
                <form onSubmit={this.addDonation} className="ui form main-container" action="index.html" method="post">
                  <div className="field">
                    <label>Donation</label>
                    <input onChange={this.handleChange} type="number" name="amount" placeholder="Donation Amount"/>
                    </div>
                    <button className="ui teal button" type="submit">Submit</button>
                  </form>
                  </div>
                  : null
            : <div>Log in to donate</div>

         }
         {this.renderDonationTiles()}

     </div>
   )
 }
}

export default DonationContainer
