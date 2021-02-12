const mealEntries = (state = [], action) => {
  let updatedMealEntries;

  switch (action.type) {
    case "LOGIN_SUCCESS":
    case "CURRENT_USER":
    case "CREATE_USER":
      return action.user.meal_entries;
    case "CREATE_ENTRY":
      updatedMealEntries = [...state, action.entry];
      return updatedMealEntries;
      case 'DELETE_ENTRY':
        updatedMealEntries = state.filter(entry => entry.id !== action.id)
        return updatedMealEntries
    default:
      return state;
  }
};

export default mealEntries;
