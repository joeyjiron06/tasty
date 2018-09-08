import { database } from 'firebase';

/**
 * @typedef Recipe
 * @type Object
 * @property {string} id - an ID.
 * @property {string[]} [tags] - the tags associated with a recipe. e.g. dinner, chinese,...etc.
 * @property {string[]} ingredients - the list of ingredients
 * @property {string[]} directions - the list of directions for the recipe
 * @property {string} image - the image url
 * @property {number} serves - the amount of people that the recipe serves
 * @property {number} duration - how long in minutes it takes to make the recipe
 */

export async function fetchRecipes() {
  const snapshot = await database()
    .ref('recipes')
    .once('value');

  const recipes = [];
  snapshot.forEach(recipeSnapshot => {
    recipes.push({
      ...recipeSnapshot.val(),
      id: recipeSnapshot.key
    });
  });

  return recipes;
}

/**
 * @param {string} recipeId - the recipe id to fetch
 * @return {?Recipe}
 */
export async function fetchRecipe(recipeId) {
  const recipeSnapshot = await database()
    .ref('recipes')
    .child(recipeId)
    .once('value');

  const recipe = recipeSnapshot.val();

  if (!recipe) {
    return null;
  }

  return {
    tags: [],
    ingredients: [],
    directions: [],
    serves: 0,
    duration: 0,
    image: null,
    ...recipe
  };
}

/**
 * @param {string} recipeId - the recipe id
 * @param {Recipe} recipe - the recipe data to set for the specified id
 */
export async function updateRecipe(recipeId, recipe) {
  await database()
    .ref('recipes')
    .child(recipeId)
    .set(recipe);
}

/**
 * @param {string} recipeId - the recipe id
 */
export async function moveRecipeToTrash(recipeId) {
  const recipe = await fetchRecipe(recipeId);

  if (!recipe) {
    return;
  }

  await database()
    .ref('trash')
    .child(recipeId)
    .set(recipe);
}

/**
 * @param {string} recipeId - the recipe id
 */
export async function deleteRecipe(recipeId) {
  await database()
    .ref('recipes')
    .child(recipeId)
    .set(null);
}
