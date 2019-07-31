import React from 'react'
import moment from 'moment'
class Donation extends React.Component{




  render(){
    return(
      <div className="donation-card">
        <div class="ui cards">
          <div class="card">
            <div class="content">
              <div class="header">Donated By: {this.props.donation.user.username}</div>
              <div class="description">
                  <h4>Donation Amount: ${this.props.donation.amount}</h4>
                  <h4>Donated {moment(this.props.donation.created_at).startOf('minute').fromNow()}</h4>
              </div>
            </div>
          </div>
      </div>
    </div>
    )
  }
}

export default Donation
