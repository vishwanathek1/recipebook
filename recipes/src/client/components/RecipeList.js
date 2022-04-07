import React, { useState } from 'react';
import AddRecipe from './AddRecipe';
import Recipe from './Recipe';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const addRecipe = recipe => {
    if (!recipe.text || /^\s*$/.test(recipe.text)) {
      return;
    }

    const newRecipes = [recipe, ...recipes];

    setRecipes(newRecipes);
  };

  const updateRecipe = (recipeId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setRecipes(prev => prev.map(item => (item.id === recipeId ? newValue : item)));
  };

  const removeRecipe = id => {
    const removedArr = [...recipes].filter(recipe => recipe.id !== id);

    setRecipes(removedArr);
  };

  const completeRecipe = id => {
    let updatedRecipes = recipes.map(recipe => {
      if (recipe.id === id) {
        recipe.isComplete = !recipe.isComplete;
      }
      return recipe;
    });
    setRecipes(updatedRecipes);
  };

  return (
    <>
      <AddRecipe onSubmit={addRecipe} />
      {/* <Recipe
        recipes={recipes}
        completeRecipe={completeRecipe}
        removeRecipe={removeRecipe}
        updateRecipe={updateRecipe}
      /> */}
    </>
  );
}

export default RecipeList;

