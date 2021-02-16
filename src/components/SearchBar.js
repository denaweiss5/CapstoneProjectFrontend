import React from "react";
import { connect } from "react-redux";
import { Form, Input } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { findRecipes } from "../actions/recipes";
import { withRouter } from "react-router-dom";

class SearchBar extends React.Component {
  constructor() {
    super();

    this.state = {
      keyword: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      keyword: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const query = this.state.keyword;

    fetch(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex?limitLicense=true&offset=0&number=36&query=${query}`,
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
      .then((recipesArr) => {
        const recipes = recipesArr.results.map((recipe) => {
          return recipe;
        });
        this.props.findRecipes(recipes);
        this.props.history.push(`/all_recipes/${query}`);
      });
    this.setState({ keyword: "" });
  };

  render() {
    
    return (
      <div className="SB">
        {this.props.currentUser ? (
          <div>
            <Form onSubmit={this.handleSubmit}>
              <Input
                icon="search"
                name="keyword"
                placeholder="Search Recipes..."
                value={this.state.keyword}
                onChange={this.handleChange}
              />
            </Form>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  };
};

const mapDispatchToProps = {
  findRecipes: findRecipes,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SearchBar));
