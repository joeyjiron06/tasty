import React, { Component } from 'react';
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core/styles';
import {
  Typography,
  Card,
  CardMedia,
  CardContent
} from '@material-ui/core';
import { fetchRecipes } from '../model/recipes';

const theme = createMuiTheme({});

const RecipeStyles = {
  card: {
    width: 250,
    cursor: 'pointer',
    display: 'inline-block',
    opacity: 0.9,
    transition: 'opacity 250ms ease-in-out',
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
    <MuiThemeProvider theme={theme}>
      <Card className={classes.card + ' ' + className} onClick={onClick}>
        <CardMedia
          className={classes.media}
          image={recipe.image}
          title={recipe.title}
        />
        <CardContent>
          <Typography gutterBottom variant="title" noWrap={true}>
            {recipe.title}
          </Typography>
          <Typography component="p" noWrap={true}>
            {recipe.tags.join(' · ')}
          </Typography>
        </CardContent>
      </Card>
    </MuiThemeProvider>
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
        <Typography variant="display2" gutterBottom>
          Browse Recipes
        </Typography>

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
