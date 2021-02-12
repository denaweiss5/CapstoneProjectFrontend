import { combineReducers } from 'redux'
import currentUserReducer from './currentUser'
import exerciseEntriesReducer from './exerciseEntries'
import mealEntriesReducer from './mealEntries'
import weightEntriesReducer from './weightEntries'
import recipesReducer from './recipes'
import viewRecipeReducer from './viewRecipe'
import mealCaloriesReducer from './mealCalories'
import exerciseCaloriesReducer from './exerciseCalories'
import specificMealsReducer from './specificMeals'
import specificExercisesReducer from './specificExercises'


export default combineReducers({
    currentUser: currentUserReducer,
    weightEntries: weightEntriesReducer,
    mealEntries: mealEntriesReducer,
    exerciseEntries: exerciseEntriesReducer,
    recipes: recipesReducer,
    recipe: viewRecipeReducer,
    mealCalories: mealCaloriesReducer,
    exerciseCalories: exerciseCaloriesReducer,
    specificMeals: specificMealsReducer,
    specificExercises: specificExercisesReducer
  })