import React from 'react'

class EventForm extends React.Component{

  state = {
    title: "",
    description: "",
    goal: 0,
    endDate: ""
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  addEvent = (event) => {
    fetch("http://localhost:3000/events",{
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      body:JSON.stringify({
        title: this.state.title,
        description: this.state.description,
        goal: this.state.goal,
        end_date: this.state.endDate,

      })
      .then(r=>r.json())
      .then(newEvent => this.props.addEventToEvents(newEvent))
    })
  }


  render(){
    return(
      <form onSubmit={this.addEvent} className="main-container" action="index.html" method="post">
        <input onChange={this.handleChange} type="text" name="title" placeholder="title"/>
        <input onChange={this.handleChange} type="text" name="description" placeholder="description"/>
        <input onChange={this.handleChange} type="number" name="goal" placeholder="goal"/>
        <input onChange={this.handleChange} type="date" name="endDate"/>
        <button type="Submit">Submit</button>
      </form>

    )
  }
}

export default EventForm
