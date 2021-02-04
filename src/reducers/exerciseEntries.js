const exerciseEntries = (state = [], action) => {
    switch(action.type){
        case 'LOGIN_SUCCESS':
        case 'CREATE_USER':
            return action.user.exercise_entries
      
        default:
            return state
    }
}

export default exerciseEntries