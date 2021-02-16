import { combineReducers } from "redux";
import currentUserReducer from "./currentUser";
import exerciseEntriesReducer from "./exerciseEntries";
import mealEntriesReducer from "./mealEntries";
import weightEntriesReducer from "./weightEntries";
import recipesReducer from "./recipes";
import viewRecipeReducer from "./viewRecipe";
import specificMealsReducer from "./specificMeals";
import specificExercisesReducer from "./specificExercises";
import nutritionInfoReducer from "./nutritionInfo";
import favoriteRecipeReducer from "./favoriteRecipe";
import randomRecipeReducer from "./randomRecipe";

export default combineReducers({
  currentUser: currentUserReducer,
  weightEntries: weightEntriesReducer,
  mealEntries: mealEntriesReducer,
  exerciseEntries: exerciseEntriesReducer,
  recipes: recipesReducer,
  recipe: viewRecipeReducer,
  specificMeals: specificMealsReducer,
  specificExercises: specificExercisesReducer,
  nutritionInfo: nutritionInfoReducer,
  favoriteRecipe: favoriteRecipeReducer,
  randomRecipe: randomRecipeReducer,
});
