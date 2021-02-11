export const createEntry = (newEntry) => {
    return {
        type: 'CREATE_ENTRY',
        entry: newEntry
    }
}

export const totalMealCals = (mealCals) => {
    return {
        type: 'TOTAL_MEAL_CALS',
        calories: mealCals
    }
}