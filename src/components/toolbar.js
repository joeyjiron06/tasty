import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import { Typography, IconButton, Icon, TextField } from '@material-ui/core';

class Toolbar extends Component {
  state = {
    showSearchField: false
  };
  handleRouteClicked = name => event => {
    this.props.history.push(name);
  };
  handleSearchChanged = event => {};

  handleSearchIconClicked = event => {
    const showSearchField = !this.state.showSearchField;

    this.setState(
      {
        showSearchField
      },
      () => {
        if (showSearchField) {
          this.searchInputRef.focus();
        } else {
          this.searchInputRef.blur();
        }
      }
    );
  };

  render() {
    const { classes, history } = this.props;
    const { showSearchField } = this.state;

    return (
      <div className={classes.toolbar}>
        <div>
          <IconButton onClick={this.handleSearchIconClicked}>
            <Icon>search</Icon>
          </IconButton>
          <TextField
            inputRef={ref => (this.searchInputRef = ref)}
            onChange={this.handleSearchChanged}
            className={`${classes.searchInput}
            
            ${
              showSearchField
                ? classes.searchInputShown
                : classes.searchInputHidden
            }
            `}
          />
        </div>

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
  },
  searchInput: {
    transition: 'width 250ms ease-out'
  },
  searchInputShown: {
    width: 200
  },
  searchInputHidden: {
    width: 0
  }
});

export default withStyles(styles)(withRouter(Toolbar));
