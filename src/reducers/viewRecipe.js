const viewRecipe = (state = null, action) => {
  switch (action.type) {
    case "VIEW_RECIPE":
      return action.recipe;
    default:
      return state;
  }
};

export default viewRecipe;
