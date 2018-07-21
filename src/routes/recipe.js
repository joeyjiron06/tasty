import React, { Component } from 'react';
import {
  Typography,
  Divider,
  Icon,
  TextField,
  Button
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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
    this.setState({
      isEditing: true
    });
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
                <div>{`${recipe.duration.value} ${recipe.duration.unit}`}</div>
              </div>

              <div className={classes.servingsContainer}>
                <Icon className={classes.icon}>people_outline</Icon>
                <Icon className={classes.icon}>add</Icon>
                <Typography className={classes.servingsText}>
                  {recipe.serves}
                </Typography>
                <Icon className={classes.icon}>remove</Icon>
              </div>
            </div>

            <div className={classes.tagsContainer}>
              {recipe.tags.map(tag => (
                <div key={tag} className={classes.chip}>
                  {tag}
                </div>
              ))}
            </div>
          </div>

          <div className={classes.contentsContainer}>
            <div className={classes.ingredients}>
              <Typography variant="title" gutterBottom>
                Ingredients
              </Typography>
              <div>
                {recipe.ingredients.map(ingredient => (
                  <Typography key={ingredient} className={classes.ingredient}>
                    {ingredient}
                  </Typography>
                ))}
              </div>
            </div>

            <div className={classes.directions}>
              <Typography variant="title" gutterBottom>
                Directions
              </Typography>
              <div className={classes.directionsList}>
                {recipe.directions.map((step, index) => (
                  <div key={step} className={classes.directionStep}>
                    <Typography className={classes.directionNumber}>
                      {index + 1}
                    </Typography>
                    <Typography className={classes.directionText}>
                      {step}
                    </Typography>
                  </div>
                ))}
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
    paddingRight: 20
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
  titleDivider: {
    [theme.breakpoints.down('sm')]: {
      background: 'rgba(255,255,255,0.12)'
    }
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
  ingredient: {
    marginBottom: 10
  },
  directions: {
    flexGrow: 1,
    flexBasis: 360
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
  directionText: {
    display: 'inline'
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
