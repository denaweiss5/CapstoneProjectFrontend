import React from "react";
import { connect } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import ExerciseEntry from "./ExerciseEntry";
import { Table, Button, Form, Input, Message } from "semantic-ui-react";
import { createEntry } from "../actions/exerciseEntries";
import { specifiedExercises } from "../actions/specifiedExercises";

class ExerciseEntriesContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      addExercise: true,
      showMessage: false,
      category: "",
      duration: "",
      calories_burned: "",
      date: "",
      error: "",
    };
  }

  toggleAddExercise = () => {
    this.setState({
      addExercise: !this.state.addExercise,
    });
  };

  showMessage = () => {
    this.setState({
      showMessage: true,
    });
    setTimeout(() => {
      this.setState({ showMessage: false });
    }, 3000);
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
    const updatedDate = parseInt(
      this.state.date.replace("-", "").replace("-", "")
    );
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
        date: updatedDate,
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
          this.showMessage();
        }
        this.setState({
          category: "",
          duration: "",
          calories_burned: "",
          date: "",
        });
      });
  };

  renderTotal = () => {
    let total;
    let date = parseInt(this.props.date.replace("-", "").replace("-", ""));
    const entries = this.props.exerciseEntries.filter(
      (entry) => entry.date === date
    );
    let calories = entries.map((entry) => {
      return entry.calories_burned;
    });
    const updatedCalories = calories.map((entry) => {
      if (entry === undefined) {
        return 0;
      } else {
        return entry;
      }
    });
    if (updatedCalories.length > 0) {
      const exerciseCals = updatedCalories.reduce((a, b) => a + b, 0);
      return exerciseCals;
    } else {
      return (total = 0);
    }
  };
  render() {
    let date = parseInt(this.props.date.replace("-", "").replace("-", ""));
    const entries = this.props.exerciseEntries.filter(
      (entry) => entry.date === date
    );
    this.props.specifiedExercises(entries);
    const myEntry = entries.map((entry) => (
      <ExerciseEntry entry={entry} key={entry.id} />
    ));
    return (
      <div>
        {this.state.error ? (
          <h4 className="error">{this.state.error}</h4>
        ) : null}
        {this.state.showMessage ? (
          <Message success header="Your Exercise Submission Was Successful!" />
        ) : null}
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Activity Type</Table.HeaderCell>
              <Table.HeaderCell>Duration </Table.HeaderCell>
              <Table.HeaderCell>Calories Burned</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          {myEntry}
          <Table.Row>
            <Table.Cell>Total Calories Burned</Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell>{this.renderTotal()} </Table.Cell>
          </Table.Row>
        </Table>

        {this.state.addExercise ? (
          <Button onClick={() => this.toggleAddExercise()}>Add</Button>
        ) : (
          <Form>
            <Input
              style={{ display: "block" }}
              type="text"
              name="category"
              value={this.state.category}
              onChange={this.handleChange}
              placeholder="activity type"
            ></Input>

            <Input
              style={{ display: "block" }}
              type="number"
              name="duration"
              value={this.state.duration}
              onChange={this.handleChange}
              placeholder="duration (min)"
            ></Input>
            <Input
              style={{ display: "block" }}
              type="number"
              name="calories_burned"
              value={this.state.calories_burned}
              onChange={this.handleChange}
              placeholder="calories burned"
            ></Input>
            <Input
              style={{ display: "block" }}
              type="date"
              name="date"
              value={this.state.date}
              onChange={this.handleChange}
              placeholder="date"
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
  specifiedExercises: specifiedExercises,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExerciseEntriesContainer);
