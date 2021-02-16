const weightEntries = (state = [], action) => {
  let updatedWeightEntries;
  switch (action.type) {
    case "LOGIN_SUCCESS":
    case "CURRENT_USER":
    case "CREATE_USER":
      return action.user.weight_entries;
    case "CREATE_ENTRY":
      updatedWeightEntries = [...state, action.entry];
      return updatedWeightEntries;
    case "DELETE_ENTRY":
      updatedWeightEntries = state.filter((entry) => entry.id !== action.id);
      return updatedWeightEntries;
    default:
      return state;
  }
};

export default weightEntries;
