import React from 'react'

class EventForm extends React.Component{

  state = {
    title: "",
    description: "",
    goal: 0,
    endDate: "",
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
        description: this.state.description,
        goal: parseInt(this.state.goal),
        end_date: this.state.endDate,
        user_id: localStorage.token
      })
    })
      .then(r=>r.json())
      .then(newEvent => {
        if(newEvent.errors){
          alert(newEvent.errors)
        }else{
          this.props.addEventToEvents(newEvent)
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
          <input onChange={this.handleChange} type="text" name="goal" placeholder="Goal"/>
        </div>

        <div className="field">
          <label>End Date</label>
          <input onChange={this.handleChange} type="date" name="endDate" placeholder="End Date"/>
        </div>

        <button className="ui teal button" type="submit">Submit</button>
      </form>
    )
  }
}

export default EventForm
