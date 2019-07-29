import React from 'react'
import Donation from '../components/Donation.js'

class DonationContainer extends React.Component{

  state = {
      clicked: false,
      amount: 0
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
       "Accepted": "application/json"
     },
     body: JSON.stringify({
       campaign_id: this.props.campaign.id,
       user_id:parseInt(localStorage.user_id),
       amount: this.state.amount
     })})
     .then(r => r.json())
     .then(console.log())
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
                 <label>Donation</label>
                 <input onChange={this.handleChange} type="number" name="amount" placeholder="username"/>
                 </div>
                 <button className="ui teal button" type="submit">Submit</button>
               </form>
           </div>
           : null
         }

     </div>
   )
 }
}

export default DonationContainer
