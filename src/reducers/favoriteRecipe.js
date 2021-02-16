const favoriteRecipe = (state = [], action) => {
  let updatedFavoriteRecipe;

  switch (action.type) {
    case "LOGIN_SUCCESS":
    case "CURRENT_USER":
    case "CREATE_USER":
      return action.user.recipes;
    case "DELETE_ENTRY":
      updatedFavoriteRecipe = state.filter((entry) => entry.id !== action.id);
      return updatedFavoriteRecipe;
    case "CREATE_ENTRY":
      updatedFavoriteRecipe = [...state, action.entry];
      return updatedFavoriteRecipe;

    default:
      return state;
  }
};

export default favoriteRecipe;
