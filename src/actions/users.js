export const createUser = (newUser) => {
    return {
      type: 'CREATE_USER',
      user: newUser
    }
  }