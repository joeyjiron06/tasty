import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core/styles';
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardMedia,
  CardContent
} from '@material-ui/core';
import { blue, red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: blue
  }
});

const RecipePreviewCard = ({
  recipe,
  onDelete,
  onEdit,
  classes,
  ...otherProps
}) => (
  <MuiThemeProvider theme={theme} {...otherProps}>
    <Card className={classes.root}>
      <CardMedia
        className={classes.image}
        image={recipe.image || 'nothinghere'}
        title={recipe.title || 'recipe'}
      />
      <CardContent>
        <Typography gutterBottom variant='headline' component='h2' noWrap>
          {recipe.title || 'No title'}
        </Typography>
        <Typography component='p'>{recipe.id || 'No id'}</Typography>
      </CardContent>
      <CardActions>
        <Button
          classes={{
            label: classes.deleteButton
          }}
          size='small'
          color='primary'
          onClick={onDelete}
        >
          Delete
        </Button>
        <Button
          classes={{
            label: classes.editButton
          }}
          size='small'
          color='primary'
          onClick={onEdit}
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  </MuiThemeProvider>
);

RecipePreviewCard.propTypes = {
  recipe: PropTypes.object.isRequired
};

const styles = theme => ({
  root: {
    width: 220,
    marginRight: 20,
    display: 'inline-block'
  },
  image: {
    minHeight: 160,
    backgroundColor: 'grey'
  },
  deleteButton: {
    color: red[500]
  },
  editButton: {
    color: theme.palette.primary.main
  }
});

export default withStyles(styles)(RecipePreviewCard);
