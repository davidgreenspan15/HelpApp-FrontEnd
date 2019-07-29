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

  login = (event) => {
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
            this.props.setUser(user)

        }
      })
    }
  }


  render(){
    return(

      <form onSubmit={this.login} className="ui form main-container" action="index.html" method="post">

        <div className="field">
          <label>User Name</label>
          <input onChange={this.handleChange} type="text" name="username" placeholder="username"/>
        </div>

        <div className="field">
          <label>Password</label>
          <input onChange={this.handleChange} type="password" name="password" placeholder="password"/>
        </div>

        <button className="ui teal button" type="submit">Submit</button>
      </form>
    )
  }
}

export default LoginForm
