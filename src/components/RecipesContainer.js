import React from 'react'
import { Button, Grid } from 'semantic-ui-react'
import Recipes from './Recipes'

class RecipesContainer extends React.Component{

    renderRecipes = (e) => {
        const name = e.target.innerText
        fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=${name}&number=10&offset=0`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "d6d30feb34msh027ba22c7ad5d85p111652jsn5e503987bf98",
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
            }
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data.results)
            <Recipes dat/>
            this.props.history.push('/recipes')
            
        })
        
    }

    render(){
        return (
            <div>
              
                <Grid className='recipesgrid'>
                <Grid.Row  columns={3}>
                <Grid.Column >
                <Button circular color='white' size='massive' content='Low Calories' style={{height:'175px', width:'175px', color: 'black'}} onClick={this.renderRecipes}/>
                </Grid.Column>
                <Grid.Column>
                <Button circular color='white' size='massive' content='Low Carbs' style={{height:'175px', width:'175px', color: 'black'}} onClick={this.renderRecipes}/>
                </Grid.Column>
                <Grid.Column>
                <Button circular color='white' size='massive' content='Low Fat' style={{height:'175px', width:'175px', color: 'black'}} onClick={this.renderRecipes}/>
                </Grid.Column>
                </Grid.Row>
                <Grid.Row  columns={3}>
                <Grid.Column>
                <Button circular color='white' size='massive' content='High Protein' style={{height:'175px', width:'175px', color: 'black'}} onClick={this.renderRecipes}/>
                </Grid.Column>
                <Grid.Column>
                <Button circular color='white' size='massive' content='Ingredient substitutes' style={{height:'175px', width:'175px', color: 'black'}} onClick={this.renderRecipes}/>
                </Grid.Column>
                <Grid.Column>
                <Button circular color='white' size='massive' content='Vegan' style={{height:'175px', width:'175px', color: 'black'}} onClick={this.renderRecipes}/>
                </Grid.Column>
                </Grid.Row>
                <Grid.Row  columns={3}>
                <Grid.Column>
                <Button circular color='white' size='massive' content='Vegetarian' style={{height:'175px', width:'175px', color: 'black'}} onClick={this.renderRecipes}/>
                </Grid.Column>
                <Grid.Column>
                <Button circular color='white' size='massive' content='Gluten Free' style={{height:'175px', width:'175px', color: 'black'}} onClick={this.renderRecipes}/>
                </Grid.Column>
                <Grid.Column>
                <Button circular color='white' size='massive' content='Dairy Free' style={{height:'175px', width:'175px', color: 'black'}} onClick={this.renderRecipes}/>
                </Grid.Column>
                </Grid.Row>
                </Grid>
            </div>

        )
    }
}




export default RecipesContainer