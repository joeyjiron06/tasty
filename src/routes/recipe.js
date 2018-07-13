import React, { Component } from 'react';
import { Typography, Divider, Icon } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';



class RecipePage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.page}>
        <div className={classes.infoContainer}>
          <Typography variant="display3" className={classes.title}>
            Tacos
          </Typography>

          <Divider />

          <div className={classes.subtitleContainer}>
            <div className={classes.timeAndServicesContainer}>
              <div className={classes.timeContainer}>
                <Icon>access_time</Icon>
                <div>1 hour</div>
              </div>

              <div>
                <Icon>add</Icon>
                <Icon>people_outline</Icon>
                <Icon>remove</Icon>
              </div>
            </div>

            <div className={classes.tagsContainer}>
              <div className={classes.chip}>Vegan</div>
              <div className={classes.chip}> Breakfast</div>
            </div>
          </div>

          <div className={classes.ingredients}>
            <Typography variant="title">Ingredients</Typography>
            <div>
              <Typography>1 head of Cauliflower</Typography>
              <Typography>12 Corn tortillas</Typography>
              <Typography>2 cups of rice</Typography>
              <Typography>2.5 limes</Typography>
              <Typography>1 bunch of cilantro</Typography>
              <Typography>2 Jalapenos</Typography>
              <Typography>Tomatillo salsa</Typography>
              <Typography>Onion powder</Typography>
            </div>
          </div>

          <div className={classes.directions}>
            <Typography variant="title">Directions</Typography>
            <div className={classes.directionsList}>
              {`Marinate the cauliflower. Cut up cauliflower and marinate with olive oil (enough to coat it on the outside) then add chipotle powder, onion powder, a whole lime and salt and pepper. Let it marinade for as much time as you have or while you perepare the rest.
                Roast the cauliflower in the oven at 425℉ for 35-45min checking on it periodically.
                Start boiling water for the next step.
                After twenty minutes of roasting the cauliflower add your corn to boiling water and let it cook for 15 minutes.
                Immediately after putting the corn on start making cilantro lime rice.
                Once the rice and corn is done, check on your cauliflower.
                Serve on your tortillas and garnish with cilantro, jalapenos (fresh or pickled), onions and lime`
                .split('\n')
                .map((step, index) => (
                  <div key={step} className={classes.directionStep}>
                    <Typography className={classes.directionNumber}>
                      {index + 1}
                    </Typography>
                    <Typography className={classes.directionText}>
                      {step}
                    </Typography>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  page: {
    width: '100vw',
    height: '100vh',
    background: theme.palette.primary.main
  },
  infoContainer: {
    border: 'solid 1px red'
  },
  title: {
    letterSpacing: 2.8
  },
  subtitleContainer: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: '20px 0'
  },
  timeAndServicesContainer: {
    display: 'flex',
    alignItems:'center',
    flexShrink: 0,
    marginRight: 40,
  },
  timeContainer: {
    display: 'flex',
    alignItems:'center'
  },
  tagsContainer: {
    flexShrink: 0,
    display:'flex',
  },
  chip: {
    border: 'solid 1px rgba(255, 255, 255,0.7)',
    padding: '10px 14px',
    marginRight: 10,
    borderRadius: 100
  },
  directionsList: {},
  directionStep: {
    display: 'flex',
    marginBottom: 20
  },
  directionNumber: {
    minWidth: 40,
    display: 'inline'
  },
  directionText: {
    display: 'inline'
  }
});

export default withStyles(styles)(RecipePage);
