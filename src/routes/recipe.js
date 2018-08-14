import React, { Component } from 'react';
import {
  Typography,
  Divider,
  Icon,
  TextField,
  Button,
  IconButton,
  Chip,
  CircularProgress
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { database } from 'firebase';

const copyRecipe = recipe => ({
  ...recipe,
  tags: [...recipe.tags],
  ingredients: [...recipe.ingredients],
  directions: [...recipe.directions]
});

class RecipePage extends Component {
  state = {
    isLoading: true,
    isEditing: false,
    isError: false,
    recipe: null,
    editRecipe: null
  };

  handleTitleChanged = event => {
    const title = event.target.value;
    const editRecipe = { ...this.state.editRecipe, title };
    this.setState({ editRecipe });
  };
  handleCancelClicked = event => {
    this.setState({
      isEditing: false
    });
  };
  handleSaveClicked = async event => {
    const recipe = copyRecipe(this.state.editRecipe);
    const recipeId = this.props.match.params.id;

    recipe.ingredients = recipe.ingredients.filter(ing => !!ing);
    recipe.directions = recipe.directions.filter(dir => !!dir);
    recipe.tags = recipe.tags.filter(tag => !!tag);

    try {
      await database()
        .ref('recipes')
        .child(recipeId)
        .set(recipe);
    } catch (e) {
      console.error(e);
    }

    this.setState({
      isEditing: false,
      recipe
    });
  };

  handleEditClicked = event => {
    const editRecipe = copyRecipe(this.state.recipe);
    this.setState({
      isEditing: true,
      editRecipe
    });
  };
  handleDurationValueChanged = event => {
    const text = event.target.value;
    const number = text && parseInt(text);

    if (number === undefined) {
      return;
    }

    if (number === null) {
      return;
    }

    if (isNaN(number)) {
      return;
    }

    const editRecipe = {
      ...this.state.editRecipe
    };
    editRecipe.duration = number;
    this.setState({ editRecipe });
  };

  handleServesChanged = event => {
    const serves = event.target.value;
    const editRecipe = {
      ...this.state.editRecipe,
      serves
    };
    this.setState({
      editRecipe
    });
  };

  handleRemoveIngredient = ingredient => {
    return () => {
      const editRecipe = {
        ...this.state.editRecipe,
        ingredients: this.state.editRecipe.ingredients.filter(
          ing => ing !== ingredient
        )
      };
      this.setState({ editRecipe });
    };
  };
  handleRemoveStep = step => () => {
    const editRecipe = {
      ...this.state.editRecipe,
      directions: this.state.editRecipe.directions.filter(stp => stp !== step)
    };
    this.setState({ editRecipe });
  };
  handleAddIngredient = () => {
    const editRecipe = {
      ...this.state.editRecipe
    };
    editRecipe.ingredients.push(null);
    this.setState({ editRecipe }, () => {
      const selectedElements = document.querySelectorAll(
        `.${this.props.classes.ingredientInput}`
      );
      if (selectedElements.length) {
        const inputElement = selectedElements[selectedElements.length - 1];
        inputElement.focus();
      }
    });
  };
  handleAddStep = () => {
    const editRecipe = {
      ...this.state.editRecipe
    };
    editRecipe.directions.push(null);
    this.setState({ editRecipe });
  };

  handleDeleteTag = index => () => {
    const editRecipe = {
      ...this.state.editRecipe,
      tags: this.state.editRecipe.tags.filter((t, idx) => index !== idx)
    };
    this.setState({ editRecipe });
  };

  handleTagChanged = index => event => {
    const text = event.target.value;
    const editRecipe = {
      ...this.state.editRecipe
    };
    editRecipe.tags[index] = text;
    this.setState({ editRecipe });
  };

  handleStepTextChanged = (step, index) => event => {
    const newText = event.target.value;
    const editRecipe = this.state.editRecipe;
    editRecipe.directions[index] = newText;
    this.setState({ editRecipe });
  };

  handleIngredientChanged = (ingredient, index) => event => {
    const newText = event.target.value;
    const editRecipe = this.state.editRecipe;
    editRecipe.ingredients[index] = newText;
    this.setState({ editRecipe });
  };
  handleAddTag = event => {
    const editRecipe = {
      ...this.state.editRecipe
    };
    editRecipe.tags.push(null);
    this.setState({ editRecipe });
  };

  handleImageChanged = event => {
    const image = event.target.value;
    const editRecipe = this.state.editRecipe;
    editRecipe.image = image;
    this.setState({ editRecipe });
  };

  handleDeleteClicked = async event => {
    const recipe = copyRecipe(this.state.editRecipe);
    const recipeId = this.props.match.params.id;

    try {
      await database()
        .ref('trash')
        .child(recipeId)
        .set(recipe);

      await database()
        .ref('recipes')
        .child(recipeId)
        .set(null);

      this.setState({ recipe: null, isError: true, isEditing: false });
    } catch (e) {
      console.error(e);
    }
  };

  handleIngredientKeyDown = event => {
    if (event.target.value && event.keyCode === 13) {
      this.handleAddIngredient();
    }
  };

  async UNSAFE_componentWillMount() {
    const recipeId = this.props.match.params.id;
    try {
      const recipeSnapshot = await database()
        .ref('recipes')
        .child(recipeId)
        .once('value');

      let recipe = recipeSnapshot.val();

      if (recipe) {
        recipe = {
          tags: [],
          ingredients: [],
          directions: [],
          ...recipeSnapshot.val()
        };
        console.log('recipe', recipe);
        this.setState({ recipe, isLoading: false });
      } else {
        throw new Error('recipe does not exist');
      }
    } catch (e) {
      console.error(e);
      this.setState({ isError: true });
    }
  }

  render() {
    const { classes } = this.props;
    const { isError, isLoading, isEditing, recipe, editRecipe } = this.state;

    if (isError) {
      return (
        <div className={classes.page}>
          <Typography variant="display1" className={classes.title}>
            Recipe does not exist
          </Typography>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className={classes.page}>
          <CircularProgress />
        </div>
      );
    }

    return (
      <div className={classes.page}>
        <div className={classes.editContainer}>
          {isEditing ? (
            <div>
              <Button
                variant="contained"
                color="default"
                className={classes.cancelButton}
                onClick={this.handleCancelClicked}
              >
                <Icon className={classes.buttonIcon}>close</Icon>
                Cancel
              </Button>

              <Button
                variant="contained"
                color="secondary"
                onClick={this.handleDeleteClicked}
                className={classes.deleteButton}
              >
                <Icon className={classes.buttonIcon}>delete</Icon>
                Delete
              </Button>

              <Button
                variant="contained"
                color="secondary"
                onClick={this.handleSaveClicked}
              >
                <Icon className={classes.buttonIcon}>check</Icon>
                Save
              </Button>
            </div>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleEditClicked}
            >
              <Icon className={classes.buttonIcon}>edit</Icon>
              Edit
            </Button>
          )}
        </div>

        <div className={classes.infoContainer}>
          {isEditing ? (
            <TextField
              value={editRecipe.title || ''}
              fullWidth={true}
              onChange={this.handleTitleChanged}
              margin="normal"
              InputProps={{
                classes: {
                  input: classes.titleInput
                }
              }}
            />
          ) : (
            <Typography variant="display3" className={classes.title}>
              {recipe.title}
            </Typography>
          )}

          {isEditing ? null : <Divider className={classes.titleDivider} />}

          <div className={classes.subtitleContainer}>
            <div className={classes.timeAndServicesContainer}>
              <div className={classes.timeContainer}>
                <Icon className={classes.icon}>access_time</Icon>
                {isEditing ? (
                  <div className={classes.timeInputContainer}>
                    <TextField
                      value={editRecipe.duration || ''}
                      onChange={this.handleDurationValueChanged}
                      margin="normal"
                      InputProps={{
                        classes: {
                          input: classes.durationValueInput
                        }
                      }}
                    />
                    <div className={classes.timeLabel}>mins</div>
                  </div>
                ) : (
                  <div>{`${recipe.duration} mins`}</div>
                )}
              </div>

              <div className={classes.servingsContainer}>
                <Icon className={classes.icon}>people_outline</Icon>
                {isEditing ? (
                  <TextField
                    value={editRecipe.serves || ''}
                    onChange={this.handleServesChanged}
                    margin="normal"
                    InputProps={{
                      classes: {
                        input: classes.servesInput
                      }
                    }}
                  />
                ) : (
                  <Typography className={classes.servingsText}>
                    {recipe.serves}
                  </Typography>
                )}
              </div>
            </div>

            <div className={classes.tagsContainer}>
              {isEditing
                ? editRecipe.tags.map((tag, index) => (
                    <div
                      key={index}
                      className={classes.chip + ' ' + classes.chipEditing}
                    >
                      <IconButton onClick={this.handleDeleteTag(index)}>
                        <Icon>cancel</Icon>
                      </IconButton>
                      <TextField
                        value={tag || ''}
                        onChange={this.handleTagChanged(index)}
                      />
                    </div>
                  ))
                : recipe.tags.map(tag => (
                    <div key={tag} className={classes.chip}>
                      {tag}
                    </div>
                  ))}

              {isEditing ? (
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={this.handleAddTag}
                  className={classes.addTagButton}
                >
                  <Icon className={classes.buttonIcon}>add</Icon>
                  Add tag
                </Button>
              ) : null}
            </div>
          </div>

          <div className={classes.contentsContainer}>
            <div className={classes.ingredients}>
              <Typography
                variant="title"
                gutterBottom
                className={isEditing ? classes.ingredientsTitleEditing : null}
              >
                Ingredients
              </Typography>
              <div>
                {isEditing
                  ? editRecipe.ingredients.map((ingredient, index) => (
                      <div
                        key={index}
                        className={classes.editIngredientContainer}
                      >
                        <Typography className={classes.ingredient}>
                          <IconButton
                            onClick={this.handleRemoveIngredient(ingredient)}
                          >
                            <Icon>cancel</Icon>
                          </IconButton>
                        </Typography>
                        <TextField
                          value={ingredient || ''}
                          onChange={this.handleIngredientChanged(
                            ingredient,
                            index
                          )}
                          onKeyDown={this.handleIngredientKeyDown}
                          margin="normal"
                          InputProps={{
                            classes: {
                              input: classes.ingredientInput
                            }
                          }}
                        />
                      </div>
                    ))
                  : recipe.ingredients.map(ingredient => (
                      <Typography
                        key={ingredient}
                        className={classes.ingredient}
                      >
                        {ingredient}
                      </Typography>
                    ))}

                {isEditing ? (
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={this.handleAddIngredient}
                  >
                    <Icon className={classes.buttonIcon}>add</Icon>
                    Add Ingredient
                  </Button>
                ) : null}
              </div>
            </div>

            <div className={classes.directions}>
              <Typography
                variant="title"
                gutterBottom
                className={isEditing ? classes.directionsTitleEditing : null}
              >
                Directions
              </Typography>
              <div className={classes.directionsList}>
                {isEditing
                  ? editRecipe.directions.map((step, index) => (
                      <div key={index} className={classes.directionStep}>
                        <IconButton onClick={this.handleRemoveStep(step)}>
                          <Icon>cancel</Icon>
                        </IconButton>

                        <Typography className={classes.directionNumberEditing}>
                          {index + 1}
                        </Typography>
                        <TextField
                          className={classes.directionTextEditing}
                          fullWidth={true}
                          multiline={true}
                          value={step || ''}
                          onChange={this.handleStepTextChanged(step, index)}
                        />
                      </div>
                    ))
                  : recipe.directions.map((step, index) => (
                      <div key={step} className={classes.directionStep}>
                        <Typography className={classes.directionNumber}>
                          {index + 1}
                        </Typography>
                        <Typography className={classes.directionText}>
                          {step}
                        </Typography>
                      </div>
                    ))}

                {isEditing ? (
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={this.handleAddStep}
                  >
                    <Icon className={classes.buttonIcon}>add</Icon>
                    Add Step
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className={classes.imageContainer}>
          <img
            className={classes.image}
            src={isEditing ? editRecipe.image : recipe.image}
            alt="recipe"
          />
          {isEditing ? (
            <div className={classes.imageUrl}>
              <TextField
                label="Image"
                fullWidth={true}
                value={editRecipe.image || ''}
                onChange={this.handleImageChanged}
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  page: {
    display: 'flex',
    position: 'relative',
    zIndex: 1,
    [theme.breakpoints.up('sm')]: {
      minHeight: '100vh'
    }
  },
  editContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'absolute',
    width: '100%',
    paddingRight: 20,
    zIndex: 2
  },
  buttonIcon: {
    marginRight: 10
  },
  cancelButton: {
    marginRight: 10
  },
  infoContainer: {
    flex: 1,
    padding: 50,
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      background: 'rgba(0,0,0,0.5)',
      overflow: 'scroll',
      height: '100vh',
      boxSizing: 'border-box'
    }
  },
  title: {
    letterSpacing: 2.8
  },
  titleInput: {
    color: theme.typography.display3.color,
    fontSize: theme.typography.display3.fontSize
  },
  timeLabel: {
    marginLeft: 10,
    marginBottom: 4
  },
  titleDivider: {
    [theme.breakpoints.down('sm')]: {
      background: 'rgba(255,255,255,0.12)'
    }
  },
  servesInput: {
    maxWidth: 30
  },
  subtitleContainer: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: '20px 0'
  },
  icon: {
    display: 'inline-block',
    marginRight: 10
  },
  timeInputContainer: {
    display: 'flex',
    alignItems: 'flex-end'
  },
  durationValueInput: {
    maxWidth: 30
  },
  servingsContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  servingsText: {
    display: 'inline-block',
    marginRight: 10
  },
  timeAndServicesContainer: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginRight: 40
  },
  timeContainer: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginRight: 30
  },
  tagsContainer: {
    flexShrink: 0,
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '100%'
  },
  chip: {
    border: 'solid 1px rgba(255, 255, 255,0.7)',
    padding: '10px 14px',
    marginRight: 10,
    borderRadius: 100
  },
  chipEditing: {
    marginRight: 10
  },
  ingredients: {
    marginBottom: 40,
    marginRight: 40,
    flexShrink: 0
  },
  editIngredientContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  ingredientsTitleEditing: {
    marginLeft: 48
  },
  ingredient: {
    marginBottom: 10
  },
  directions: {
    flexGrow: 1,
    flexBasis: 360
  },
  directionsTitleEditing: {
    marginLeft: 48
  },
  directionsList: {},
  directionStep: {
    display: 'flex',
    marginBottom: 20
  },
  directionNumber: {
    minWidth: 28,
    display: 'inline'
  },
  directionNumberEditing: {
    minWidth: 28,
    display: 'inline',
    marginTop: 10
  },
  directionText: {
    display: 'inline'
  },
  directionTextEditing: {
    display: 'inline',
    marginTop: 10,
    flexGrow: 1
  },
  contentsContainer: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  imageContainer: {
    flex: 1,
    padding: 50,
    boxSizing: 'border-box',
    alignSelf: 'flex-start',
    height: '100%',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      background: 'rgba(0,0,0,0.7)',
      padding: 0
    }
  },
  image: {
    objectFit: 'cover',
    objectPosition: 'center',
    width: '100%',
    height: '100%',
    display: 'block',
    borderRadius: 10,
    [theme.breakpoints.down('sm')]: {
      borderRadius: 0
    }
  },
  imageUrl: {
    position: 'absolute',
    left: 40,
    bottom: 0,
    zIndex: 20,
    [theme.breakpoints.down('sm')]: {
      bottom: 20
    }
  },
  addTagButton: {
    maxHeight: 42
  },
  deleteButton: {
    marginRight: 10
  },
  ingredientInput: {}
});

export default withStyles(styles)(RecipePage);
