import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Divider, Grid, Menu } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { logoutUser } from '../actions/auth'
import "semantic-ui-css/semantic.min.css";
import SearchBar from './SearchBar'
import history from "../history";



import {
  Button,
  Container,
  Dropdown,

  Header,
  Icon,

  Message
} from "semantic-ui-react";



class Navbar extends React.Component{

    handleSignOut = () => {
      localStorage.removeItem('jwt_token')
        this.props.logoutUser()
    }

    render(){
        return(

<div className="App">
  { this.props.currentUser ? 
        <Grid padded className="tablet computer only" >
          <Menu borderless fluid fixed="top" size="huge" >
            <Container>
            <Link to='/home'>
              <Menu.Item style={{marginTop: '10px'}} active as="a" >
                Home
              </Menu.Item>
              </Link>
              <Link to='/myWeightJourney'>
              <Menu.Item as="a" style={{marginTop: '10px'}} >My Weight Journey</Menu.Item>
              </Link>
              <Link to='/myDiaries'>
              <Menu.Item as="a" style={{marginTop: '10px'}} >My Diaries</Menu.Item>
              </Link>
              <Link to='/myHabits'>
              <Menu.Item as="a" style={{marginTop: '10px'}} >My Habits</Menu.Item>
              </Link>
              <Menu.Menu position="right">
              <Dropdown item text="Recipes">
                <Dropdown.Menu>
                <Link to='/recipes'>
                  <Dropdown.Item as="a" >
                    Find Recipes
                  </Dropdown.Item>
                  </Link>
                  <Link to='/favorite_recipes'>
                  <Dropdown.Item as="a" >
                    My favorites
                  </Dropdown.Item>
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
                <Menu.Item>
             <SearchBar history={history}/>
           </Menu.Item>
                <Dropdown item text="Account">
                <Dropdown.Menu>
                <Link to='/account_info'>
                  <Dropdown.Item as="a" >
                    Settings
                  </Dropdown.Item>
                  </Link>
                  <Link to='/'>
                  <Dropdown.Item as="a" onClick={this.handleSignOut}>
                    Sign Out
                  </Dropdown.Item>
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
             
              </Menu.Menu>
            </Container>
          </Menu>
        </Grid>
        :
        null }
</div>
     

        )
    }

} 

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
}

const mapDispatchToProps = {
    logoutUser: logoutUser
}


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);