import { combineReducers } from 'redux'
import currentUserReducer from './currentUser'
// import exerciseEntries from './exerciseEntries'
// import mealEntries from './mealEntries'
import weightEntriesReducer from './weightEntries'

export default combineReducers({
    currentUser: currentUserReducer,
    weightEntries: weightEntriesReducer,
    // mealEntries: mealEntriesReducer,
    // exerciseEntries: exerciseEntriesReducer
  })