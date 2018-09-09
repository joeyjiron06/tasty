import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, CircularProgress } from '@material-ui/core';
import { fetchRecipes } from '../api/recipes';
import RecipeCard from '../components/recipeCard';
import * as logger from '../utils/logger';

class BrowsePage extends Component {
  state = {
    recipes: null,
    error: false,
    isLoading: true
  };

  async UNSAFE_componentWillMount() {
    try {
      const recipes = await fetchRecipes();

      // change the size of the image. note that this is brittle because the url
      // might not contain this substring. this code assumes we used this website
      // to get the url:
      // https://ctrlq.org/google/photos/
      recipes.forEach(recipe => {
        recipe.image = recipe.image && recipe.image.replace('=w2400', '=w512');
      });

      this.setState({
        recipes,
        isLoading: false
      });
    } catch (e) {
      logger.error(e);
      this.setState({
        error: true,
        isLoading: false
      });
    }
  }

  render() {
    const { classes, history } = this.props;
    const { recipes, error, isLoading } = this.state;

    return (
      <div className={classes.browsePage}>
        <Typography
          variant="display2"
          gutterBottom
          data-testid="browsepage-title"
          className={classes.title}
        >
          Browse Recipes
        </Typography>

        <div className={classes.recipesGrid}>
          {(() => {
            if (error) {
              return <Typography>Error fetching recipes</Typography>;
            }

            if (isLoading) {
              return (
                <CircularProgress data-testid="browsepage-loading-indicator" />
              );
            }

            if (!recipes || !recipes.length) {
              return <Typography>No Results</Typography>;
            }

            return recipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                className={classes.recipeCard}
                onClick={() => {
                  history.push(`/recipe/${recipe.id}`);
                }}
              />
            ));
          })()}
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  browsePage: {
    padding: 40
  },
  title: {},
  recipesGrid: {
    flexWrap: 'wrap',
    display: 'grid',
    'grid-template-columns': 'repeat(auto-fill,288px)',
    margin: '0 auto'
  },
  recipeCard: {
    marginRight: 30,
    marginBottom: 30
  },
  [theme.breakpoints.down('xs')]: {
    browsePage: {
      padding: 10
    },
    recipesGrid: {
      'grid-template-columns': 'repeat(auto-fill,minmax(300px,100%))'
    },
    recipeCard: {
      width: '100%'
    },
    title: {
      'font-size': '28px'
    }
  }
});

export default withStyles(styles)(BrowsePage);
