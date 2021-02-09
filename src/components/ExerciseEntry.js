import React from 'react'
import { Table } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

class ExerciseEntry extends React.Component{

    render(){
        const { category, duration, calories_burned } = this.props.entry
        return(
           
         
                 <Table.Body>
                    <Table.Row >
                        <Table.Cell>{category}</Table.Cell>
                        <Table.Cell>{duration} min</Table.Cell>
                        <Table.Cell >{calories_burned}</Table.Cell>
                    </Table.Row>
                    </Table.Body>
            
       
        )
    }
}

export default ExerciseEntry