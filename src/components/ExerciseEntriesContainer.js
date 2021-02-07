import React from 'react'
import { connect } from 'react-redux'
import 'semantic-ui-css/semantic.min.css'
import ExerciseEntry from './ExerciseEntry'
import { Table } from 'semantic-ui-react'


class WeightEntriesContainer extends React.Component {

    componentDidMount(){
        if(!this.props.currentUser){
            this.props.history.push('/')
        }
    }

    render(){

        return (
            <div>
                 <Table singleLine style={{width: '500px'}}>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Activity Type</Table.HeaderCell>
                        <Table.HeaderCell>Duration</Table.HeaderCell>
                        <Table.HeaderCell>Calories Burned</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>
                    
                    {this.props.exerciseEntries.map(entry => {
                        return <ExerciseEntry entry={entry} key = {entry.id}/>
                    })}
           
                    </Table>
            
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        exerciseEntries: state.exerciseEntries
    }
}

export default connect(mapStateToProps)(WeightEntriesContainer)