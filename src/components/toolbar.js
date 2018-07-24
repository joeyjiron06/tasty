import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import { Typography, IconButton, Icon } from '@material-ui/core';

class Toolbar extends Component {
  handleRouteClicked = name => event => {
    this.props.history.push(name);
  };

  render() {
    const { classes, history } = this.props;
    return (
      <div className={classes.toolbar}>
        <IconButton>
          <Icon>search</Icon>
        </IconButton>

        <div className={classes.routes}>
          <Typography
            className={
              classes.routeName +
              ' ' +
              (history.location.pathname === '/recipes'
                ? classes.routeSelected
                : null)
            }
            onClick={this.handleRouteClicked('/recipes')}
          >
            Recipes
          </Typography>
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    zIndex: 1000,
    paddingLeft: 20,
    paddingRight: 40
  },
  routes: {
    display: 'flex',
    'justify-content': 'flex-end',
    'flex-grow': 1
  },
  routeName: {
    cursor: 'pointer',
    borderBottomWidth: 2,
    borderBottomStyle: 'solid',
    borderBottomColor: 'transparent',
    paddingBottom: 4
  },
  routeSelected: {
    borderBottomColor: theme.palette.secondary.main
  }
});

export default withStyles(styles)(withRouter(Toolbar));
