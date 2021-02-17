const randomRecipe = (state = null, action) => {
  switch (action.type) {
    case "RANDOM_RECIPE":
      return action.randomRecipe;
    default:
      return state;
  }
};

export default randomRecipe;
