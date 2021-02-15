import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
import WeightEntriesContainer from "./components/WeightEntriesContainer";
import Diaries from "./components/Diaries";

import RecipesContainer from "./components/RecipesContainer";
import AccountInfo from "./components/AccountInfo";
import Recipes from "./components/Recipes";
import RecipeCard from "./components/RecipeCard";
import history from "./history";
import MealEntriesContainer from "./components/MealEntriesContainer";
import { connect } from "react-redux";
import { currentUser } from "./actions/auth";
import FavoriteRecipes from "./components/FavoriteRecipes";




class App extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem("jwt_token");

    if (!token) {
      this.props.history.push("/");
    } else {
      const reqObj = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        },
      };
      fetch("http://localhost:3000/current_user", reqObj)
        .then((resp) => resp.json())
        .then((data) => {
          this.props.currentUser(data.user);
        });
    }
  }

  render() {
    return (
      <BrowserRouter history={history}>
        <div className="App">
          <header className="App-header">
            <Navbar/>
            <Switch>
    
              <Route component={AccountInfo} path="/account_info" />
              <Route component={HomePage} path="/home" />
              <Route component={LoginForm} path="/login" />
              <Route component={RegisterForm} path="/register" />
              <Route
                component={WeightEntriesContainer}
                path="/myWeightJourney"
              />
              <Route component={Diaries} path="/myDiaries" />
              <Route
                component={(props) => <RecipesContainer {...props} />}
                path="/recipes"
              />
              <Route
                component={(props) => <Recipes {...props} />}
                path="/all_recipes/:category"
              />
              <Route component={RecipeCard} path="/show_recipes/:id" />
              <Route component={FavoriteRecipes} path="/favorite_recipes" />
                <Route component={LandingPage} path="/" />
              
              <Route
                component={(props) => <MealEntriesContainer {...props} />}
                path="/myMeals"
              />
            </Switch>
          </header>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  };
};

const mapDispatchToProps = {
  currentUser: currentUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
