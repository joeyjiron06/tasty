import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { fetchRecipes } from '../api/recipes';
import RecipeCard from '../components/recipeCard';

class BrowsePage extends Component {
  state = {
    recipes: null,
    error: false
  };

  async UNSAFE_componentWillMount() {
    try {
      const recipes = await fetchRecipes();
      this.setState({
        recipes
      });
    } catch (e) {
      this.setState({
        error: true
      });
    }
  }

  render() {
    const { classes, history } = this.props;
    const { recipes, error } = this.state;

    return (
      <div className={classes.browsePage}>
        <Typography
          variant="display2"
          gutterBottom
          data-test="browsepage-title"
        >
          Browse Recipes
        </Typography>

        <div className={classes.recipesGrid}>
          {(() => {
            if (error) {
              return (
                <Typography data-test="browsepage-error">
                  Error fetching recipes
                </Typography>
              );
            }

            if (!recipes || !recipes.length) {
              return (
                <Typography data-test="browsepage-no-results">
                  No Results
                </Typography>
              );
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
  recipesGrid: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  recipeCard: {
    marginRight: 30,
    marginBottom: 30
  }
});

export default withStyles(styles)(BrowsePage);
