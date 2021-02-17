const nutritionInfo = (state = null, action) => {
  switch (action.type) {
    case "NUTRITION_RECIPE":
      return action.recipeInfo;
    default:
      return state;
  }
};

export default nutritionInfo;
