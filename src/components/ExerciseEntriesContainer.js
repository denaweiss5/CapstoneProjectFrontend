import React from "react";
import { connect } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import ExerciseEntry from "./ExerciseEntry";
import { Table } from "semantic-ui-react";
import { Button, Form, Input } from "semantic-ui-react";
import { createEntry } from "../actions/exerciseEntries";

class WeightEntriesContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      addExercise: true,
      category: "",
      duration: "",
      calories_burned: "",
      error: ""
    };
  }

  toggleAddExercise = () => {
    this.setState({
      addExercise: !this.state.addExercise,
    });
  };



  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const category = this.state.category;
    const duration = this.state.duration;
    const calories_burned = this.state.calories_burned;
    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: category,
        duration: duration,
        calories_burned: calories_burned,
        user_id: this.props.currentUser.id,
      }),
    };
    fetch("http://localhost:3000/exercise_entries", reqObj)
      .then((resp) => resp.json())
      .then((newEntry) => {
        if (newEntry.error) {
          this.setState({
            error: newEntry.error,
          });
        } else {
          this.toggleAddExercise();
          this.props.createEntry(newEntry);
        }
        this.setState({
            category: "",
            duration: "",
            calories_burned: ""
        })
      });
  };

  renderTotal = () => {
    let total;
    let calories = this.props.exerciseEntries.map((entry) => {
      return entry.calories_burned
    });
    const updatedCalories = (calories.map(entry => {
        if(entry===undefined){
            return 0
        } else {
            return entry
        }
    }))
    if (updatedCalories.length > 0) {
      return (updatedCalories.reduce((a, b) => a + b, 0));
    } else {
      return (total = 0);
    }
  };
  render() {
    return (
      <div>
    { this.state.error ? <h4 style={{color: 'red'}}>{this.state.error}</h4> : null}

        <Table singleLine>
          <Table.Header>
            <Table.Row >
              <Table.HeaderCell>Activity Type</Table.HeaderCell>
              <Table.HeaderCell>Duration </Table.HeaderCell>
              <Table.HeaderCell>Calories Burned</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          {this.props.exerciseEntries.map((entry) => {
            return <ExerciseEntry entry={entry} key={entry.id} />;
          })}
          <Table.Row >
            <Table.Cell>Total Calories Burned</Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell>{this.renderTotal()} </Table.Cell>
          </Table.Row>
        </Table>
    
          {this.state.addExercise ? (
            <Button
              onClick={() => this.toggleAddExercise()}
              
            >
              Add
            </Button>
          ) : (
         
              <Form >
                <Input
                style={{display: 'block'}}
                  type="text"
                  name="category"
                  value={this.state.category}
                  onChange={this.handleChange}
                  placeholder="activity type"
                ></Input>
     
                <Input
           style={{display: 'block'}}
                  type="number"
                  name="duration"
                  value={this.state.duration}
                  onChange={this.handleChange}
                  placeholder="duration (min)"
                ></Input>
                <Input
                 style={{display: 'block'}}
                  type="number"
                  name="calories_burned"
                  value={this.state.calories_burned}
                  onChange={this.handleChange}
                  placeholder="calories burned"
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
                  onClick={this.toggleAddExercise}
                  className="ui button"
                >
                  Cancel
                </Button>
              </Form>
         
          )}
   
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    exerciseEntries: state.exerciseEntries,
  };
};

const mapDispatchToProps = {
  createEntry: createEntry,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeightEntriesContainer);
