import React from 'react'

class UserInfo extends React.Component{

  render(){
    return(
      <div>
        <p style={{marginTop: "20%"}}>{this.props.userInfo.username}</p>
        <p>{this.props.userInfo.name}</p>

      </div>
    )
  }
}

export default UserInfo
