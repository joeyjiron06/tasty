import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core/styles';
import { Typography, Card, CardMedia, CardContent } from '@material-ui/core';

const theme = createMuiTheme({});

// classes prop is injected from the withStyles HOC, no need to test framework code
const RecipeCard = ({ recipe, className, onClick, classes = {} }) => (
  <MuiThemeProvider theme={theme}>
    <Card
      className={[classes.card || '', className || ''].join(' ').trim()}
      onClick={onClick}
      data-test="recipecard-card"
    >
      <CardMedia
        className={classes.media}
        image={recipe.image || ''}
        title={recipe.title}
        data-test="recipecard-image"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="title"
          noWrap={true}
          data-test="recipecard-title"
        >
          {recipe.title}
        </Typography>
        <Typography component="p" noWrap={true} data-test="recipecard-tags">
          {(recipe.tags || []).join(' · ')}
        </Typography>
      </CardContent>
    </Card>
  </MuiThemeProvider>
);

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func
};

const RecipeCardStyles = {
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

export default withStyles(RecipeCardStyles)(RecipeCard);
