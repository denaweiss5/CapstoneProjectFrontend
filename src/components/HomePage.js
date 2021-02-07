import React from 'react'
import {
    Button,
    Container
  } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

class HomePage extends React.Component {

    componentDidMount(){
        if(!this.props.currentUser){
            this.props.history.push('/')
        }
    }

    render(){
        return(
            <div>
                <Container text >
                <Link to ='/myWeightJourney'>
                <Button className='homebtns' color='white'
                  style={{
                    marginLeft: '50px',
                    marginRight: '15px',
                    marginBottom: '15px',
                    minHeight: '150px',
                    minWidth: '250px',
                    fontSize: '30px'
                }}
                >
                    My Weight Journey
                </Button>
                </Link>
                <Link to ='/myDiaries'>
                <Button className='homebtns' color='white'
                  style={{
                    marginLeft: '15px',
                    marginBottom: '15px',
                    minHeight: '150px',
                    minWidth: '250px',
                    fontSize: '30px'
                }}
                >
                    My Diary
                </Button>
                </Link>
                <Link to ='/myHabits'>
                <Button className='homebtns' color='white'
                  style={{
                    marginLeft: '50px',
                    marginRight: '15px',
                    marginTop: '15px',
                    minHeight: '150px',
                    minWidth: '250px',
                    fontSize: '30px'
                }}
                >
                    My Habits
                </Button>
                </Link>
                <Link to ='/find_recipes'>
                <Button className='homebtns' color='white'
                style={{
                marginLeft: '15px',
                marginTop: '15px',
                minHeight: '150px',
                minWidth: '250px',
                fontSize: '30px'
                 }}
                >
                    Recipes
                </Button>
                </Link>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
}
export default connect(mapStateToProps)(HomePage)