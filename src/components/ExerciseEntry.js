import React from 'react'
import { Button, Table } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { deleteEntry } from '../actions/exerciseEntries'
import { connect } from 'react-redux'



class ExerciseEntry extends React.Component{


    handleDelete = () => {
        const { id } = this.props.entry
        fetch(`http://localhost:3000/exercise_entries/${id}`, {
            method: 'DELETE'
        })
        .then(resp => resp.json())
        .then(data => {
            this.props.deleteEntry(id)
        })
    }


    render(){
        const { category, duration, calories_burned, id } = this.props.entry
        return(
           
         
                 <Table.Body>
                    <Table.Row >
                        <Table.Cell>{category}</Table.Cell>
                        <Table.Cell>{duration} min</Table.Cell>
                        <Table.Cell >{calories_burned} <Button style={{ padding:'0.5px', float: 'right', backgroundColor: 'white'}} icon='trash' onClick={() => this.handleDelete(id)}></Button></Table.Cell>
                      
                    </Table.Row>
                    </Table.Body>
            
       
        )
    }
}

const mapDispatchToProps = {
    deleteEntry: deleteEntry
}

export default connect(null, mapDispatchToProps)(ExerciseEntry)