export const createEntry = (newEntry) => {
  return {
    type: "CREATE_ENTRY",
    entry: newEntry,
  };
};

export const deleteEntry = (id) => {
  return {
    type: "DELETE_ENTRY",
    id: id,
  };
};
