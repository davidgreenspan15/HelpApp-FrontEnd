import React from 'react'
import UserInfo from '../components/UserInfo.js'

class Profile extends React.Component{

  render(){
    return(
      <div>
        <UserInfo userInfo={this.props.user}/>
      </div>
    )
  }
}

export default Profile
