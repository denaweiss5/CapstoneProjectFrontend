export const createMealEntry = (newEntry) => {
  return {
    type: "CREATE_MEAL_ENTRY",
    entry: newEntry,
  };
};

export const deleteEntry = (id) => {
  return {
    type: "DELETE_ENTRY",
    id: id,
  };
};
