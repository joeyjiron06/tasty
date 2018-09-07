import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { fetchRecipes } from '../api/recipes';
import RecipeCard from '../components/recipeCard';

class BrowsePage extends Component {
  state = {
    recipes: null
  };

  async UNSAFE_componentWillMount() {
    this.mounted = true;
    try {
      const recipes = await fetchRecipes();
      this.setState({
        recipes
      });
    } catch (e) {}
  }

  UNSAFE_componentWillUnMount() {
    this.mounted = false;
  }

  render() {
    const { classes, history } = this.props;
    const { recipes } = this.state;
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
          {(recipes || []).map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              className={classes.recipeCard}
              onClick={() => {
                history.push(`/recipe/${recipe.id}`);
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}

export const styles = theme => ({
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
