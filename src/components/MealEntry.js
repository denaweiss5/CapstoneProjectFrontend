import React from 'react'
import { Table, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { connect } from 'react-redux'
import { deleteEntry } from '../actions/mealEntries'


class MealEntry extends React.Component{

    handleDelete = () => {
        const { id } = this.props.entry
        fetch(`http://localhost:3000/meal_entries/${id}`, {
            method: 'DELETE'
        })
        .then(resp => resp.json())
        .then(data => {
            this.props.deleteEntry(id)
        })
    }

    render(){
  
        const { calories, name, fat, protein, carbs, id } = this.props.entry
        return(
           
         
                 <Table.Body>
                    <Table.Row >
                        <Table.Cell>{name}</Table.Cell>
                        <Table.Cell>{fat} g</Table.Cell>
                        <Table.Cell >{carbs} g</Table.Cell>
                        <Table.Cell >{protein} g</Table.Cell>
                        <Table.Cell >{calories} <Button style={{padding:'0.5px', float: 'right',  backgroundColor: 'white'}} icon='trash' onClick={() => this.handleDelete(id)}></Button></Table.Cell>
                    </Table.Row>
                    </Table.Body>
            
       
        )
    }
}

const mapDispatchToProps = {
    deleteEntry: deleteEntry
}


export default connect(null, mapDispatchToProps)(MealEntry)