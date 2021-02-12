import React from 'react'
import { connect } from 'react-redux';
import { loginSuccess } from '../actions/auth'
import { Form, Input, Button } from 'semantic-ui-react'
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
          body:  JSON.stringify({
            email: this.state.email,
            password: this.state.password
          })
      }
      fetch("http://localhost:3000/auth", reqObj)
      .then(resp => resp.json())
      .then(data => {
          if (data.error){
              this.setState({
                  error: data.error
              })
          } else {
              localStorage.setItem('jwt_token', data.jwt_token)
              this.props.loginSuccess(data.user)
              this.props.history.push('/home')
          }
      })
  }


  render(){
    return(
      <div className='land'>
      { this.state.error ? <h4 style={{color: 'white'}}>{this.state.error}</h4> : null}
      <Form  className='loginform' widths='equal' >
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
        type='password'
        name='password' 
        placeholder='Password'
        value={this.state.password}
        onChange={this.handleChange}
        />
        </Form.Field>
        <Button content='Sign In' onClick={this.handleSubmit}/>
        <Button type='cancel' content='Cancel' onClick={() => this.props.history.push('/')} />
    </Form>
    </div>
   )
  }
}




const mapDispatchToProps = {
    loginSuccess: loginSuccess
}


export default connect(null, mapDispatchToProps)(LoginForm);