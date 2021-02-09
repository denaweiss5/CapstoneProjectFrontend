import React from 'react'
import { Table } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

class MealEntry extends React.Component{

    render(){
        const { calories, name, fat, protein, carbs } = this.props.entry
        return(
           
         
                 <Table.Body>
                    <Table.Row >
                        <Table.Cell>{name}</Table.Cell>
                        <Table.Cell>{fat} g</Table.Cell>
                        <Table.Cell >{carbs} g</Table.Cell>
                        <Table.Cell >{protein} g</Table.Cell>
                        <Table.Cell >{calories}</Table.Cell>
                    </Table.Row>
                    </Table.Body>
            
       
        )
    }
}

export default MealEntry