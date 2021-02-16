export const createMealEntry = (newEntry) => {
    return {
        type: 'CREATE_MEAL_ENTRY',
        entry: newEntry
    }
}

export const totalMealCals = (mealCals) => {
    return {
        type: 'TOTAL_MEAL_CALS',
        calories: mealCals
    }
}

export const deleteEntry = (id) => {
    return {
        type: 'DELETE_ENTRY',
        id: id
    }
}