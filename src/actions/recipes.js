export const findRecipes = (recipesArr) => {
  return {
    type: "SHOW_RECIPES",
    recipes: recipesArr,
  };
};

export const viewRecipe = (recipeInfo) => {
  return {
    type: "VIEW_RECIPE",
    recipe: recipeInfo,
  };
};

export const nutritionRecipe = (recipeNutritionInfo) => {
  return {
    type: "NUTRITION_RECIPE",
    recipeInfo: recipeNutritionInfo,
  };
};

export const randomRecipe = (recipeInfo) => {
  return {
    type: "RANDOM_RECIPE",
    randomRecipe: recipeInfo,
  };
};
