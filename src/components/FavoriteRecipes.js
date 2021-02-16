import React from "react";
import { connect } from "react-redux";
import { Button, Grid , Card, Image} from "semantic-ui-react";
import { deleteEntry } from '../actions/favoriteRecipes'
import { viewRecipe } from "../actions/recipes";
import nutritionInfo from "../reducers/nutritionInfo";


class FavoriteRecipes extends React.Component {

    constructor(){
        super()

        this.state={
            name: '',
            fat: '',
            carbs: '',
            protein: '',
            calories: '',
            instructions: '',
            ingredients: '',
            error: ''
        }
    }

 

    handleDelete = (id) => {
        fetch(`http://localhost:3000/recipes/${id}`, {
            method: 'DELETE'
        })
        .then(resp => resp.json())
        .then(data => {
            this.props.deleteEntry(id)
        })
    }

    renderCard = (recipe) => {

        const { name, id, recipe_id, image, calories, carbs, fat, protein} = recipe;
        return (
          <Card
            onClick={() => this.handleClick(recipe_id)}
      
            style={{
              padding: "10px",
              height: '60vh',
              marginTop: "10vh",
              marginRight: '1vh',
              marginLeft: '1vh'
            }}
          >
            <Image
              src={image}
              wrapped
              ui={false}
              style={{
                height: "auto",
                width: "auto",
              }}
            />
            <Card.Content>
              <Card.Header style={{fontSize: '2.5vh', fontFamily: 'sans-serif', fontWeight: 'lighter'}}>{name}</Card.Header>
            </Card.Content>
   
              <p style={{fontSize: '1.5vh', fontFamily: 'sans-serif', fontWeight: 'lighter', color:'black'}}>Calories: {calories}</p>


              <p style={{fontSize: '1.5vh', fontFamily: 'sans-serif', fontWeight: 'lighter', color:'black'}}>Carbs: {carbs}g</p>
 
   
              <p style={{fontSize: '1.5vh', fontFamily: 'sans-serif', fontWeight: 'lighter', color:'black'}}>Fat: {fat}g</p>

   
              <p style={{fontSize: '1.5vh', fontFamily: 'sans-serif', fontWeight: 'lighter', color:'black'}}>Protein: {protein}g</p>
   
            <Button style={{ backgroundColor: 'white'}} icon='trash' onClick={() => this.handleDelete(id)}></Button>
          </Card>
        );
      };


  handleClick = (recipe_id) => {
    fetch(
        `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipe_id}/information`,
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
          this.props.history.push(`/show_recipes/${recipe_id}`);
        });
    };

    render(){

        return(
            <div>
                <Grid >
            <Grid.Row style={{width: '100%', margin: '5vh', justifyContent: 'center'}}>
              
              {this.props.favoriteRecipe.length > 0 ?
              this.props.favoriteRecipe.map((recipe) => {
                return this.renderCard(recipe);
              })
              :
              <p>No Recipes Found. Please Consider Searching For New Ones</p>
            }
            </Grid.Row>
          </Grid>
            </div>
        )
    }
}
const mapDispatchToProps = {
   deleteEntry: deleteEntry,
   viewRecipe: viewRecipe
}
const mapStateToProps = (state) => {
    return {
        favoriteRecipe: state.favoriteRecipe,
        nutritionInfo: state.nutritionInfo
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FavoriteRecipes)