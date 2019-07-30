import React from 'react'

class Donation extends React.Component{



  render(){
    return(
      <div>
        <div class="ui cards">
          <div class="card">
            <div class="content">
              <div class="header">Donated By: {this.props.donation.user.username}</div>
              <div class="description">
                  <h4>Donation Amount: {this.props.donation.amount}</h4>
                  <h4>Donated on: {this.props.donation.created_at}</h4>
              </div>
            </div>
          </div>
      </div>
    </div>
    )
  }
}

export default Donation
