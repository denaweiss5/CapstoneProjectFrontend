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
        
        const year = date.toString().slice(0, 4)
        const month = date.toString().slice(5,7)
        const day = date.toString().slice(8,10)
        const updatedDate = `${month}/${day}/${year}`
        return(
            <div >
            <table className="ui table">
            <tbody>
                <tr style={{
                    textAlign: 'left',
                    position: 'relative'
                }}>
                <td>{updatedDate}</td>
                <td >{weight} lbs</td>
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

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeightEntry)