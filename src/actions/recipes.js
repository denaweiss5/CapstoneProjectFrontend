export const findRecipes = (recipesArr) => {
    return {
        type: 'SHOW_RECIPES',
        recipes: recipesArr
    }
}

export const viewRecipe = (recipeInfo) => {
    return {
        type: 'VIEW_RECIPE',
        recipe: recipeInfo
    }
}