import React from "react";
import { Button, Card, Grid, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { randomRecipe, viewRecipe } from "../actions/recipes";

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

  handleClick = (id) => {
    fetch(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "d6d30feb34msh027ba22c7ad5d85p111652jsn5e503987bf98",
          "x-rapidapi-host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        },
      }
    )
      .then((resp) => resp.json())
      .then((recipeInfo) => {
        console.log(recipeInfo);
        this.props.viewRecipe(recipeInfo);
        this.props.history.push(`/show_recipes/${id}`);
      });
  };

  componentDidMount() {
    fetch(
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=1",
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "d6d30feb34msh027ba22c7ad5d85p111652jsn5e503987bf98",
          "x-rapidapi-host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        },
      }
    )
      .then((resp) => resp.json())
      .then((randomRecipeArr) => {
        const recipeInfo = randomRecipeArr.recipes[0];
        this.props.randomRecipe(recipeInfo);
      });
  }

  render() {
    let lastEntry;
    let mealName;
    let mealCals;
    let exerciseName;
    let exerciseCals;
    if (this.props.currentUser) {
      let weights = this.props.weightEntries.map((entry) => entry.weight);
      if (weights.length > 0) {
        lastEntry = weights[weights.length - 1];
      } else {
        lastEntry = 0;
      }
    } else {
      lastEntry = 0;
    }
    if (this.props.currentUser && this.props.mealEntries.length > 0) {
      mealName = this.props.mealEntries.slice(-1)[0].name;
    } else {
      mealName = "No Meal Yet";
    }
    if (this.props.currentUser && this.props.mealEntries.length > 0) {
      mealCals = this.props.mealEntries.slice(-1)[0].calories;
    } else {
      mealCals = 0;
    }
    if (this.props.currentUser && this.props.exerciseEntries.length > 0) {
      exerciseName = this.props.exerciseEntries.slice(-1)[0].category;
    } else {
      exerciseName = "No Activity Yet";
    }
    if (this.props.currentUser && this.props.exerciseEntries.length > 0) {
      exerciseCals = this.props.exerciseEntries.slice(-1)[0].calories_burned;
    } else {
      exerciseCals = 0;
    }

    return (
      <div class="row" style={{ display: "flex" }}>
        <div className="col1">
          <Link to="/myWeightJourney">
            <Button
              style={{
                margin: "1em",
                width: "20vw",
                color: "rgb(202, 49, 49)",
              }}
            >
              Add New Weight Entry
            </Button>
          </Link>
          <br></br>
          <p className="homepage_title">My Total Weight Lost</p>
          <p className="homepage_info">{this.renderTotal()} lbs</p>
          <i style={{ marginBottom: ".5em" }} class=" huge weight icon"></i>
          <p className="homepage_title">My Current Weight</p>
          <p className="homepage_info">{lastEntry} lbs</p>
        </div>
        <div className="col2">
          <Link to="/myDiaries">
            <Button
              style={{
                margin: "1em",
                width: "20vw",
                color: "rgb(158, 65, 161)",
              }}
            >
              Add New Diary Entry
            </Button>
          </Link>
          <br></br>
          <p className="homepage_title">My Last Meal</p>
          <p className="homepage_info">
            {mealName}: 
            </p>
            <p className="homepage_info">
            {mealCals} calories
          </p>
          <i style={{ margin: ".5em" }} class=" big utensils icon"></i>
          <p className="homepage_title">My Last Activity</p>
          <p className="homepage_info">
            {exerciseName}: 
            </p>
            <p className="homepage_info">
            {exerciseCals} calories burned
          </p>
          <i style={{ margin: ".5em" }} class=" big bicycle icon"></i>
        </div>
        <div className="col3" style={{ textAlign: "center" }}>
          <Link to="/recipes">
            <Button
              style={{
                margin: "1em",
                width: "20vw",
                color: "rgb(47, 47, 209)",
              }}
            >
              Find A Recipe
            </Button>
          </Link>
          <br></br>
          <p className="homepage_title">Suggested Recipe</p>
          {this.props.randomRecipeInfo ? (
            <Card
              onClick={() => this.handleClick(this.props.randomRecipeInfo.id)}
              style={{ padding: "10px", marginLeft: "4vh" }}
            >
              <Image
                src={this.props.randomRecipeInfo.image}
                wrapped
                ui={false}
                style={{
                  height: "auto",
                  width: "auto",
                }}
              />
              <Card.Content>
                <Card.Header
                  style={{
                    fontSize: "3vh",
                    fontFamily: "sans-serif",
                    fontWeight: "lighter",
                  }}
                >
                  {this.props.randomRecipeInfo.title}
                </Card.Header>
              </Card.Content>
            </Card>
          ) : null}
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
    randomRecipeInfo: state.randomRecipe,
  };
};

const mapDispatchToProps = {
  randomRecipe: randomRecipe,
  viewRecipe: viewRecipe,
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
