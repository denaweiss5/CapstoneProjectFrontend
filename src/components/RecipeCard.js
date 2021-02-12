import React from "react";
import { Button, Grid, Card, Icon, Image, ModalDescription } from "semantic-ui-react";
import { connect } from "react-redux";
import { nutritionRecipe, viewRecipe } from "../actions/recipes";
import weightEntries from "../reducers/weightEntries";

import Popup from "./Popup";


class RecipeCard extends React.Component {

    constructor(){
        super()
        this.state = {
            calories: '',
            carbs: '',
            fat: '',
            protein: '',
           showPopup: false
        }
    }

    togglePopup = () => {
      this.setState({
        showPopup: !this.state.showPopup
      })
    }

  

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
     this.props.nutritionRecipe(nutritionInfo)
        this.setState({
            calories: nutritionInfo.calories,
            carbs: nutritionInfo.carbs,
            fat: nutritionInfo.fat,
            protein: nutritionInfo.protein
        })
    })
  };

  

  render() {
  
    return (
    
      <div >
        {this.props.recipe ? 
        <div>
          <div >
            <div style={{left: 0}}>
                <Button  onClick={()=>this.props.history.goBack()}  
                style={{ marginTop: "12vh", marginBottom: '0px', marginLeft: '3vh', float: 'left'}}>Back To All Recipes</Button>
              <div style={{ paddingTop: '120px'}}>
              <Grid style={{justifyContent: 'center'}}> 

                <Grid.Row >
              <p style={{ paddingRight:'20vh', fontSize: '7vh', fontFamily: 'sans-serif', fontWeight: 'lighter'}}>{this.props.recipe.title} </p>
              </Grid.Row>
              <Grid.Row >
              
              <Image
                src={this.props.recipe.image}
                style={{
                  height: 'auto',
                  width: 'auto',
                  display: 'inline',
                  marginLeft: 'auto',
                  marginRight: 'auto'
                }}
              />
              <div style={{marginRight:'22vh', justifyContent: 'center', height: '51vh'}}>
              <Button style={{ color: 'purple', marginBottom: '2vh'}} onClick={this.togglePopup}>Add this recipe to your meal diary?</Button>
              {this.state.showPopup ? 
              <Popup 
              closePopup={this.togglePopup}
                />
                :
                null
            }
              <div style={{ marginBottom:'1vh', padding: '1vh', justifyContent:'center', border: '1px dotted black',  textAlign:'center',  height:'22vh',  color: 'black', fontSize:'1.8vh'}}>
            <p>Ready In: {this.props.recipe.readyInMinutes} Min</p>
            <p>Servings: {this.props.recipe.servings}</p>
    <p>Health Score: {this.props.recipe.healthScore}</p>
    <p>Weight Watcher Smart Points: {this.props.recipe.weightWatcherSmartPoints}</p>
    
    {this.props.recipe.diets.map(diet => {
              return <p style={{display: 'inline'}}>{this.props.recipe.diet}. </p>
            })}
    
              </div>
              <div >
              <Grid.Row>
              <div style={{ padding: '1vh',   display:'inline', float: 'left', border: '1px dotted black',  textAlign:'center',  height:'21.8vh', width:'100%',  color: 'black', fontSize:'2vh'}}>
                  <p style={{  fontSize:'2vh'}} >Nutrion Facts</p>
                  <p>{this.renderNutrition(this.props.recipe.id)}</p>
                    <p style={{  fontSize:'1.8vh'}} >Calories: {this.state.calories}</p>
                    <p style={{  fontSize:'1.8vh'}}>Carbs: {this.state.carbs}</p>
                    <p style={{  fontSize:'1.8vh'}}>Fat: {this.state.fat}</p>
                    <p style={{  fontSize:'1.8vh'}}>Protein: {this.state.protein}</p>
                </div>
                
                </Grid.Row>
              </div>
              </div>
              </Grid.Row>
              </Grid>
              </div>
              
        
        
     <Grid>
       <Grid.Row>
         <div style={{ display: 'flex',  justifyContent: 'center', height: '100%', paddingTop:'5vh'}}>
                <div style={{ borderBottom: '1px outset grey', textAlign: 'center', display: 'inline',  margin: '1vh',  width: '40%', overflowY: 'scroll', msOverflowStyle: 'hidden'}}>
                  <p style={{fontSize: '3vh'}}>Ingredients</p>
                  <p>
                    <ul style={{ textAlign: 'center', fontSize:'2.5vh', listStyleType: 'none'}}>
                      {this.props.recipe.extendedIngredients.map((ing) => {
                        return <li>{ing.original}</li>;
                      })}
                    </ul>
                  </p>
                </div>
                <div style={{ borderBottom: '1px outset grey', display: 'inline',  margin: '1vh', width: '40%', overflowY: 'scroll'}}>
                  <p style={{fontSize: '3vh'}}>Directions</p>
                  <p>
                    <ol style={{ textAlign: "left", fontSize:'2.5vh'  }}>
                      {this.props.recipe.analyzedInstructions[0] ? 
                      this.props.recipe.analyzedInstructions[0].steps.map((step) => {
                        return <li>{step.step}</li>;
                      }) : 
                        <li>Sorry, but at this time we are still gathering the directions.</li>
                    }
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
      : 
      null }
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
    viewRecipe: viewRecipe, 
    nutritionRecipe: nutritionRecipe
  };
  

export default connect(mapStateToProps, mapDispatchToProps)(RecipeCard);
