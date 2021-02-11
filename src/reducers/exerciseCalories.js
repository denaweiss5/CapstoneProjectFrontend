const exerciseCalories = (state = 0, action) => {
    switch(action.type){
        case "TOTAL_EXERCISE_CALS":
          return action.calories;
        default:
          return state
    }
    }
    export default exerciseCalories