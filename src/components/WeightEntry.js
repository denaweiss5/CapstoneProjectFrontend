import React from 'react'
import { connect } from 'react-redux'
import { deleteEntry } from '../actions/weightEntries'

class WeightEntry extends React.Component{

    handleDelete = () => {
        const { id } = this.props.entry
        fetch(`http://localhost:3000/weight_entries/${id}`, {
            method: 'DELETE'
        })
        .then(resp => resp.json())
        .then(data => {
            this.props.deleteEntry(id)
        })
    }

    render(){
        const { weight, date, id } = this.props.entry

        return(
            <div >
            <table className="ui blue table">
            <tbody>
                <tr style={{
                    textAlign: 'left',
                    position: 'relative'
                }}>
                <td>{date}</td>
                <td style={{
                    paddingLeft: '90px'
                }}>{weight}</td>
               <td><button  className="ui button" onClick={() => this.handleDelete(this.props.entry.id)} style={{
                   float: 'right'
               }}>
                   Delete
                   </button></td>
                </tr>
            </tbody>
            </table>
            </div>
            
        )
    }
}

const mapDispatchToProps = {
    deleteEntry: deleteEntry
}

export default connect(null, mapDispatchToProps)(WeightEntry)