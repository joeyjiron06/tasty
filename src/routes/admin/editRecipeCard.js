import React from 'react';

const EditRecipeCard = ({ recipe }) => (
  <div>
    <input placeholder="Name of Recipe" value={recipe.title} />
  </div>
);

export default EditRecipeCard;
