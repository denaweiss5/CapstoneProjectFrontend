import React from "react";
import { Button, Form, Input } from "semantic-ui-react";
import { connect } from "react-redux";
import { createMealEntry } from "../actions/mealEntries";

class Popup extends React.Component {
  constructor(props) {
    super(props);
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    const updatedDate = `${yyyy}-${mm}-${dd}`;
    this.state = {
      name: props.recipe.title,
      fat: props.nutritionInfo.fat.replace("g", ""),
      carbs: props.nutritionInfo.carbs.replace("g", ""),
      protein: props.nutritionInfo.protein.replace("g", ""),
      calories: props.nutritionInfo.calories.replace("g", ""),
      date: updatedDate,
      error: "",
    };
  }

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
          this.props.showMessage();
          this.props.createMealEntry(newEntry);
          this.props.closePopup();
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

  render() {
    return (
      <div className="popup">
        <div className="popup\_inner">
          <Form style={{ marginTop: "8vh" }}>
            <Input
              style={{ display: "block", width: "75%", marginLeft: "12%" }}
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              placeholder="Meal Name"
            ></Input>
            <Input
              style={{ display: "block", width: "75%", marginLeft: "12%" }}
              type="number"
              name="fat"
              value={this.state.fat}
              onChange={this.handleChange}
              placeholder="fat"
            ></Input>
            <Input
              style={{ display: "block", width: "75%", marginLeft: "12%" }}
              type="number"
              name="carbs"
              value={this.state.carbs}
              onChange={this.handleChange}
              placeholder="carbs"
            ></Input>
            <Input
              style={{ display: "block", width: "75%", marginLeft: "12%" }}
              type="number"
              name="protein"
              value={this.state.protein}
              onChange={this.handleChange}
              placeholder="protein"
            ></Input>
            <Input
              style={{ display: "block", width: "75%", marginLeft: "12%" }}
              type="number"
              name="calories"
              value={this.state.calories}
              onChange={this.handleChange}
              placeholder="calories"
            ></Input>
            <Input
              style={{ display: "block", width: "75%", marginLeft: "12%" }}
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
              onClick={this.props.closePopup}
              className="ui button"
            >
              Cancel
            </Button>
          </Form>

          <h1>{this.props.text}</h1>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  createMealEntry: createMealEntry,
};

const mapStateToProps = (state) => {
  return {
    recipe: state.recipe,
    nutritionInfo: state.nutritionInfo,
    currentUser: state.currentUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
