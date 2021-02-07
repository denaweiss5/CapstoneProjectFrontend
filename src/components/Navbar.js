import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Divider, Grid, Menu } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { logoutUser } from '../actions/auth'



class Navbar extends React.Component{

    handleSignOut = () => {
        this.props.logoutUser()

    }

    render(){
        return(
     
        <div>
        { this.props.currentUser ? 
       <Grid padded>
          <Grid.Column
            tablet={3}
            computer={3}
            only="tablet computer"
            id="sidebar"
          >
            <Menu vertical borderless fluid text>
             <Link to='/home'>
              <Menu.Item className='menuitem' id='activebtn' active as="a">
                HOME
              </Menu.Item>
              </Link>
              <Divider hidden />
              <Divider hidden />
              <Divider hidden />
              <Divider hidden />
              <Divider hidden />
              <Divider hidden />
              <Link to='/myWeightJourney'>
              <Menu.Item className='menuitem' id='menuitem' as="a">My Weight Journey</Menu.Item>
              </Link>
              <Link to='/myDiaries'>
              <Menu.Item className='menuitem' id='menuitem' as="a">My Diaries</Menu.Item>
              </Link>
              <Link to='/myHabits'>
              <Menu.Item className='menuitem' id='menuitem' as="a">My Habits</Menu.Item>
              </Link>
              <Link to='/find_recipes'>
              <Menu.Item className='menuitem' id='menuitem' as="a">Recipes</Menu.Item>
              </Link>
              <Divider hidden />
              <Divider hidden />
              <Divider hidden />
              <Divider hidden />
              <Divider hidden />
              <Divider hidden />
              <Divider hidden />
              <Link to='/account_info'>
              <Menu.Item className='menuitem' id='menuitem'  as="a">Account Info</Menu.Item>
              </Link>
              <Menu.Item onClick={this.handleSignOut} className='menuitem' id='menuitem' as="a">Sign Out</Menu.Item>
                
            </Menu>
          </Grid.Column>
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