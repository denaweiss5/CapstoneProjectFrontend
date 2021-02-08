import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Divider, Grid, Menu } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { logoutUser } from '../actions/auth'
import "semantic-ui-css/semantic.min.css";

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
        this.props.logoutUser()

    }

    render(){
        return(

<div className="App">
  { this.props.currentUser ? 
        <Grid padded className="tablet computer only">
          <Menu borderless fluid fixed="top" size="huge">
            <Container>
            <Menu.Item as="a" >Healthy Habits</Menu.Item>
            <Link to='/home'>
              <Menu.Item active as="a" >
                Home
              </Menu.Item>
              </Link>
              <Link to='/myWeightJourney'>
              <Menu.Item as="a" >My Weight Journey</Menu.Item>
              </Link>
              <Link to='/myDiaries'>
              <Menu.Item as="a">My Diaries</Menu.Item>
              </Link>
              <Link to='/myHabits'>
              <Menu.Item as="a">My Habits</Menu.Item>
              </Link>
              <Menu.Menu position="right">
              <Link to='/recipes'>
                <Menu.Item as="a">Recipes</Menu.Item>
                </Link>
                <Dropdown item text="Account">
                <Dropdown.Menu>
                <Link to='/account_info'>
                  <Dropdown.Item as="a" >
                    Settings
                  </Dropdown.Item>
                  </Link>
                  <Dropdown.Item as="a" onClick={this.handleSignOut}>
                    Sign Out
                  </Dropdown.Item>
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