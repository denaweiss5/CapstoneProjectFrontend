import './App.css';
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm'
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage'
import WeightEntriesContainer from './components/WeightEntriesContainer'
import Diaries from './components/Diaries'
import Habits from './components/Habits'
import RecipesContainer from './components/RecipesContainer'
import AccountInfo from './components/AccountInfo'
import Recipes from './components/Recipes'
import RecipeCard from './components/RecipeCard';
import history from './history'

class App extends React.Component {


  render(){
    return (
      <BrowserRouter history={history}>
      <div className="App">
        <header className="App-header">
     
          <Navbar/>
          
          <Switch>
          <Route component={AccountInfo} path='/account_info' />
          <Route component={HomePage} path='/home'/>
          <Route component={LoginForm} path='/login'/>
          <Route component={RegisterForm} path='/register'/>
          <Route component={WeightEntriesContainer} path='/myWeightJourney' />
          <Route component={Diaries} path='/myDiaries'/>
          <Route component={Habits} path='/myHabits'/>
          <Route component={(props) => <RecipesContainer {...props}/>} path='/recipes' />
          <Route component={(props) => <Recipes {...props}/>}path='/myRecipes' />
          <Route component={RecipeCard} path='/show_recipe' />
          <Route component={LandingPage} path='/'/>

          </Switch>
        </header>
      </div>
      </BrowserRouter>
    );
  }  
}





export default App;