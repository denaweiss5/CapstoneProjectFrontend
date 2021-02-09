const currentUser = (state = null, action) => {
  let updatedUser;
  switch (action.type) {
    case "LOGIN_SUCCESS":
    case "CURRENT_USER":
      return {
        id: action.user.id,
        email: action.user.email,
        name: action.user.name,
        password: action.user.password,
      };
    case "LOGOUT_USER":
      return null;
    case "CREATE_USER":
      return {
        id: action.user.id,
        email: action.user.email,
        name: action.user.name,
        password: action.user.password,
      };
    case "EDIT_USER":
      return {
        ...action.user,
      };

    default:
      return state;
  }
};

export default currentUser;
