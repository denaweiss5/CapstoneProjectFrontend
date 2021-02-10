import React from 'react'
import ExerciseEntriesContainer from './ExerciseEntriesContainer'
import { Divider, Header, Image, Grid,Segment, Form, Input } from 'semantic-ui-react'
import NetCalories from './NetCalories'
import MealEntriesContainer from './MealEntriesContainer'


class Diaries extends React.Component{

    render(){
        return (
            <div style={{marginTop : '80px', marginBottom:'80px', textAlign: 'center'}}>
                <Segment definition >
                <Header as='h3'>
                <Form>
                      <Input
                        type="date"
                        name="date"
                        value={this.state.date}
                        onChange={this.handleChange}
                      ></Input>
                      </Form>
                </Header>
                <Divider section />

                    <Header as='h3'>Meals</Header>
                    <MealEntriesContainer/>
    
                    <Divider section />

                    <Header as='h3' >Activities</Header>
                    <ExerciseEntriesContainer/>
                    <Divider section />
                    <NetCalories/>
                </Segment>
           


            </div>
        )
    }
}

export default Diaries