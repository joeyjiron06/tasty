import { database } from 'firebase';

export function fetchRecipes() {
  return database()
  .ref('recipes')
  .once('value')
  .then(snapshot => {
    const recipes = [];
    snapshot.forEach(recipeSnapshot => {
      recipes.push({
        ...recipeSnapshot.val(),
        id: recipeSnapshot.key
      })
    });
    return recipes;
  });
}