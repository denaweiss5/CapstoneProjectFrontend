import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { connect } from "react-redux";

class RecipeCard extends React.Component {
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
        }
      }
    )
    .then(resp => resp.json())
    .then( data => {
        console.log(data)
    })
  };
  render() {
    const {
      id,
      image,
      analyzedInstructions,
      title,
      extendedIngredients,
      servings,
      readyInMinutes,
    } = this.props.recipe;

    return (
      <div
        style={{
          marginLeft: "180px",
        }}
      >
        <div class="ui container">
          <div class="ui padded grid">
            <div class="fifteen wide column">
              <p>{title}</p>
              <Image
                src={image}
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "50%",
                }}
              />
              <h2
                style={{
                  border: "1px solid red",
                  padding: "10px",
                  marginRight: "200px",
                  marginLeft: "200px",
                  backgroundColor: "white",
                  color: "black",
                  float: "right",
                }}
              >
                <p>Total Time: {readyInMinutes} min</p>
                <p>Servings: {servings}</p>
              </h2>
            </div>

            <div class="ui hidden divider"></div>
            <div class="ui grid">
              <div class="two column row">
                <div class="column">
                  <h1 class="ui header">Ingredients</h1>
                  <p>
                    <ul style={{ textAlign: "left" }}>
                      {extendedIngredients.map((ing) => {
                        return <li>{ing.original}</li>;
                      })}
                    </ul>
                  </p>
                </div>
                <div class="column">
                  <h1 class="ui header">Directions</h1>
                  <p>
                    <ol>
                      {analyzedInstructions[0].steps.map((step) => {
                        return <li>{step.step}</li>;
                      })}
                    </ol>
                  </p>
                </div>
              </div>
              <div class="one column row">
                <div class="column">
                  <h1 class="ui header">Nutrion Facts</h1>
                  <p>{this.renderNutrition(id)}</p>
                </div>
              </div>
            </div>
            <div class="ui hidden divider"></div>
            <div class="ui divider"></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recipe: state.recipe,
  };
};
export default connect(mapStateToProps)(RecipeCard);
