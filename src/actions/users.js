export const createUser = (newUser) => {
    return {
      type: 'CREATE_USER',
      user: newUser
    }
  }

  export const editUser = (updatedUser) => {
    return {
      type: 'EDIT_USER',
      user: updatedUser
    }
  }