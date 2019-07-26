import React from 'react'

class SignupForm extends React.Component{

  state = {
    name: "",
    password: "",
    username: "",
    creditCard: 0
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  addUser = (event) => {
    event.preventDefault()
    fetch("http://localhost:3000/users",{
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      body:JSON.stringify({
        name: this.state.name,
        password: this.state.password,
        username: this.state.username,
        credit_card: this.state.creditCard
      })
      .then(r=>r.json())
      .then(newUser => {
        if(newUser.errors){
          alert(newUser.errors)
        }else{
          this.props.setUser(response)
        }
      }
        )
    })
  }


  render(){
    return(
      <form onSubmit={this.addUser} className="main-container" action="index.html" method="post">
        <input onChange={this.handleChange} type="text" name="name" placeholder="name"/>
        <input onChange={this.handleChange} type="username" name="username" placeholder="username"/>
        <input onChange={this.handleChange} type="password" name="password" placeholder="password"/>
        <input onChange={this.handleChange} type="number" name="creditCard" placeholder="creditCard"/>
        <button type="Submit">Submit</button>
      </form>

    )
  }
}

export default SignupForm
