const specificExercises = (state = [], action) => {
  switch (action.type) {
    case "SPECIFIED_EXERCISE":
      return action.entries;
    default:
      return state;
  }
};

export default specificExercises;
