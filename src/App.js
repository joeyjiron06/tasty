import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Routes from './routes';
const theme = createMuiTheme({
  typography: {
    display4: {
      color: 'rgba(255, 255, 255, 0.75)'
    },
    display3: {
      color: 'rgba(255, 255, 255, 0.75)'
    },
    body1: {
      color: 'rgba(255, 255, 255, 0.75)'
    },
    body2: {
      color: 'rgba(255, 255, 255, 0.75)'
    },
    title: {
      color: 'rgba(255, 255, 255, 0.8)'
    }
  }
});

class App extends Component {
  UNSAFE_componentWillMount() {
    document.body.style.backgroundColor = theme.palette.primary.main;
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Routes />
      </MuiThemeProvider>
    );
  }
}

export default App;
