import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { auth, database } from 'firebase';

class AdminPage extends Component {
  state = {
    user: null,
    isLoading: false
  };

  handleLogin = async event => {
    this.setState({
      isLoading: true,
      user: null
    });

    try {
      const user = await this.fetchUser();

      const isAdminSnapshot = await database()
        .ref('admins')
        .child(user.uid)
        .once('value');

      user.isAdmin = isAdminSnapshot.val();
      this.setState({
        user
      });
    } catch (e) {
      console.error('error loggin in', e);
    }
  };

  handleAddNewButton = async event => {
    try {
      const recipeSnapshot = await database()
        .ref('recipes')
        .push({
          dateAdded: database.ServerValue.TIMESTAMP,
          duration: 0,
          tags: [],
          ingredients: [],
          directions: [],
          title: null
        });

      this.props.history.push(`/recipe/${recipeSnapshot.key}`);
    } catch (e) {
      console.log('error', e);
    }
  };

  async fetchUser() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      return JSON.parse(savedUser);
    }

    const authResult = await auth().signInWithPopup(
      new auth.FacebookAuthProvider()
    );
    const user = authResult.user;

    localStorage.setItem(JSON.stringify(user));

    return user;
  }

  render() {
    const { classes } = this.props;
    const { user } = this.state;

    if (!user) {
      return (
        <div className={classes.adminPage}>
          <Typography>You must log in to view this page</Typography>

          <Button
            variant="contained"
            color="secondary"
            className={classes.loginButton}
            onClick={this.handleLogin}
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
        <Button className={classes.button} onClick={this.handleAddNewButton}>
          New recipe
        </Button>
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
    marginTop: 20
  }
});

export default withStyles(styles)(AdminPage);
