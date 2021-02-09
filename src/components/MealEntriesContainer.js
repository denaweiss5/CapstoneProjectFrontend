import React from "react";
import { Table, Button, Form, Input } from "semantic-ui-react";
import { connect } from "react-redux";
import MealEntry from "./MealEntry";
import { createEntry } from "../actions/mealEntries";



class MealEntriesContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      fat: '',
      carbs: '',
      protein: '',
      calories: '',
      addMeal: true,
    };
  }

  toggleAddMeal = () => {
    console.log("meal");
    this.setState({
      addMeal: !this.state.addMeal,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const name = this.state.name;
    const fat = this.state.fat;
    const carbs = this.state.carbs;
    const protein = this.state.protein;
    const calories = this.state.calories;
    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        fat: fat,
        carbs: carbs,
        protein: protein,
        calories: calories,
        user_id: this.props.currentUser.id,
      }),
    };
    fetch("http://localhost:3000/meal_entries", reqObj)
      .then((resp) => resp.json())
      .then((newEntry) => {
        if (newEntry.error) {
          this.setState({
            error: newEntry.error,
          });
        } else {
          this.toggleAddMeal();
          this.props.createEntry(newEntry);
        }
        this.setState({
            name: '',
            fat: '',
            carbs: '',
            protein: '',
            calories: '',
        })
      });
  };

  render() {
    console.log(this.props.mealEntries);
    return (
      <div>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Fat (g)</Table.HeaderCell>
              <Table.HeaderCell>Carbs (g)</Table.HeaderCell>
              <Table.HeaderCell>Protein (g)</Table.HeaderCell>
              <Table.HeaderCell>Calories</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {this.props.mealEntries.map((entry) => {
            return <MealEntry entry={entry} key={entry.id} />;
          })}
       
       
        </Table>
      
        {this.state.addMeal ? 
              <Button
              style={{ marginLeft: "25px" }}
              onClick={this.toggleAddMeal}
            >
              Add
            </Button>
            :
            <Form>
            <Input
             style={{display: 'block'}}
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              placeholder="Meal Name"
            ></Input>
            <Input
             style={{display: 'block'}}
              type="number"
              name="fat"
              value={this.state.fat}
              onChange={this.handleChange}
              placeholder="fat"
            ></Input>
            <Input
             style={{display: 'block'}}
              type="text"
              name="carbs"
              value={this.state.carbs}
              onChange={this.handleChange}
              placeholder="carbs"
            ></Input>
             <Input
              style={{display: 'block'}}
              type="text"
              name="protein"
              value={this.state.protein}
              onChange={this.handleChange}
              placeholder="protein"
            ></Input>
             <Input
              style={{display: 'block'}}
              type="text"
              name="calories"
              value={this.state.calories}
              onChange={this.handleChange}
              placeholder="calories"
            ></Input>
            <Button
              type="button"
              onClick={this.handleSubmit}
              className="ui blue button"
            >
              Submit
            </Button>
            <Button
              type="button"
              onClick={this.toggleAddMeal}
              className="ui button"
            >
              Cancel
            </Button>
          </Form>
        
    }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    mealEntries: state.mealEntries,
  };
};

const mapDispatchToProps = {
    createEntry: createEntry,
  };

export default connect(mapStateToProps, mapDispatchToProps)(MealEntriesContainer);
