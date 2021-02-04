import React from 'react'
import { Container, Header, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';




class LandingPage extends React.Component{

    render(){
        return(
            <Container text>
                <Header
                as='h1'
                content='Healthy Habits'
                inverted
                style={{
                    fontSize:  '4em',
                    fontWeight: 'bold',
                    marginBottom: 0,
                    marginTop: 0,
                    color: 'grey'
                }}
                />
                <Header
                as='h2'
                content='Where YOU get to choose your HEALTHY HABITS and witness all your goals come to fruition.'
                inverted
                style={{
                    fontSize:  '1.7em',
                    fontWeight: 'normal',
                    marginTop:  '1.5em',
                    color: 'grey'
                }}
                />
                <br></br>
                <Link to='/login'>
                 <Button  color='grey' size='huge' 
                   style={{
                    marginRight: '20px'
                }}
                >
                    Sign in
                </Button>
                </Link>
                <Link to='/register'>
                <Button  color='grey' size='huge' 
                 style={{
                    marginLeft: '20px'
                }}
                >
                    Register
                </Button>
                </Link>
            </Container>
        )
    }
}

export default LandingPage