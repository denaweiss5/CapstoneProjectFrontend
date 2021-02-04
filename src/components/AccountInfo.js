import React from 'react'
import { connect } from 'react-redux'
import 'semantic-ui-css/semantic.min.css' 

class AccountInfo extends React.Component{

    componentDidMount(){
        if(!this.props.currentUser){
            this.props.history.push('/')
        }
    }

    render(){
       
        const { name, email } = this.props.currentUser
        return (
            <div >
    
                <div className ='account-details'>
                <h1>Account Settings</h1>
                <div id='namediv'>
                <h3>Name:</h3>
                <h2>{name}</h2>
                </div>
                <div>
                <h3>Email:</h3>
                <h2>{email}</h2>
                </div>
                </div>

            </div>
      


        )}
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
}
export default connect(mapStateToProps)(AccountInfo);