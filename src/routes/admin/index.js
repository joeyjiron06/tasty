import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button, CircularProgress } from '@material-ui/core';
import {
  addRecipe,
  authUser,
  fetchTrash,
  checkReturingUser,
  deleteFromTrash,
  updateRecipe,
  fetchRecipes,
  deleteRecipe
} from '../../api/recipes';
import * as logger from '../../utils/logger';
import EditRecipeCard from './editRecipeCard';
import RecipePreviewCard from './recipePreviewCard';

class AdminPage extends Component {
  state = {
    user: null,
    isLoading: true
  };

  async UNSAFE_componentWillMount() {
    try {
      const user = await checkReturingUser();
      this.loadRecipes();
      this.loadTrash();
      localStorage.setItem('user', JSON.stringify(user));
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
      logger.error('error loggin in', e);
    }
  };

  handleAddRecipe = async event => {
    try {
      const recipe = {
        title: '',
        image: '',
        serves: 0,
        duration: 0,
        tags: [],
        ingredients: [],
        directions: []
      };

      this.setState({
        editRecipe: recipe
      });
    } catch (e) {
      logger.log('error', e);
    }
  };

  loadRecipes = async () => {
    this.setState({
      recipes: {
        isLoading: true,
        error: false,
        items: null
      }
    });

    try {
      const recipes = await fetchRecipes();
      this.setState({
        recipes: {
          ...this.state.recipes,
          isLoading: false,
          items: recipes.reverse()
        }
      });
    } catch (e) {
      logger.error(e);
      this.setState({
        recipes: {
          ...this.state.recipes,
          isLoading: false,
          error: true
        }
      });
    }
  };

  loadTrash = async () => {
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
      logger.error(e);
      this.setState({
        trash: {
          ...this.state.trash,
          isLoading: false,
          error: true
        }
      });
    }
  };

  handleEditRecipe = recipe => {
    this.setState({
      editRecipe: recipe
    });
  };

  render() {
    const { classes } = this.props;
    const { user, trash, recipes, isLoading, editRecipe } = this.state;

    if (!user) {
      return (
        <div className={classes.adminPage}>
          <Typography>You must log in to view this page</Typography>

          {isLoading && (
            <CircularProgress className={classes.loadingIndicator} />
          )}

          <Button
            variant='contained'
            color='secondary'
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
          <Typography variant='display1'>Admin Page</Typography>
          <Typography>
            Give admin your id if you want admin privilages
          </Typography>
          <Typography>User id: {user.uid}</Typography>
        </div>
      );
    }

    // https://photos.app.goo.gl/DjkVHV7dSyQhuaSGA
    return (
      <div className={classes.adminPage}>
        <Typography variant='display1'>Admin Page</Typography>

        {editRecipe && (
          <EditRecipeCard
            recipe={editRecipe}
            onCancel={() => {
              this.setState({ editRecipe: null });
            }}
            onSave={recipe => {
              if (!recipe.id) {
                addRecipe(recipe);
              } else {
                updateRecipe(recipe.id, recipe);
              }
              this.setState({ editRecipe: null });
            }}
            onDelete={() => {}}
          />
        )}
        <Button
          className={classes.button}
          onClick={this.handleAddRecipe}
          color='secondary'
          variant='contained'
        >
          New recipe
        </Button>

        <Typography variant='title' gutterBottom className={classes.listTitle}>
          All Recipes
        </Typography>

        {(() => {
          if (!recipes) {
            return;
          }

          if (recipes.error) {
            return (
              <div onClick={this.handleLoadRecipes}>
                Error loading recipes. Click to reload
              </div>
            );
          }

          if (recipes.isLoading) {
            return <CircularProgress className={classes.loadingIndicator} />;
          }

          if (!recipes.items.length) {
            return <div>No results</div>;
          }

          return (
            <div className={classes.recipePreviewList}>
              {recipes.items.map(recipe => (
                <RecipePreviewCard
                  key={recipe.id}
                  recipe={recipe}
                  onDelete={async () => {
                    await deleteRecipe(recipe.id);
                    await this.loadRecipes();
                  }}
                  onEdit={() => {
                    this.handleEditRecipe(recipe);
                  }}
                />
              ))}
            </div>
          );
        })()}

        <Typography variant='title' gutterBottom className={classes.listTitle}>
          Trash
        </Typography>

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
            <div className={classes.recipePreviewList}>
              {trash.items.map(recipe => (
                <RecipePreviewCard
                  key={recipe.id}
                  recipe={recipe}
                  onDelete={async () => {
                    await deleteFromTrash(recipe.id);
                    await this.loadTrash();
                  }}
                  onEdit={() => {
                    this.handleEditRecipe(recipe);
                    this.loadRecipes();
                  }}
                />
              ))}
            </div>
          );
        })()}
      </div>
    );
  }
}

const styles = theme => ({
  adminPage: {
    padding: 40,
    color: 'white'
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
  listTitle: {
    marginBottom: 10
  },
  recipePreviewList: {
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    marginBottom: 40
  }
});

export default withStyles(styles)(AdminPage);
