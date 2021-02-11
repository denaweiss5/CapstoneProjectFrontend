import React from "react";
import { Button, Grid, Card, Icon, Image, ModalDescription } from "semantic-ui-react";
import { connect } from "react-redux";
import { viewRecipe } from "../actions/recipes";


class RecipeCard extends React.Component {

    constructor(){
        super()
        this.state = {
            calories: '',
            carbs: '',
            fat: '',
            protein: ''
        }
    }
//// grab id from url and redo fetch
    componentDidMount(){
       const id = parseInt(this.props.match.params.id)
        if(!this.props.recipe){
        fetch(
            `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`,
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
        }
      }
    )
    .then(resp => resp.json())
    .then(nutritionInfo => {
        this.setState({
            calories: nutritionInfo.calories,
            carbs: nutritionInfo.carbs,
            fat: nutritionInfo.fat,
            protein: nutritionInfo.protein
        })
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
      <div >
        <div>
          <div >
            <div >
                <Button  onClick={()=>this.props.history.goBack()}  
                style={{marginTop: "12vh", marginBottom: '0px', marginLeft: '3vh', float: 'left'}}>Back To All Recipes</Button>
              <div style={{ paddingTop: '120px', textAlign: 'center'}}>
              <Grid > 
                <Grid.Row>
              <p style={{marginLeft:'28%'}}>{title} </p>
              
              <Image
                src={image}
                style={{
                  paddingLeft: '2vh',
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto'
                }}
              />
              
              </Grid.Row>
              <Grid.Row style={{display: 'block', marginLeft: '90vh'}}>
              <div style={{  border: '2px solid black', textAlign:'center', width:'300px', backgroundColor: 'white', color: 'black', }}>
            <p>Total Time: {readyInMinutes} min</p>
            <p>servings: {servings}</p>
           
              </div>
              </Grid.Row>
              <br></br>
              
              </Grid>
              </div>
            
            

            <div class="ui hidden divider"></div>
            <div class="ui grid">
              <div class="two column row">
                <div class="column">
                  <h1 style={{ marginRight:'400px', fontSize:'25px' }} class="ui header">Ingredients</h1>
                  <p>
                    <ul style={{ textAlign: "left", fontSize:'20px' }}>
                      {extendedIngredients.map((ing) => {
                        return <li>{ing.original}</li>;
                      })}
                    </ul>
                  </p>
                </div>
                <div class="column">
                  <h1 style={{ marginRight:'400px', fontSize:'25px' }} class="ui header">Directions</h1>
                  <p>
                    <ol style={{ textAlign: "left", fontSize:'20px'  }}>
                      {analyzedInstructions[0] ? 
                      analyzedInstructions[0].steps.map((step) => {
                        return <li>{step.step}</li>;
                      }) : 
                        <li>Sorry, but at this time we are still gathering the directions.</li>
                    }
                    </ol>
                  </p>
                </div>
              </div>
              <div >
                <div class="column" style={{marginLeft:'50px'}}>
                  <h1 style={{  fontSize:'25px' }} class="ui header">Nutrion Facts</h1>
                  <p>{this.renderNutrition(id)}</p>
                    <h3 style={{  fontSize:'20px', fontFamily: "serif" }} >Calories: {this.state.calories}</h3>
                    <h3 style={{  fontSize:'20px', fontFamily: "serif" }}>Carbs: {this.state.carbs}</h3>
                    <h3 style={{  fontSize:'20px', fontFamily: "serif" }}>Fat: {this.state.fat}</h3>
                    <h3 style={{  fontSize:'20px', fontFamily: "serif" }}>Protein: {this.state.protein}</h3>
                </div>
              </div>
            </div>
            <div class="ui hidden divider"></div>
            <div class="ui divider"></div>
          </div>
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

const mapDispatchToProps = {
    viewRecipe: viewRecipe
  };
  

export default connect(mapStateToProps, mapDispatchToProps)(RecipeCard);
