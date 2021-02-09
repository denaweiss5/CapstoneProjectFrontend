const exerciseEntries = (state = [], action) => {
    let updatedExerciseEntries;
  switch (action.type) {
    case "LOGIN_SUCCESS":
    case "CREATE_USER":
      return action.user.exercise_entries;
    case "CREATE_ENTRY":
      updatedExerciseEntries = [...state, action.entry];
      return updatedExerciseEntries;

    default:
      return state;
  }
};

export default exerciseEntries;
