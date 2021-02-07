import React from 'react'
import ExerciseEntriesContainer from './ExerciseEntriesContainer'
import { Divider, Header, Image, Grid,Segment } from 'semantic-ui-react'
import NetCalories from './NetCalories'


class Diaries extends React.Component{

    render(){
        return (
            <div>
                <Segment>
                    <Header as='h3'>Meals</Header>
                    
                   
                    <Divider section />

                    <Header as='h3'>Activities</Header>
                    <ExerciseEntriesContainer/>
                    <Divider section />
                    <NetCalories/>
                </Segment>
           


            </div>
        )
    }
}

export default Diaries