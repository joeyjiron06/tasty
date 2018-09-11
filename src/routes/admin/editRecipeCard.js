import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, TextField } from '@material-ui/core';
import { RecipeType } from '../../utils/types';
import EditableList from './editableList';

class EditRecipeCard extends Component {
  state = {
    recipe: null
  };

  render() {
    const { onDelete, onCancel, onSave } = this.props;
    const { recipe } = this.state;

    return (
      <div>
        <Typography variant='display1' gutterBottom>
          Edit Recipe
        </Typography>

        <TextField
          onChange={e => {
            const { value } = e.target;
            recipe.title = value;
            this.setState({ recipe });
          }}
          placeholder='Name of Recipe'
          value={recipe.title}
        />

        {/* <input
          placeholder='Name of Recipe'
          value={recipe.title}
          onChange={e => {
            const { value } = e.target;
            recipe.title = value;
            this.setState({ recipe });
          }}
        /> */}
        <input
          placeholder='How many does it serve?'
          value={recipe.serves}
          onChange={e => {
            const { value } = e.target;
            const intVal = parseInt(value, 10);
            if (isNaN(intVal)) {
              return;
            }
            recipe.serves = intVal;
            this.setState({ recipe });
          }}
        />
        <input
          placeholder='How long does it take?'
          value={recipe.duration}
          onChange={e => {
            const { value } = e.target;
            const intVal = parseInt(value, 10);
            if (isNaN(intVal)) {
              return;
            }
            recipe.duration = intVal;
            this.setState({ recipe });
          }}
        />
        <input
          placeholder='Image url'
          value={recipe.image}
          onChange={e => {
            const { value } = e.target;
            recipe.image = value;
            this.setState({ recipe });
          }}
        />
        <img alt='recipe preview' src={recipe.image} />

        <EditableList
          items={recipe.tags}
          buttonText='ADD TAG'
          placeholder='Tag name'
          onChange={newTags => {
            recipe.tags = newTags;
            this.setState({ recipe });
          }}
        />

        <EditableList
          items={recipe.ingredients}
          buttonText='ADD INGREDIENT'
          placeholder='Ingredient'
          onChange={newIngredients => {
            recipe.ingredients = newIngredients;
            this.setState({ recipe });
          }}
        />

        <EditableList
          items={recipe.directions}
          buttonText='ADD DIRECTION'
          placeholder='Direction'
          onChange={newDirections => {
            recipe.directions = newDirections;
            this.setState({ recipe });
          }}
        />

        <div>
          <button onClick={onCancel}>Cancel</button>
          <button onClick={() => onDelete(recipe)}>Delete</button>
          <button
            onClick={() => {
              onSave(recipe);
            }}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}

EditRecipeCard.getDerivedStateFromProps = ({ recipe }, state) => {
  if (!state.recipe) {
    // make a copy so we dont edit the original from props
    return {
      recipe: {
        ...recipe,
        tags: [...recipe.tags],
        ingredients: [...recipe.ingredients],
        directions: [...recipe.directions]
      }
    };
  }

  return null;
};

EditRecipeCard.propTypes = {
  recipe: RecipeType.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

const styles = theme => ({});

export default withStyles(styles)(EditRecipeCard);
