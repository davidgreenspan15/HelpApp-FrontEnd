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
    if(this.state.password != ""){
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
  }

  handleClick = () => {
    this.setState({
      edit: false
    })
  }

  render(){
    return (

      <div className="main-container">
        <div className= "user-form">
        {this.state.edit ?
          <div>
            <h1><u>Update Your Info</u></h1>
            <form onSubmit={this.handleSubmit} class="ui form" action="index.html" method="post">
              <div class="field">
                <label>Name</label>
                <input onChange={this.handlChange} type="text" name="name" value={this.state.name}/>
              </div>
              <div class="field">
                <label>UserName</label>
                <input onChange={this.handlChange} type="text" name="username" value={this.state.username}/>
              </div>
              <div class="field">
                <label>Password</label>
                <input onChange={this.handlChange} type="password" name="password" value={this.state.password}/>
              </div>
              <div class="field">
                <label>Confirm Password</label>
                <input onChange={this.handlChange} type="password" name="passwordConfirmation" value={this.state.passwordConfirmation}/>
              </div>
              <button className="ui teal button" type="Submit">Submit</button>
              <button onClick={this.handleClick} className="ui black button">Cancel</button>
            </form>
          </div>
          :
          <div>
            <h1><u>My Info</u></h1>
            <div className="user-info">
              <p>Name: {this.props.user.name}</p>
              <p>Username: {this.props.user.username}</p>
              <p>Password: **********</p>
              <button className="ui black button" onClick={this.showEditForm}> Edit</button>
            </div>
          </div>
        }

        </div>
      </div>



    )
  }
}

export default UserInfo
