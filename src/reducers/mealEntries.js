const mealEntries = (state = [], action) => {
    switch(action.type){
        case 'LOGIN_SUCCESS':
        case 'CREATE_USER':
            return action.user.meal_entries
      
        default:
            return state
    }
}

export default mealEntries