import React from 'react'

class CampaignForm extends React.Component{

  state = {
    title: "",
    description: "",
    goal: 0,
    endDate: "",
    image: ""
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    },() => console.log(this.state.goal))
  }

  addCampaign = (event) => {
    event.preventDefault()
    fetch("http://localhost:3000/campaigns",{
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      body: JSON.stringify({
        title: this.state.title,
        image: this.state.image,
        description: this.state.description,
        goal: parseInt(this.state.goal),
        end_date: this.state.endDate,
        user_id: localStorage.user_id
      })
    })
      .then(r=>r.json())
      .then(newCampaign => {
        if(newCampaign.errors){
          alert(newCampaign.errors)
        }else{
          this.props.addCampaignToCampaigns(newCampaign)
        }
      })
  }


  render(){
    return(

      <form onSubmit={this.addCampaign} className="ui form main-container" action="index.html" method="post">

        <div className="field">
          <label>Title</label>
          <input onChange={this.handleChange} type="text" name="title" placeholder="Title"/>
        </div>

        <div className="field">
          <label>Description</label>
          <textarea onChange={this.handleChange} type="text" name="description" placeholder="Description"></textarea>
        </div>

        <div className="field">
          <label>Goal</label>
          <input onChange={this.handleChange} type="number" name="goal" placeholder="Goal"/>
        </div>

        <div className="field">
          <label>End Date</label>
          <input onChange={this.handleChange} type="date" name="endDate" placeholder="End Date"/>
        </div>

        <div className="field">
          <label>Image</label>
          <input onChange={this.handleChange} type="text" name="image" placeholder="image URL"/>
        </div>

        <button className="ui teal button" type="submit">Submit</button>
      </form>
    )
  }
}

export default CampaignForm
