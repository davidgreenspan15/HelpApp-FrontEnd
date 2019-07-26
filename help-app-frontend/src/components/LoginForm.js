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
    event.preventDefault()
    if(this.state.password){
      fetch("http://localhost:3000/login",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accepted": "application/json"
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      })
      .then(r=>r.json())
      .then(user => {
        if(user.errors){
          alert(user.errors)
        }else{
          this.setState({
            this.props.setUser(user)
          })
        }
      })
    }
  }


  render(){
    return(
      <form onSubmit={this.login} className="main-container" action="index.html" method="post">
        <input onChange={this.handleChange} type="username" name="username" placeholder="username"/>
        <input onChange={this.handleChange} type="password" name="password" placeholder="password"/>
        <button type="Submit">Submit</button>
      </form>

    )
  }
}

export default LoginForm
