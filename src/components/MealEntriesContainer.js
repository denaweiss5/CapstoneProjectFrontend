import React from 'react';
import { Table, Button, Form, Input } from 'semantic-ui-react'

class MealEntriesContainer extends React.Component{

    constructor(){
        super()

        this.state = {
            meal: '',
            addMeal: false
        }
    }

    renderMeal = () => {
        console.log('meal')
        this.setState({
            addMeal: !this.state.addMeal
        })
      
    }

    render(){
        return(
            <div>
                 <Table definition>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell>Meal</Table.HeaderCell>
        <Table.HeaderCell>Fat (g)</Table.HeaderCell>
        <Table.HeaderCell>Carbs (g)</Table.HeaderCell>
        <Table.HeaderCell>Protein (g)</Table.HeaderCell>
        <Table.HeaderCell>Calories</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>Breakfast 
            <Button style={{float: 'right'}} onClick={this.renderMeal}>
                Add
            </Button>
  </Table.Cell>
        <Table.Cell>empty </Table.Cell>
        <Table.Cell>Hi</Table.Cell>
        <Table.Cell>Hi</Table.Cell>
        <Table.Cell>Hi</Table.Cell>
        <Table.Cell>Hi</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Lunch
            <Button style={{float: 'right'}}onClick={this.renderMeal} >
                Add
            </Button>
        </Table.Cell>
        <Table.Cell>rating (integer)</Table.Cell>
        <Table.Cell>Sets </Table.Cell>
        <Table.Cell>Hi</Table.Cell>
        <Table.Cell>Hi</Table.Cell>
        <Table.Cell>Hi</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Dinner 
            <Button style={{float: 'right'}}onClick={this.renderMeal} >
                Add
            </Button>
        </Table.Cell>
        <Table.Cell>rating (integer)</Table.Cell>
        <Table.Cell>Sets </Table.Cell>
        <Table.Cell>Hi</Table.Cell>
        <Table.Cell>Hi</Table.Cell>
        <Table.Cell>Hi</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Snacks 
            <Button style={{float: 'right'}} onClick={this.renderMeal}>
                Add
            </Button>
        </Table.Cell>
        <Table.Cell>rating (integer)</Table.Cell>
        <Table.Cell>Sets </Table.Cell>
        <Table.Cell>Hi</Table.Cell>
        <Table.Cell>Hi</Table.Cell>
        <Table.Cell>Hi</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Total Calories</Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell>100</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
        {this.state.addMeal ? 
        <Form>
        <Input type='text' value={this.state.meal} placeholder='Meal Name'></Input>
        </Form>
        :
        null}
     </div>
        )
    }
}

export default MealEntriesContainer