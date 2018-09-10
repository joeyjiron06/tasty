import React from 'react';

const EditRecipeCard = ({ recipe }) => (
  <div>
    <input placeholder='Name of Recipe' value={recipe.title} />
    <input placeholder='How many does it serve?' value={recipe.serves} />
    <input placeholder='How long does it take?' value={recipe.duration} />
    <input placeholder='Image url' value={recipe.image} />
    <img alt='recipe preview' src={recipe.image} />

    {recipe.tags.map(tag => (
      <input placeholder='Tag name' value={tag} />
    ))}
    <button>ADD TAG</button>

    {recipe.ingredients.map(ingredient => (
      <input placeholder='Ingredient' value={ingredient} />
    ))}
    <button>ADD INGREDIENT</button>

    {recipe.directions.map(direction => (
      <input placeholder='Direction' value={direction} />
    ))}
    <button>ADD DIRECTION</button>
  </div>
);

export default EditRecipeCard;
