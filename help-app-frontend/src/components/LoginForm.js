import React from 'react'

class LoginForm extends React.Component{

  state = {
    password: "",
    username: ""
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  login = () => {
    fetch("http://localhost:3000/users/:id")
      .then(r=>r.json())
      .then(newUser => console.log(newUser))
    }


  render(){
    return(
      <form onSubmit={this.login} className="" action="index.html" method="post">
        <input onChange={this.handleChange} type="username" name="username" placeholder="username"/>
        <input onChange={this.handleChange} type="password" name="password" placeholder="password"/>
        <button type="Submit">Submit</button>
      </form>

    )
  }
}

export default LoginForm
