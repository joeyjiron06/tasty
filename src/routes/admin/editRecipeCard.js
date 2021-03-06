import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core/styles';
import {
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from '@material-ui/core';
import { RecipeType } from '../../utils/types';
import EditableList from './editableList';

const theme = createMuiTheme({});

class EditRecipeCard extends Component {
  state = {
    recipe: null
  };

  render() {
    const { onDelete, onCancel, onSave, classes } = this.props;
    const { recipe } = this.state;
    const saveButtonEnabled =
      recipe.title &&
      recipe.image &&
      recipe.serves > 0 &&
      recipe.duration > 0 &&
      recipe.tags[0] &&
      recipe.ingredients[0] &&
      recipe.directions[0];

    return (
      <MuiThemeProvider theme={theme}>
        <Dialog open={true} onClose={onCancel}>
          <DialogTitle> Edit Recipe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Below you can edit the recipe as you please. Make sure that the
              values are filled in correctly before submitting.
            </DialogContentText>

            <TextField
              autoFocus={true}
              className={classes.textField}
              onChange={e => {
                const { value } = e.target;
                recipe.title = value;
                this.setState({ recipe });
              }}
              placeholder='Name of Recipe'
              label='Name'
              value={recipe.title || ''}
              fullWidth={true}
            />
            <TextField
              className={classes.textField}
              label='Serves'
              placeholder='How many does it serve?'
              helperText='people'
              value={recipe.serves || ''}
              fullWidth={true}
              onChange={e => {
                const { value } = e.target;
                const intVal = parseInt(value, 10);
                if (isNaN(intVal) && value) {
                  return;
                }
                recipe.serves = intVal;
                this.setState({ recipe });
              }}
            />
            <TextField
              className={classes.textField}
              label='Duration'
              placeholder='How long does it take?'
              helperText='minutes'
              value={recipe.duration || ''}
              fullWidth={true}
              onChange={e => {
                const { value } = e.target;
                const intVal = parseInt(value, 10);
                if (isNaN(intVal) && value) {
                  return;
                }
                recipe.duration = intVal;
                this.setState({ recipe });
              }}
            />

            <TextField
              className={classes.textField}
              placeholder='Image url'
              value={recipe.image || ''}
              label='Image'
              fullWidth={true}
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

            <Typography variant='title' className={classes.listHeading}>
              Tags
            </Typography>
            <EditableList
              items={recipe.tags}
              textClassName={classes.textField}
              buttonText='ADD TAG'
              placeholder='Tag name'
              onChange={newTags => {
                recipe.tags = newTags;
                this.setState({ recipe });
              }}
            />

            <Typography variant='title' className={classes.listHeading}>
              Ingredients
            </Typography>
            <EditableList
              items={recipe.ingredients}
              textClassName={classes.textField}
              buttonText='ADD INGREDIENT'
              placeholder='Ingredient'
              onChange={newIngredients => {
                recipe.ingredients = newIngredients;
                this.setState({ recipe });
              }}
            />

            <Typography variant='title' className={classes.listHeading}>
              Directions
            </Typography>
            <EditableList
              items={recipe.directions}
              textClassName={classes.textField}
              buttonText='ADD DIRECTION'
              placeholder='Direction'
              onChange={newDirections => {
                recipe.directions = newDirections;
                this.setState({ recipe });
              }}
            />
          </DialogContent>

          <DialogActions>
            <Button
              className={classes.button}
              variant='contained'
              color='default'
              onClick={onCancel}
              data-testid='editRecipeCancelButton'
            >
              Cancel
            </Button>

            <Button
              className={classes.button}
              variant='contained'
              color='secondary'
              onClick={() => onDelete(recipe)}
            >
              Delete
            </Button>

            <Button
              className={classes.button}
              variant='contained'
              color='secondary'
              disabled={!saveButtonEnabled}
              onClick={() => {
                onSave(recipe);
              }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </MuiThemeProvider>
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
  title: {
    marginBottom: 20
  },
  textField: {
    display: 'block',
    marginBottom: 26,
    maxWidth: 400
  },
  imagePreview: {
    width: 200,
    borderRadius: 6,
    maxWidth: '100%'
  },
  listHeading: {
    marginTop: 40,
    marginBottom: 20
  },
  actionButtonContainer: {
    marginTop: 40
  },
  button: {
    marginRight: 20
  }
});

export default withStyles(styles)(EditRecipeCard);
