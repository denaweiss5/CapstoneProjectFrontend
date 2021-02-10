import React from "react";
import { connect } from "react-redux";
import { Dropdown, Form, Input } from "semantic-ui-react";
import { Divider, Grid, Menu } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { viewRecipe } from "../actions/recipes";
import { withRouter } from 'react-router-dom'

class SearchBar extends React.Component {
  constructor() {
    super();

    this.state = {
      keyword: "",
      showOptions: false,
      results: [],
    };
  }

  toggleOptions = () => {
    this.setState({
      showOptions: !this.state.showOptions,
    });
  };

  handleChange = (e, ) => {
    this.setState({
      keyword: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const query = this.state.keyword;
    console.log(query)

    fetch(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=${query}`,
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
      .then((recipeArr) => {
        this.setState({
          results: recipeArr.results,
        });
 
        this.toggleOptions();
        
      });
  };

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
        this.props.history.push(`/show_recipe/${id}`);
      });
  };

// componentDidMount(){
//     let initialResults = []
//     fetch(
//               `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=${query}`,
//               {
//                 method: "GET",
//                 headers: {
//                   "x-rapidapi-key":
//                     "d6d30feb34msh027ba22c7ad5d85p111652jsn5e503987bf98",
//                   "x-rapidapi-host":
//                     "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
//                 },
//               }
//             )
//               .then((resp) => resp.json())
//               .then((recipeArr) => {
//                 this.setState({
//                   results: recipeArr.results,
//                 })
                
//               });

// }

render() {
    return (
      <div className='SB' >
        {this.props.currentUser ? (
          <div >
            <Form onSubmit={this.handleSubmit} >
              <Input
                icon="search"
                name="keyword"
                placeholder="Search"
                value={this.state.keyword}
                onChange={this.handleChange}
              />
            </Form>
            {this.state.showOptions ? (
    
              <ul 
                style={{
                  width: "250px",
                  height: "250px",
                  backgroundColor: "white",
                  overflowY: "scroll",
                  listStyleType: "none",
                  padding: "7px",
                  textAlign: "left",
                }}
              >
                 
                {this.state.results.map((result) => {
                  return (
                    
                    <li
                    onClick={() => this.handleClick(result.id)}
                    className='sb-options'
                      style={{
                        color: "black",
                        fontSize: "15px",
                        fontFamily: "revert",
                        borderBottom: "1px solid grey",
                        padding: "10px",
                      }}
                    >
                      {result.title}
                    </li>
          
                  );
                })}

              </ul>
          
            ) : null}
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
    viewRecipe: viewRecipe,
  };

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchBar));
