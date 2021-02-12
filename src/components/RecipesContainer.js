import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import Recipes from './Recipes';
import { findRecipes } from '../actions/recipes'
import { connect } from 'react-redux'


class RecipesContainer extends React.Component{



    renderRecipes = (e) => {
        const query = e.target.innerText
        fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex?limitLicense=true&offset=0&number=36&query=${query}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "d6d30feb34msh027ba22c7ad5d85p111652jsn5e503987bf98",
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
            }
        })
        .then(resp => resp.json())
        .then(recipesArr => {
            const recipes = recipesArr.results.map(recipe => {
                return recipe
            })
            this.props.findRecipes(recipes)
            this.props.history.push(`/all_recipes/${query}`)
        })
    }



    render(){

        return (

            <div >
                 
                <Grid >
                <Grid.Row  columns={4}>
                <Grid.Column >
                <Button className='recipesgrid' size='massive' content='Low Calorie' style={{ border: '3px solid rgb(202, 49, 49)', height:'28vh', width:'18vw', color: 'black', backgroundColor: 'white', boxShadow: '10px 10px 8px rgb(202, 49, 49)'}} onClick={this.renderRecipes}/>
                </Grid.Column>
                <Grid.Column>
                <Button className='recipesgrid'  size='massive' content='Low Carb' style={{  border: '3px solid rgb(179, 50, 168)', height:'28vh', width:'18vw', color: 'black', backgroundColor: 'white', boxShadow: '10px 10px 8px rgb(179, 50, 168)'}} onClick={this.renderRecipes}/>
                </Grid.Column>
                <Grid.Column>
                <Button className='recipesgrid'  size='massive' content='Low Fat' style={{ border: '3px solid rgb(121, 50, 179)', height:'28vh', width:'18vw', color: 'black', backgroundColor: 'white', boxShadow: '10px 10px 8px rgb(121, 50, 179)'}} onClick={this.renderRecipes}/>
                </Grid.Column>
                <Grid.Column>
                <Button className='recipesgrid'  size='massive' content='High Protein' style={{ border: '3px solid rgb(47, 47, 209)',height:'28vh', width:'18vw', color: 'black', backgroundColor: 'white', boxShadow: '10px 10px 8px rgb(47, 47, 209)'}} onClick={this.renderRecipes}/>
                </Grid.Column>
                </Grid.Row>
                <Grid.Row  columns={4}>
               
                <Grid.Column>
                <Button className='recipesgrid'   size='massive' content='Vegan' style={{border: `3px solid rgb(202, 49, 49)`, height:'28vh', width:'18vw', color: 'black', backgroundColor: 'white', boxShadow: '10px 10px 8px rgb(202, 49, 49)'}} onClick={this.renderRecipes}/>
                </Grid.Column>
                <Grid.Column>
                <Button className='recipesgrid'  size='massive' content='Vegetarian' style={{border: '3px solid rgb(179, 50, 168)', height:'28vh', width:'18vw', color: 'black', backgroundColor: 'white', boxShadow: '10px 10px 8px rgb(179, 50, 168)'}} onClick={this.renderRecipes}/>
                </Grid.Column>
                <Grid.Column>
                <Button className='recipesgrid'  size='massive' content='Gluten Free' style={{border: '3px solid rgb(121, 50, 179)', height:'28vh', width:'18vw', color: 'black', backgroundColor: 'white', boxShadow: '10px 10px 8px rgb(121, 50, 179)'}} onClick={this.renderRecipes}/>
                </Grid.Column>
                <Grid.Column>
                <Button className='recipesgrid'  size='massive' content='Dairy Free' style={{border: '3px solid rgb(47, 47, 209)', height:'28vh', width:'18vw', color: 'black', backgroundColor: 'white', boxShadow: '10px 10px 8px rgb(47, 47, 209)'}} onClick={this.renderRecipes}/>
                </Grid.Column>
                </Grid.Row>
                </Grid>
              
                
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
    recipes: state.recipes
    }
}

const mapDispatchToProps = {
    findRecipes: findRecipes
  }

export default connect(mapStateToProps ,mapDispatchToProps)(RecipesContainer);

