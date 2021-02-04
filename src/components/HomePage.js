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
                <Button  color='blue'
                  style={{
                    marginLeft: '50px',
                    marginRight: '15px',
                    marginBottom: '15px',
                    minHeight: '150px',
                    minWidth: '250px',
                    fontSize: '20px',
                    borderRadius: '15px'
                }}
                >
                    My Weight Journey
                </Button>
                </Link>
                <Link to ='/myDiaries'>
                <Button  color='yellow'
                  style={{
                    marginLeft: '15px',
                    marginBottom: '15px',
                    minHeight: '150px',
                    minWidth: '250px',
                    fontSize: '20px',
                    borderRadius: '15px'
                }}
                >
                    My Diary
                </Button>
                </Link>
                <Link to ='/myHabits'>
                <Button  color='green'
                  style={{
                    marginLeft: '50px',
                    marginRight: '15px',
                    marginTop: '15px',
                    minHeight: '150px',
                    minWidth: '250px',
                    fontSize: '20px',
                    borderRadius: '15px'
                }}
                >
                    My Habits
                </Button>
                </Link>
                <Link to ='/recipes'>
                <Button  color='red'
                style={{
                marginLeft: '15px',
                marginTop: '15px',
                minHeight: '150px',
                minWidth: '250px',
                fontSize: '20px',
                borderRadius: '15px'
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