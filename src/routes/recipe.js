import React, { Component } from 'react';
import {
  Typography,
  Divider,
  Icon,
  TextField,
  Button,
  IconButton,
  Chip
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const copyRecipe = recipe => ({
  ...recipe,
  duration: {
    ...recipe.duration
  },
  tags: [...recipe.tags],
  ingredients: [...recipe.ingredients],
  directions: [...recipe.directions]
});

class RecipePage extends Component {
  state = {
    isEditing: true,
    recipe: {
      title: 'Tacos',
      duration: {
        value: 1,
        unit: 'hour'
      },
      serves: 4,
      tags: ['Vegan', 'Breakfast'],
      ingredients: [
        '1 head of Cauliflower',
        '12 Corn tortillas',
        '2 cups of rice',
        '2.5 limes',
        '1 bunch of cilantro',
        '2 Jalapenos',
        'Tomatillo salsa',
        'Onion powder'
      ],
      directions: [
        'Marinate the cauliflower. Cut up cauliflower and marinate with olive oil (enough to coat it on the outside) then add chipotle powder, onion powder, a whole lime and salt and pepper. Let it marinade for as much time as you have or while you perepare the rest.',
        'Roast the cauliflower in the oven at 425℉ for 35-45min checking on it periodically.',
        'Start boiling water for the next step.',
        'After twenty minutes of roasting the cauliflower add your corn to boiling water and let it cook for 15 minutes.',
        'Immediately after putting the corn on start making cilantro lime rice.',
        'Once the rice and corn is done, check on your cauliflower.',
        'Serve on your tortillas and garnish with cilantro, jalapenos (fresh or pickled), onions and lime'
      ]
    }
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
  handleSaveClicked = event => {
    this.setState({
      isEditing: false
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
      ...this.state.editRecipe,
      duration: {
        ...this.state.editRecipe.duration,
        value: number
      }
    };
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
    console.log('add ingredient');
  };
  handleAddStep = () => {
    console.log('add step');
  };

  handleDeleteTag = tag => () => {
    const editRecipe = {
      ...this.state.editRecipe,
      tags: this.state.editRecipe.tags.filter(t => t !== tag)
    };
    this.setState({ editRecipe });
  };

  handleStepTextChanged = (step, index) => event => {
    const newText = event.target.value;
    const editRecipe = {
      ...this.state.editRecipe,
      directions: this.state.editRecipe.directions.map((dir, idx) => {
        if (idx === index) {
          return newText;
        }

        return dir;
      })
    };
    this.setState({ editRecipe });
  };

  UNSAFE_componentWillMount() {
    this.setState({
      editRecipe: {
        ...this.state.recipe,
        duration: {
          ...this.state.recipe.duration
        },
        tags: [...this.state.recipe.tags],
        ingredients: [...this.state.recipe.ingredients],
        directions: [...this.state.recipe.directions]
      }
    });
  }

  render() {
    const { classes } = this.props;
    const { isEditing, recipe, editRecipe } = this.state;
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
                      value={editRecipe.duration.value || ''}
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
                  <div>{`${recipe.duration.value} ${
                    recipe.duration.unit
                  }`}</div>
                )}
              </div>

              <div className={classes.servingsContainer}>
                <Icon className={classes.icon}>people_outline</Icon>
                <Icon className={classes.icon}>add</Icon>

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

                <Icon className={classes.icon}>remove</Icon>
              </div>
            </div>

            <div className={classes.tagsContainer}>
              {isEditing
                ? editRecipe.tags.map(tag => (
                    <Chip
                      key={tag}
                      onDelete={this.handleDeleteTag(tag)}
                      label={tag}
                    />
                  ))
                : recipe.tags.map(tag => (
                    <div key={tag} className={classes.chip}>
                      {tag}
                    </div>
                  ))}

              {isEditing ? (
                <Button color="secondary" variant="contained">
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
                  ? editRecipe.ingredients.map(ingredient => (
                      <Typography
                        key={ingredient}
                        className={classes.ingredient}
                      >
                        <IconButton
                          onClick={this.handleRemoveIngredient(ingredient)}
                        >
                          <Icon>cancel</Icon>
                        </IconButton>
                        {ingredient}
                      </Typography>
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
                          value={step}
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
          <img className={classes.image} src="/IMG_3062.JPG" alt="recipe" />
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
    display: 'flex'
  },
  chip: {
    border: 'solid 1px rgba(255, 255, 255,0.7)',
    padding: '10px 14px',
    marginRight: 10,
    borderRadius: 100
  },
  ingredients: {
    marginBottom: 40,
    marginRight: 40,
    flexShrink: 0
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
    height: '100vh',
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
  }
});

export default withStyles(styles)(RecipePage);
