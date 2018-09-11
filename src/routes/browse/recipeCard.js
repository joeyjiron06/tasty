import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core/styles';
import { Typography, Card, CardMedia, CardContent } from '@material-ui/core';
import { RecipeType } from '../../utils/types';

const theme = createMuiTheme({});

// classes prop is injected from the withStyles HOC, no need to test framework code
const RecipeCard = ({ recipe, className, onClick, classes = {} }) => (
  <MuiThemeProvider theme={theme}>
    <Card
      className={`${classes.card} ${className || ''}`}
      onClick={onClick}
      data-testid='recipecard'
    >
      <CardMedia
        className={classes.media}
        image={recipe.image || ''}
        title={recipe.title}
        data-testid='recipecard-image'
      />
      <CardContent>
        <Typography
          gutterBottom
          variant='title'
          noWrap={true}
          data-testid='recipecard-title'
        >
          {recipe.title}
        </Typography>
        <Typography component='p' noWrap={true} data-testid='recipecard-tags'>
          {(recipe.tags || []).join(' · ')}
        </Typography>
      </CardContent>
    </Card>
  </MuiThemeProvider>
);

RecipeCard.propTypes = {
  recipe: RecipeType.isRequired,
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
