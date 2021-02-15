import React from "react";
import { Button, Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { Card, Icon, Image } from "semantic-ui-react";
import RecipeCard from "./RecipeCard";
import { findRecipes, viewRecipe } from "../actions/recipes";

class Recipes extends React.Component {
  constructor() {
    super();

    this.state = {
      intervalId: 0
    };
  }

  componentDidMount(){

    const query = this.props.match.params.category
      if(this.props.recipes.length === 0){
        fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex?limitLicense=true&offset=0&number=25&query=${query}`, {
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
  }

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
console.log(recipeInfo)
        this.props.viewRecipe(recipeInfo);
        this.props.history.push(`/show_recipes/${id}`);
      });
  };


  renderCard = (recipe) => {

    const { title, image, id } = recipe;
    return (
      <Card
        onClick={() => this.handleClick(id)}
  
        style={{
          padding: "10px",
          height: '50vh',
          width: '20vw',
          margin: "1vh"
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
          <Card.Header style={{fontSize: '3vh', fontFamily: 'sans-serif', fontWeight: 'lighter'}}>{title}</Card.Header>
        </Card.Content>
      </Card>
    );
  };

  scrollStep = () => {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  };

  scrollToTop = () => {
    let intervalId = setInterval(
      this.scrollStep.bind(this),
      this.props.delayInMs
    );
    this.setState({ intervalId: intervalId });
  };

  render() {
    return (
      <div>
      
      <Button
          onClick={() => this.props.history.push('/recipes')}
          style={{marginTop: '12vh', marginBottom: '0px', marginLeft: '3vh', float:'left'}}
        >
          Back To All Categories
        </Button>
        <br></br>
        <br></br>
        <br></br>
        <div
          style={{
            paddingLeft: '9%',
            paddingTop: "100px"
          }}
        >
      
          <Grid >
            <Grid.Row >
              
              {this.props.recipes.length > 0 ?
              this.props.recipes.map((recipe) => {
                return this.renderCard(recipe);
              })
              :
              <p>No Recipes Found. Please Consider Searching For New Ones</p>
            }
            </Grid.Row>
          </Grid>
          {this.props.recipes.length > 0 ?
          <Button
            style={{
              float: "right",
              marginBottom: "15px",
              marginRight: "15px",
              padding: "15px",
            }}
            icon="angle double up"
            title="Back to top"
            className="scroll"
            onClick={() => {
              this.scrollToTop();
            }}
          ></Button>
    :
    null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes,
  };
};

const mapDispatchToProps = {
  viewRecipe: viewRecipe,
  findRecipes: findRecipes
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
