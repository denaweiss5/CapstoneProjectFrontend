import React from "react";
import { Button, Grid, Icon, Image, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import { nutritionRecipe, viewRecipe } from "../actions/recipes";
import { createEntry } from "../actions/favoriteRecipes";
import SubstitutePopup from "./SubstitutePopup";
import Popup from "./Popup";

class RecipeCard extends React.Component {
  constructor() {
    super();
    this.state = {
      calories: "",
      carbs: "",
      fat: "",
      protein: "",
      error: "",
      showAddMealPopup: false,
      showSubstitutePopup: false,
      showMessage: false,
      showFavoritesMessage: false,
    };
  }

  favoriteRecipe = (e) => {
    e.preventDefault();
    console.log(e.target);
    const name = this.props.recipe.title;
    const image = this.props.recipe.image;
    const ingredients = this.props.recipe.extendedIngredients.map((ing) => {
      return ing.original;
    });
    const directions = this.props.recipe.analyzedInstructions[0]
      ? this.props.recipe.analyzedInstructions[0].steps.map((step) => {
          return step.steps;
        })
      : "Sorry, but at this time we are still gathering the directions.";
    const fat = this.state.fat;
    const calories = this.state.calories;
    const carbs = this.state.carbs;
    const protein = this.state.protein;
    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        image: image,
        ingredients: ingredients,
        directions: directions,
        recipe_id: this.props.match.params.id,
        fat: fat,
        carbs: carbs,
        protein: protein,
        calories: calories,
        user_id: this.props.currentUser.id,
      }),
    };
    fetch("http://localhost:3000/recipes", reqObj)
      .then((resp) => resp.json())
      .then((newEntry) => {
        if (newEntry.error) {
          this.setState({
            error: newEntry.error,
          });
        } else {
          this.showFavoritesMessage();
          this.props.createEntry(newEntry);
        }
        this.setState({
          name: "",
          fat: "",
          carbs: "",
          protein: "",
          calories: "",
        });
      });
  };

  toggleSubstitutePopup = () => {
    this.setState({
      showSubstitutePopup: !this.state.showSubstitutePopup,
    });
  };

  toggleAddMealPopup = () => {
    this.setState({
      showAddMealPopup: !this.state.showAddMealPopup,
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

  showFavoritesMessage = () => {
    this.setState({
      showFavoritesMessage: true,
    });
    setTimeout(() => {
      this.setState({ showFavoritesMessage: false });
    }, 3000);
  };

  componentDidMount() {
    const id = parseInt(this.props.match.params.id);
    if (!this.props.recipe) {
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
          this.props.viewRecipe(recipeInfo);
        });
    }
  }

  renderNutrition = (id) => {
    fetch(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/nutritionWidget.json`,
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
      .then((nutritionInfo) => {
        this.props.nutritionRecipe(nutritionInfo);
        this.setState({
          calories: nutritionInfo.calories,
          carbs: nutritionInfo.carbs,
          fat: nutritionInfo.fat,
          protein: nutritionInfo.protein,
        });
      });
  };

  render() {
    return (
      <div>
        {this.props.recipe ? (
          <div>
            <div>
              <div style={{ left: 0 }}>
                <Button
                  onClick={() => this.props.history.goBack()}
                  style={{
                    marginTop: "12vh",
                    marginBottom: "0px",
                    marginLeft: "3vh",
                    float: "left",
                  }}
                >
                  Go Back
                </Button>
                <div style={{ paddingTop: "120px" }}>
                  <Grid style={{ justifyContent: "center" }}>
                    <Grid.Row>
                      {this.state.showMessage ? (
                        <Message
                          style={{ fontSize: "2vh" }}
                          success
                          header="Your Meal Submission Was Successful!"
                        />
                      ) : null}
                      {this.state.showFavoritesMessage ? (
                        <Message
                          style={{ fontSize: "2vh" }}
                          success
                          header="You Successfully Added This Meal To Your Favorites!"
                        />
                      ) : null}
                      <p
                        style={{
                          paddingRight: "20vh",
                          fontSize: "7vh",
                          fontFamily: "sans-serif",
                          fontWeight: "lighter",
                        }}
                      >
                        {this.props.recipe.title}{" "}
                      </p>
                    </Grid.Row>
                    <Grid.Row>
                      <Image
                        src={this.props.recipe.image}
                        style={{
                          height: "auto",
                          width: "auto",
                          display: "inline",
                          marginLeft: "auto",
                          marginRight: "auto",
                        }}
                      />
                      <div
                        style={{
                          marginRight: "22vh",
                          justifyContent: "center",
                          height: "51vh",
                        }}
                      >
                        <Button
                          style={{
                            width: "100%",
                            color: "rgb(158, 65, 161)",
                            marginBottom: "1vh",
                          }}
                          onClick={this.toggleAddMealPopup}
                        >
                          Add this recipe to your meal diary?
                        </Button>
                        <br></br>
                        <Button
                          animated
                          onClick={this.favoriteRecipe}
                          style={{ width: "100%", color: "red" }}
                        >
                          <Button.Content visible>
                            Add To Favorites
                          </Button.Content>
                          <Button.Content hidden>
                            <Icon name="red heart" />
                          </Button.Content>
                        </Button>
                        <p style={{ marginBottom: "1.5vh" }}></p>
                        {this.state.showAddMealPopup ? (
                          <Popup
                            closePopup={this.toggleAddMealPopup}
                            showMessage={this.showMessage}
                          />
                        ) : null}
                        {this.state.showSubstitutePopup ? (
                          <SubstitutePopup
                            closePopup={this.toggleSubstitutePopup}
                          />
                        ) : null}
                        <div
                          style={{
                            marginBottom: "1vh",
                            padding: "1vh",
                            justifyContent: "center",
                            border: "1px dotted black",
                            textAlign: "center",
                            height: "22vh",
                            color: "black",
                            fontSize: "1.8vh",
                          }}
                        >
                          <p>
                            Total Cook and Prep Time:{" "}
                            {this.props.recipe.readyInMinutes} Min
                          </p>
                          <p>Servings: {this.props.recipe.servings}</p>
                          <p>
                            Health Score: {this.props.recipe.healthScore}/100
                          </p>
                          <p>
                            Weight Watcher Smart Points:{" "}
                            {this.props.recipe.weightWatcherSmartPoints}
                          </p>

                          <ul
                            style={{
                              listStyleType: "none",
                              fontSize: "1.2vh",
                              justifyContent: "center",
                            }}
                          >
                            {this.props.recipe.diets.map((diet) => {
                              if (diet === "gluten free") {
                                return (
                                  <li
                                    style={{
                                      border: "1px solid black",
                                      borderRadius: "25px",
                                      width: "20px",
                                      float: "left",
                                      display: "block",
                                      margin: "1px",
                                    }}
                                  >
                                    GF
                                  </li>
                                );
                              } else if (diet === "dairy free") {
                                return (
                                  <li
                                    style={{
                                      border: "1px solid black",
                                      borderRadius: "25px",
                                      width: "20px",
                                      float: "left",
                                      display: "block",
                                      margin: "1px",
                                    }}
                                  >
                                    DF
                                  </li>
                                );
                              } else if (diet === "vegan") {
                                return (
                                  <li
                                    style={{
                                      border: "1px solid black",
                                      borderRadius: "25px",
                                      width: "20px",
                                      float: "left",
                                      display: "block",
                                      margin: "1px",
                                    }}
                                  >
                                    V
                                  </li>
                                );
                              } else if (diet === "lacto ovo vegetarian") {
                                return (
                                  <li
                                    style={{
                                      border: "1px solid black",
                                      borderRadius: "25px",
                                      width: "20px",
                                      float: "left",
                                      display: "block",
                                      margin: "1px",
                                    }}
                                  >
                                    VG
                                  </li>
                                );
                              } else if (diet === "primal") {
                                return (
                                  <li
                                    style={{
                                      border: "1px solid black",
                                      borderRadius: "25px",
                                      width: "35px",
                                      float: "left",
                                      display: "block",
                                      margin: "1px",
                                    }}
                                  >
                                    Primal
                                  </li>
                                );
                              } else if (diet === "paleolithic") {
                                return (
                                  <li
                                    style={{
                                      border: "1px solid black",
                                      borderRadius: "25px",
                                      width: "35px",
                                      float: "left",
                                      display: "block",
                                      margin: "1px",
                                    }}
                                  >
                                    Paleo
                                  </li>
                                );
                              } else if (diet === "pescatarian") {
                                return (
                                  <li
                                    style={{
                                      border: "1px solid black",
                                      borderRadius: "25px",
                                      width: "35px",
                                      float: "left",
                                      display: "block",
                                      margin: "1px",
                                    }}
                                  >
                                    PESC
                                  </li>
                                );
                              } else {
                                return (
                                  <li
                                    style={{
                                      border: "1px solid black",
                                      borderRadius: "25px",
                                      width: "35px",
                                      float: "left",
                                      display: "block",
                                      margin: "1px",
                                    }}
                                  >
                                    {diet}.{" "}
                                  </li>
                                );
                              }
                            })}
                          </ul>
                        </div>
                        <div>
                          <Grid.Row>
                            <div
                              style={{
                                padding: "1vh",
                                display: "inline",
                                float: "left",
                                border: "1px dotted black",
                                textAlign: "center",
                                height: "16vh",
                                width: "100%",
                                color: "black",
                                fontSize: "2vh",
                              }}
                            >
                              <p style={{ fontSize: "2vh" }}>Nutrition Facts</p>
                              <p>
                                {this.renderNutrition(this.props.recipe.id)}
                              </p>
                              <p style={{ fontSize: "1.6vh" }}>
                                Calories: {this.state.calories}
                                <br></br>
                                Carbs: {this.state.carbs}
                                <br></br>
                                Fat: {this.state.fat}
                                <br></br>Protein: {this.state.protein}
                              </p>
                            </div>
                          </Grid.Row>
                        </div>
                      </div>
                    </Grid.Row>
                  </Grid>
                </div>

                <Grid>
                  <Grid.Row>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        height: "80vh",
                        paddingTop: "5vh",
                      }}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          display: "inline",
                          margin: "1vh",
                          width: "40%",
                          overflowY: "scroll",
                          msOverflowStyle: "hidden",
                        }}
                      >
                        <p style={{ fontSize: "3vh" }}>Ingredients</p>
                        <Button
                          style={{ width: "50%", color: "rgb(47, 47, 209)" }}
                          onClick={this.toggleSubstitutePopup}
                        >
                          Need to Substitute an Ingredient?
                        </Button>
                        <p>
                          <ul
                            style={{
                              textAlign: "center",
                              fontSize: "2.5vh",
                              listStyleType: "none",
                            }}
                          >
                            {this.props.recipe.extendedIngredients.map(
                              (ing) => {
                                return <li>{ing.original}</li>;
                              }
                            )}
                          </ul>
                        </p>
                      </div>
                      <div
                        style={{
                          display: "inline",
                          margin: "1vh",
                          width: "40%",
                          overflowY: "scroll",
                        }}
                      >
                        <p style={{ fontSize: "3vh" }}>Directions</p>
                        <p>
                          <ol style={{ textAlign: "left", fontSize: "2.5vh" }}>
                            {this.props.recipe.analyzedInstructions[0] ? (
                              this.props.recipe.analyzedInstructions[0].steps.map(
                                (step) => {
                                  return <li>{step.step}</li>;
                                }
                              )
                            ) : (
                              <li>
                                Sorry, but at this time we are still gathering
                                the directions.
                              </li>
                            )}
                          </ol>
                        </p>
                      </div>
                    </div>
                  </Grid.Row>
                </Grid>

                <div class="ui hidden divider"></div>
                <div class="ui divider"></div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recipe: state.recipe,
    currentUser: state.currentUser,
  };
};

const mapDispatchToProps = {
  viewRecipe: viewRecipe,
  nutritionRecipe: nutritionRecipe,
  createEntry: createEntry,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeCard);
