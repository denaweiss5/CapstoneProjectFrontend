import React from "react";
import { Button, Card, Grid, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import weightEntries from "../reducers/weightEntries";
import mealCalories from "../reducers/mealCalories";

class HomePage extends React.Component {
  renderTotal = () => {
    let total;
    let weights = this.props.weightEntries.map((entry) => {
      return entry.weight;
    });
    if (weights.length > 0) {
      const a = weights[0];
      const b = weights[weights.length - 1];
      const newTotal = (a - b).toFixed(1);
      return newTotal;
    } else {
      return (total = 0);
    }

  };

  render() {
      console.log(this.props.exerciseEntries)
    let lastEntry;
    let mealName;
    let mealCals;
    let exerciseName;
    let exerciseCals;
    if (this.props.currentUser) {
        let weights = this.props.weightEntries.map((entry) =>  entry.weight)
        lastEntry = weights[weights.length-1]
    } else {
        lastEntry = 0
    }
    if (this.props.currentUser) {
      mealName = this.props.mealEntries.slice(-1)[0].name;
    } else {
      mealName = 'No Meal Yet';
    }
    if (this.props.currentUser) {
      mealCals = this.props.mealEntries.slice(-1)[0].calories;
    } else {
      mealCals = 0;
    }
    if (this.props.currentUser) {
      exerciseName = this.props.exerciseEntries.slice(-1)[0].category;
    } else {
      exerciseName = 'No Activity Yet';
    }
    if (this.props.currentUser) {
     exerciseCals = this.props.exerciseEntries.slice(-1)[0]
        .calories_burned;
    } else {
      exerciseCals = 0;
    }

    return (
      <div class="row" style={{ display: "flex" }}>
        <div className="col1">
        <Link to="/myWeightJourney">
          <Button style={{ margin: "2em", width: "20vw" }}>
            Add New Weight Entry
          </Button>
          </Link>
          <br></br>
          <p style={{ fontSize: "20px" }}>My Total Weight Lost</p>
          <p style={{ fontSize: "27px" }}>{this.renderTotal()} lbs</p>
          <i style={{ marginBottom: ".5em" }} class=" huge weight icon"></i>
          <p style={{ fontSize: "20px" }}>My Current Weight</p>
          <p style={{ fontSize: "27px" }}>{lastEntry} lbs</p>
        </div>
        <div className="col2">
        <Link to="/myDiaries">
          <Button style={{ margin: "2em", width: "20vw" }}>
            Add New Diary Entry
          </Button>
          </Link>
          <br></br>
          <p style={{ fontSize: "20px" }}>My Last Meal</p>
          <p style={{ fontSize: "27px" }}>
            {mealName}: {mealCals} calories
          </p>
          <i style={{ marginBottom: ".5em" }} class=" huge utensils icon"></i>
          <p style={{ fontSize: "20px" }}>My Last Activity</p>
          <p style={{ fontSize: "27px" }}>
            {exerciseName}: {exerciseCals} calories burned
          </p>
          <i style={{ marginBottom: ".5em" }} class=" huge bicycle icon"></i>
        </div>
        <div className="col3">
        <Link to="/recipes">
          <Button style={{ margin: "2em", width: "20vw" }}>
            See All Recipes
          </Button>
          </Link>
          <br></br>
          Suggested Recipes
          <Card style={{border: '2px solid red',   padding: "10px",
          height: '40vh',
          width: '20vw',
          margin: "5vh",}}>
              <Image src="https://spoonacular.com/recipeImages/568604-556x370.jpg" style={{ height: "20vh",
            width: "auto",}}>
               <Card.Content style={{fontFamily: 'sans-serif', fontWeight: 'lighter'}}>
                   Recipe
               </Card.Content>
              </Image>
              </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    weightEntries: state.weightEntries,
    mealEntries: state.mealEntries,
    exerciseEntries: state.exerciseEntries,
  };
};
export default connect(mapStateToProps)(HomePage);
