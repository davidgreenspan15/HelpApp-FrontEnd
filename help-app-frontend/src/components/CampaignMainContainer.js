import React from 'react'
import moment from 'moment'

class CampaignMainContainer extends React.Component{

  state = {
    created_by: []
  }

  componentDidMount(){
    fetch("http://localhost:3000/users")
    .then(r=>r.json())
    .then(users => {
      this.setState({
        created_by: users.find(user => user.id === this.props.campaign.user_id)
      })
    })
  }

  render(){
    console.log(this.props)
    return(
      <div className="left-side">
        <h1 className="campaignTitle">{this.props.campaign.title}</h1>
        <img className="campaign-image" src={this.props.campaign.image} alt=""/>
        <h3>Created On: {moment(this.props.campaign.created_at).format('MMMM Do YYYY')}</h3>
        <div className="divider">
          <div className="split">--------------------------------------------------------------------</div>
          <h4>Created by: {this.state.created_by.name}</h4>
          <div className="split">--------------------------------------------------------------------</div>
        </div>
        <div className="description">{this.props.campaign.description}</div>
      </div>
    )
  }
}
export default CampaignMainContainer
