import SearchField from "react-search-field";
import React from 'react'
import { Image, List } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { findRecipes } from "../actions/recipes";

class SB extends React.Component{

    constructor(){
        super()
        this.state={
            showOptions: false
        }
    }

    onChange = (e) => {
        console.log(e)
    }

    onEnter = (e) => {
        console.log(e)

      fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=${e}`, {
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
       
    })
}

toggleOptions = () => {
    this.setState({
        showOptions: !this.state.showOptions
    })
}


///// on enter, render a div below the searhc bar with all the results. (dropdwon)
    render(){
        const titles = this.props.recipes.map(recipe => {
            return recipe.title
        })

        console.log(titles)
        return(
    <div>
<SearchField
  placeholder="Search..."
  onEnter={this.onEnter}
  onSearchClick={this.onEnter}
  onEnter={this.toggleOptions}
  onChange={this.onChange}
  classNames="test-class"
/>
{this.state.showOptions ? 

<List selection verticalAlign='middle'>
<List.Item>
  <Image avatar src='https://react.semantic-ui.com/images/avatar/small/helen.jpg' />
  <List.Content>
    <List.Header>Helen</List.Header>
  </List.Content>
</List.Item>
<List.Item>
  <Image avatar src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
  <List.Content>
    <List.Header>Christian</List.Header>
  </List.Content>
</List.Item>
<List.Item>
  <Image avatar src='https://react.semantic-ui.com/images/avatar/small/daniel.jpg' />
  <List.Content>
    <List.Header>Daniel</List.Header>
  </List.Content>
</List.Item>
</List>
        : 
        null
}
</div>
        )}
}


const mapStateToProps = (state) => {
    return {
    recipes: state.recipes
    }
}

const mapDispatchToProps = {
    findRecipes: findRecipes
  }

export default connect(mapStateToProps, mapDispatchToProps)(SB)