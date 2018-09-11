import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, TextField, Button } from '@material-ui/core';
import { RecipeType } from '../../utils/types';
import EditableList from './editableList';

class EditRecipeCard extends Component {
  state = {
    recipe: null
  };

  render() {
    const { onDelete, onCancel, onSave, classes } = this.props;
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
          label='Name'
          value={recipe.title}
          fullWidth={true}
          gutterBottom
        />
        <TextField
          label='Serves'
          placeholder='How many does it serve?'
          value={recipe.serves}
          fullWidth={true}
          gutterBottom
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
        <TextField
          label='Duration'
          placeholder='How long does it take?'
          value={recipe.duration}
          fullWidth={true}
          gutterBottom
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
        <TextField
          placeholder='Image url'
          value={recipe.image}
          fullWidth={true}
          label='Image'
          gutterBottom
          onChange={e => {
            const { value } = e.target;
            recipe.image = value;
            this.setState({ recipe });
          }}
        />
        <img
          className={classes.imagePreview}
          alt='recipe preview'
          src={recipe.image}
        />

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
          <Button
            variant='contained'
            color='default'
            onClick={onCancel}
            data-testid='editRecipeCancelButton'
          >
            Cancel
          </Button>

          <Button
            variant='contained'
            color='secondary'
            onClick={() => onDelete(recipe)}
          >
            Delete
          </Button>

          <Button
            variant='contained'
            color='secondary'
            onClick={() => {
              onSave(recipe);
            }}
          >
            Save
          </Button>
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

const styles = theme => ({
  imagePreview: {
    width: 200,
    marginTop: 20
  }
});

export default withStyles(styles)(EditRecipeCard);
