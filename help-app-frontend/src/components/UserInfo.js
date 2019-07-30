import React from 'react'


class UserInfo extends React.Component{

  state = {
    edit:false,
    name: this.props.user.name,
    username: this.props.user.username,
    password: "",
    passwordConfirmation: ""

  }


  showEditForm = () => {
    this.setState({
      edit:true
    })
  }

  handlChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if(this.state.password === this.state.passwordConfirmation){
      fetch(`http://localhost:3000/users/${this.props.user.id}`,{
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: this.state.name,
          password: this.state.password,
          username: this.state.username
        })
      })
      .then(r=>r.json())
      .then(updatedUser => {
        this.setState({
          edit:false
        }, () => this.props.changeCurrentUser(updatedUser))
      })

    }else{
      alert('passwords do not match')
    }
  }

  render(){
    return (
      <div className= "main-container">
      {this.state.edit ?
        <div>
          <form onSubmit={this.handleSubmit} class="" action="index.html" method="post">
            <input onChange={this.handlChange} type="text" name="name" value={this.state.name}/>
            <input onChange={this.handlChange} type="text" name="username" value={this.state.username}/>
            <input onChange={this.handlChange} type="password" name="password" value={this.state.password}/>
            <input onChange={this.handlChange} type="password" name="passwordConfirmation" value={this.state.passwordConfirmation}/>
            <input type="Submit"/>
          </form>
        </div>
        :
        <div>
        <h1>Name: {this.props.user.name}</h1>
        <h1>Username:{this.props.user.username}</h1>
        <h1>Password: **********</h1>
        <button onClick={this.showEditForm}> Edit</button>
        </div>
      }
      </div>


    )
  }
}

export default UserInfo
