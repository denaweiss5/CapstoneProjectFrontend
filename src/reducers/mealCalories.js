const mealCalories = (state = 0, action) => {
switch(action.type){
    case "TOTAL_MEAL_CALS":
      return action.calories;
    default:
      return state
}
}
export default mealCalories