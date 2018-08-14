import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  GridList
} from '@material-ui/core';
import { fetchRecipes } from '../model/recipes';

const RecipeStyles = {
  card: {
    width: 250,
    cursor: 'pointer',
    display: 'inline-block',
    opacity: 0.9,
    transition: 'opacity 25ms ease-in',
    '&:hover': {
      opacity: 1
    }
  },
  media: {
    height: 260
  }
};

const Recipe = withStyles(RecipeStyles)(
  ({ recipe, classes, className, onClick }) => (
    <Card className={classes.card + ' ' + className} onClick={onClick}>
      <CardMedia
        className={classes.media}
        image={recipe.image}
        title={recipe.title}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="headline"
          component="h2"
          noWrap={true}
        >
          {recipe.title}
        </Typography>
        <Typography component="p" noWrap={true}>
          {recipe.tags.join(' · ')}
        </Typography>
      </CardContent>
    </Card>
  )
);

class BrowsePage extends Component {
  state = {
    recipes: null
  };

  async UNSAFE_componentWillMount() {
    try {
      const recipes = await fetchRecipes();
      this.setState({
        recipes
      });
    } catch (e) {}
  }

  render() {
    const { classes, history } = this.props;
    const { recipes } = this.state;
    return (
      <div className={classes.browsePage}>
        <div className={classes.recipesGrid}>
          {(recipes || []).map(recipe => (
            <Recipe
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
