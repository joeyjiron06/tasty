import React, { Component } from 'react';
import { Typography, Divider, Icon, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { fetchRecipe } from '../api/recipes';
import * as logger from '../utils/logger';

class RecipePage extends Component {
  state = {
    isLoading: true,
    isError: false,
    recipe: null
  };

  async UNSAFE_componentWillMount() {
    const { match, location } = this.props;
    const recipeId = match && match.params.id;
    const recipeFromState = location && location.state && location.state.recipe;

    try {
      const recipe = recipeFromState || (await fetchRecipe(recipeId));
      this.setState({
        recipe,
        isLoading: false
      });
    } catch (e) {
      logger.error(e);
      this.setState({ isError: true });
    }
  }

  render() {
    const { classes } = this.props;
    const { isError, isLoading, recipe } = this.state;

    if (isError) {
      return (
        <div className={classes.page}>
          <Typography variant='display1' className={classes.title}>
            Recipe does not exist
          </Typography>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className={classes.page}>
          <CircularProgress data-testid='recipepage-loading-indicator' />
        </div>
      );
    }

    return (
      <div className={classes.page}>
        <div className={classes.infoContainer}>
          <Typography
            variant='display3'
            className={classes.title}
            data-testid='recipepage-title'
          >
            {recipe.title}
          </Typography>

          <Divider className={classes.titleDivider} />

          <div className={classes.subtitleContainer}>
            <div className={classes.timeAndServicesContainer}>
              <div className={classes.timeContainer}>
                <Icon className={classes.icon}>access_time</Icon>
                <div data-testid='recipepage-duration'>{`${
                  recipe.duration
                } mins`}</div>
              </div>

              <div className={classes.servingsContainer}>
                <Icon className={classes.icon}>people_outline</Icon>
                <Typography
                  className={classes.servingsText}
                  data-testid='recipepage-serves'
                >
                  {recipe.serves}
                </Typography>
              </div>
            </div>

            <div className={classes.tagsContainer}>
              {(recipe.tags || []).map(tag => (
                <div
                  key={tag}
                  className={classes.chip}
                  data-testid='recipepage-tag'
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>

          <div className={classes.contentsContainer}>
            <div className={classes.ingredients}>
              <Typography variant='title' gutterBottom>
                Ingredients
              </Typography>
              <div>
                {recipe.ingredients.map(ingredient => (
                  <Typography
                    key={ingredient}
                    className={classes.ingredient}
                    data-testid='recipepage-ingredient'
                  >
                    {ingredient}
                  </Typography>
                ))}
              </div>
            </div>

            <div className={classes.directions}>
              <Typography variant='title' gutterBottom>
                Directions
              </Typography>
              <div className={classes.directionsList}>
                {recipe.directions.map((step, index) => (
                  <div
                    key={step}
                    className={classes.directionStep}
                    data-testid='recipepage-direction'
                  >
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
          <img
            className={classes.image}
            src={recipe.image}
            alt='recipe'
            data-testid='recipepage-image'
          />
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  page: {
    display: 'flex',
    alignItems: 'flex-start',
    color: 'white',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },

  infoContainer: {
    flex: 1,
    padding: 50,
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      order: 10,
      boxSizing: 'border-box'
    }
  },
  title: {
    letterSpacing: 2.8
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
    height: '100%',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      height: 0,
      width: '100%',
      padding: 0,
      paddingTop: '56.25%', // 16:9 aspect ratio
      flex: 0
    }
  },
  image: {
    objectFit: 'cover',
    objectPosition: 'center',
    width: '100%',
    height: '100%',
    display: 'block',
    borderRadius: 10,
    maxHeight: '100vh',
    [theme.breakpoints.down('sm')]: {
      borderRadius: 0,
      position: 'absolute',
      top: 0
    }
  }
});

export default withStyles(styles)(RecipePage);
