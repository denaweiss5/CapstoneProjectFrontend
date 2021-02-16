const specificMeals = (state = [], action) => {
  switch (action.type) {
    case "SPECIFIED_MEAL":
      return action.entries;
    default:
      return state;
  }
};

export default specificMeals;
