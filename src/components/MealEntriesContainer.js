import React from "react";
import { Table, Button, Form, Input, Popup, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import MealEntry from "./MealEntry";
import { createMealEntry } from "../actions/mealEntries";
import { specifiedMeals } from "../actions/specifiedMeals";
import { Link } from "react-router-dom";

class MealEntriesContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      fat: "",
      carbs: "",
      protein: "",
      calories: "",
      date: "",
      addMeal: true,
      showMessage: false,
      error: "",
    };
  }

  toggleAddMeal = () => {
    this.setState({
      addMeal: !this.state.addMeal,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
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

  handleSubmit = (e) => {
    e.preventDefault();
    const name = this.state.name;
    const fat = this.state.fat;
    const carbs = this.state.carbs;
    const protein = this.state.protein;
    const calories = this.state.calories;
    const updatedDate = parseInt(
      this.state.date.replace("-", "").replace("-", "")
    );
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
        date: updatedDate,
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
          this.showMessage();
          this.props.createMealEntry(newEntry);
        }
        this.setState({
          name: "",
          fat: "",
          carbs: "",
          protein: "",
          calories: "",
          date: "",
        });
      });
  };

  renderTotal = () => {
    let total;
    let date = parseInt(this.props.date.replace("-", "").replace("-", ""));
    const entries = this.props.mealEntries.filter(
      (entry) => entry.date === date
    );
    let calories = entries.map((entry) => {
      return entry.calories;
    });
    const updatedCalories = calories.map((entry) => {
      if (entry === undefined) {
        return 0;
      } else {
        return entry;
      }
    });
    if (updatedCalories.length > 0) {
      const mealCals = updatedCalories.reduce((a, b) => a + b, 0).toFixed(2);
      return mealCals;
    } else {
      return (total = 0);
    }
  };

  render() {
    let date = parseInt(this.props.date.replace("-", "").replace("-", ""));
    const entries = this.props.mealEntries.filter(
      (entry) => entry.date === date
    );
    this.props.specifiedMeals(entries);
    const myEntry = entries.map((entry) => (
      <MealEntry entry={entry} key={entry.id} />
    ));
    return (
      <div>
        {this.state.error ? (
          <h4 className="error">{this.state.error}</h4>
        ) : null}
        {this.state.showMessage ? (
          <Message success header="Your Meal Submission Was Successful!" />
        ) : null}
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
          {myEntry}
          <Table.Row>
            <Table.Cell>Total Calories Burned</Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell>{this.renderTotal()} </Table.Cell>
          </Table.Row>
        </Table>

        {this.state.addMeal ? (
          <Popup
            flowing
            hoverable
            trigger={
              <Button
                style={{ marginLeft: "25px" }}
                onClick={this.toggleAddMeal}
              >
                Add
              </Button>
            }
          >
            <p>
              You can easily add a meal to your diary from our recipes{" "}
              <Link to="/recipes">here</Link>!
            </p>
          </Popup>
        ) : (
          <Form>
            <Input
              style={{ display: "block" }}
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              placeholder="Meal Name"
            ></Input>
            <Input
              style={{ display: "block" }}
              type="number"
              name="fat"
              value={this.state.fat}
              onChange={this.handleChange}
              placeholder="fat"
            ></Input>
            <Input
              style={{ display: "block" }}
              type="number"
              name="carbs"
              value={this.state.carbs}
              onChange={this.handleChange}
              placeholder="carbs"
            ></Input>
            <Input
              style={{ display: "block" }}
              type="number"
              name="protein"
              value={this.state.protein}
              onChange={this.handleChange}
              placeholder="protein"
            ></Input>
            <Input
              style={{ display: "block" }}
              type="number"
              name="calories"
              value={this.state.calories}
              onChange={this.handleChange}
              placeholder="calories"
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
              onClick={this.toggleAddMeal}
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
    mealEntries: state.mealEntries,
  };
};

const mapDispatchToProps = {
  createMealEntry: createMealEntry,
  specifiedMeals: specifiedMeals,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MealEntriesContainer);
