import React from 'react'

class SignupForm extends React.Component{

  state = {
    name: "",
    password: "",
    username: "",
    passwordComfirmation: "",
    creditCard: 0
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  addUser = (event) => {
    event.preventDefault()
    console.log(this.state.password)
    console.log(this.state.passwordComfirmation)
    if (this.state.password === this.state.passwordComfirmation){
      console.log("Here")
      fetch("http://localhost:3000/users",{
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accepted': 'application/json'
        },
        body: JSON.stringify({
          name: this.state.name,
          password: this.state.password,
          username: this.state.username,
          credit_card: this.state.creditCard
        })
        })
        .then(r=>r.json())
        .then(newUser => {
          if(newUser.errors){
            alert(newUser.errors)
          }else{
            this.props.setUser(newUser)
          }
        }
      )

  }

    }



  render(){
    return(

      <form onSubmit={this.addUser} className="ui form main-container" action="index.html" method="post">

        <div className="field">
          <label>Name</label>
          <input onChange={this.handleChange} type="text" name="username" placeholder="username"/>
        </div>

        <div className="field">
          <label>User Name</label>
          <input onChange={this.handleChange} type="text" name="username" placeholder="username"/>
        </div>

        <div className="field">
          <label>Password</label>
          <input onChange={this.handleChange} type="password" name="password" placeholder="password"/>
        </div>

        <div className="field">
          <label>Password Confirmation</label>
          <input onChange={this.handleChange} type="password" name="passwordComfirmation" placeholder="password confirmation"/>
        </div>

        <div className="field">
          <label>Credit Card</label>
          <input onChange={this.handleChange} type="password" name="creditCard" placeholder="Credit Card"/>
        </div>

        <button className="ui teal button" type="submit">Submit</button>
      </form>
    )
  }
}

export default SignupForm
