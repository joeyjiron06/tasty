import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const HomePage = ({ classes }) => (
  <div className={classes.homePage}>
    <div className={classes.bgImageContainer}>
      <img
        className={classes.bgImage}
        src="img/home-bg-1.jpg"
        alt="background"
      />
      <div className={classes.bgImageOverlay} />
    </div>

    <div className={classes.titleContainer}>
      <Typography variant="display4">Tasty</Typography>
      <Typography variant="subheading">Recipes made easy</Typography>
    </div>
  </div>
);

const styles = theme => ({
  homePage: {},
  homePageContent: {
    display: 'flex',
    flexDirection: 'column'
  },
  bgImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1
  },
  bgImage: {
    width: '100%',
    height: '100%',
    'object-fit': 'cover',
    'object-position': 'center'
  },
  bgImageOverlay: {
    backgroundColor: theme.palette.primary.main,
    opacity: 0.6,
    filter: 'saturate(200%)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
});

export default withStyles(styles)(HomePage);
