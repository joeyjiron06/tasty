import React, { Component } from 'react';
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core/styles';
import {
  Typography,
  Button,
  CircularProgress,
  Card,
  CardActions,
  CardMedia,
  CardContent
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

import {
  addRecipe,
  authUser,
  fetchTrash,
  checkReturingUser,
  deleteFromTrash
} from '../api/recipes';

const theme = createMuiTheme({
  palette: {
    primary: blue
  }
});

class AdminPage extends Component {
  state = {
    user: null,
    isLoading: true
  };

  async UNSAFE_componentWillMount() {
    try {
      const user = await checkReturingUser();
      this.setState({ user, isLoading: false });
    } catch (e) {
      this.setState({
        isLoading: false
      });
    }
  }

  handleLogin = async event => {
    this.setState({
      isLoading: true,
      user: null
    });

    try {
      const user = await authUser();
      localStorage.setItem('user', JSON.stringify(user));

      this.setState({
        user
      });
    } catch (e) {
      console.error('error loggin in', e);
    }
  };

  handleAddNewButton = async event => {
    try {
      const newRecipeId = await addRecipe();
      this.props.history.push({
        pathname: `/recipe/${newRecipeId}`,
        state: {
          allowEditMode: true
        }
      });
    } catch (e) {
      console.log('error', e);
    }
  };

  handleShowTrash = async () => {
    this.setState({
      trash: {
        isLoading: true,
        error: false,
        items: null
      }
    });

    try {
      const trashItems = await fetchTrash();
      this.setState({
        trash: {
          ...this.state.trash,
          isLoading: false,
          items: trashItems
        }
      });
    } catch (e) {
      console.error(e);
      this.setState({
        trash: {
          ...this.state.trash,
          isLoading: false,
          error: true
        }
      });
    }
  };

  handleDeleteRecipe = recipe => async () => {
    await deleteFromTrash(recipe.id);
    await this.handleShowTrash();
  };

  handleEditRecipe = recipe => () => {
    this.props.history.push({
      pathname: `/recipe/${recipe.id}`,
      state: {
        recipe
      }
    });
  };

  render() {
    const { classes } = this.props;
    const { user, trash, isLoading } = this.state;

    if (!user) {
      return (
        <div className={classes.adminPage}>
          <Typography>You must log in to view this page</Typography>

          {isLoading && (
            <CircularProgress className={classes.loadingIndicator} />
          )}

          <Button
            variant="contained"
            color="secondary"
            className={classes.loginButton}
            onClick={this.handleLogin}
            disabled={isLoading}
          >
            Log in with Facebook
          </Button>
        </div>
      );
    }

    if (!user.isAdmin) {
      return (
        <div className={classes.adminPage}>
          <Typography variant="display1">Admin Page</Typography>
          <Typography>
            Give admin your id if you want admin privilages
          </Typography>
          <Typography>User id: {user.uid}</Typography>
        </div>
      );
    }

    return (
      <div className={classes.adminPage}>
        <Typography variant="display1">Admin Page</Typography>

        <Button
          className={classes.button}
          onClick={this.handleAddNewButton}
          color="secondary"
          variant="contained"
        >
          New recipe
        </Button>

        <Button
          className={classes.button}
          onClick={this.handleShowTrash}
          color="secondary"
          variant="contained"
        >
          Show Trash
        </Button>

        {(() => {
          if (!trash) {
            return;
          }

          if (trash.error) {
            return (
              <div onClick={this.handleShowTrash}>
                Error loading trash. Click to reload
              </div>
            );
          }

          if (trash.isLoading) {
            return <CircularProgress className={classes.loadingIndicator} />;
          }

          if (!trash.items.length) {
            return <div>No results</div>;
          }

          return (
            <MuiThemeProvider theme={theme}>
              <div className={classes.trashContainer}>
                {trash.items.map(recipe => (
                  <Card className={classes.trashCard} key={recipe.id}>
                    <CardMedia
                      className={classes.trashCardImage}
                      image={recipe.image || 'nothinghere'}
                      title={recipe.title || 'recipe'}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="headline"
                        component="h2"
                      >
                        {recipe.title || 'No title'}
                      </Typography>
                      <Typography component="p">
                        {recipe.id || 'No id'}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={this.handleDeleteRecipe(recipe)}
                      >
                        Delete
                      </Button>
                      <Button
                        size="small"
                        color="primary"
                        onClick={this.handleEditRecipe(recipe)}
                      >
                        Edit
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </div>
            </MuiThemeProvider>
          );
        })()}
      </div>
    );
  }
}

const styles = theme => ({
  adminPage: {
    padding: 40
  },
  input: {
    display: 'block'
  },
  loginButton: {
    marginTop: 20
  },
  button: {
    marginTop: 20,
    marginRight: 20,
    marginBottom: 20
  },
  loadingIndicator: {
    display: 'block',
    marginTop: 20,
    marginBottom: 20,
    color: 'white'
  },
  trashContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 40
  },
  trashCard: {
    width: 220,
    marginRight: 20,
    marginBottom: 20
  },
  trashCardImage: {
    minHeight: 100,
    backgroundColor: 'grey'
  }
});

export default withStyles(styles)(AdminPage);
