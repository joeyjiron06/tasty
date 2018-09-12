import { database, auth } from 'firebase';

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

/**
 * @typedef User
 * @type Object
 * @property {string} uid - a user id.
 * @property {boolean} isAdming - is a user an admin or not
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
 * fetch recipes in the trash
 * @return {Recipe[]} array of recipes
 */
export async function fetchTrash() {
  const snapshot = await database()
    .ref('trash')
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

export async function deleteFromTrash(recipeId) {
  await database()
    .ref('trash')
    .child(recipeId)
    .set(null);
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

/**
 * Creates a new recipe in the database.
 * @return {string} the new recipe id
 */
export async function addRecipe(recipe) {
  const recipeSnapshot = await database()
    .ref('recipes')
    .push({
      ...recipe,
      dateAdded: database.ServerValue.TIMESTAMP
    });

  return recipeSnapshot.key;
}

/**
 * Authenticate the user
 * @return {object} a user object
 * @return {boolean} object.isAdmin - is user admin or not
 * @return {string} object.uid - user's id
 */
export async function authUser() {
  const { user } = await auth().signInWithPopup(
    new auth.FacebookAuthProvider()
  );

  const isAdmin = await fetchIsAdmin(user.id);
  return {
    uid: user.uid,
    isAdmin
  };
}

async function fetchIsAdmin(userId) {
  const isAdminSnapshot = await database()
    .ref('admins')
    .child(userId)
    .once('value');

  return isAdminSnapshot.val();
}

function onAuthStateChanged() {
  return new Promise((resolve, reject) => {
    auth().onAuthStateChanged(user => {
      if (user) {
        resolve(user);
      } else {
        reject(new Error('no returning user'));
      }
    });
  });
}

export async function checkReturingUser() {
  const user = await onAuthStateChanged();
  const isAdmin = await fetchIsAdmin(user.uid);

  return {
    uid: user.uid,
    isAdmin
  };
}
