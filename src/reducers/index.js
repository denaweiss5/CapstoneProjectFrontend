import { combineReducers } from 'redux'
import currentUserReducer from './currentUser'
import exerciseEntriesReducer from './exerciseEntries'
import mealEntriesReducer from './mealEntries'
import weightEntriesReducer from './weightEntries'
import recipesReducer from './recipes'
import viewRecipeReducer from './viewRecipe'


export default combineReducers({
    currentUser: currentUserReducer,
    weightEntries: weightEntriesReducer,
    mealEntries: mealEntriesReducer,
    exerciseEntries: exerciseEntriesReducer,
    recipes: recipesReducer,
    recipe: viewRecipeReducer,

  })