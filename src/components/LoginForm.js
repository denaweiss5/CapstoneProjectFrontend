import React from 'react'
import { connect } from 'react-redux';
import { loginSuccess } from '../actions/auth'
import { Form, Input, Message } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css' 

class LoginForm extends React.Component {
    constructor(){
        super()

        this.state = {
            email: 'denaweiss5@gmail.com',
            password: 'dena',
            error: ''
        }
    }

componentDidMount(){
    if(!this.props.currentUser){
    }
}

  handleChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      })
  }

  handleSubmit = (e) => {
      e.preventDefault()

      const reqObj = {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json'
          },
          body:  JSON.stringify(this.state)
      }
      fetch("http://localhost:3000/auth", reqObj)
      .then(resp => resp.json())
      .then(data => {
          if (data.error){
              this.setState({
                  error: data.error
              })
          } else {
              this.props.loginSuccess(data)
              this.props.history.push('/home')
          }
      })
  }


  render(){
    return(
      <div >
      { this.state.error ? <h4 style={{color: 'red'}}>{this.state.error}</h4> : null}
      <Form  className='loginform' widths='equal' onSubmit={this.handleSubmit}>
        <h1>Sign in</h1>
        <br></br>
       <Form.Field required>
        <label>Email</label>
        <Input 
        name='email' 
        placeholder='Email'
        value={this.state.email}
        onChange={this.handleChange} 
        />
        </Form.Field>
        <Form.Field required>
        <label>Password</label>
        <Input 
        name='password' 
        placeholder='Password'
        value={this.state.password}
        onChange={this.handleChange}
        />
        </Form.Field>
        <Message
          error
          header='Incorrect Information'
          content='Email or Password not found!'
        />
        <Form.Button content='Sign In' />
    </Form>
    </div>
   )
  }
}




const mapDispatchToProps = {
    loginSuccess: loginSuccess
}


export default connect(null, mapDispatchToProps)(LoginForm);