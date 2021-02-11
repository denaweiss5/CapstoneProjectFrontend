export const createEntry = (newEntry) => {
    return {
        type: 'CREATE_ENTRY',
        entry: newEntry
    }
}

export const totalExerciseCals = (exerciseCals) => {
    return {
        type: 'TOTAL_EXERCISE_CALS',
        calories: exerciseCals
    }
}