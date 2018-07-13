import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Routes from './routes';
const theme = createMuiTheme({
  typography: {
    display4: {
      color: 'rgba(255, 255, 255, 0.54)'
    },
    display3: {
      color: 'rgba(255, 255, 255, 0.54)'
    },
    body1: {
      color: 'rgba(255, 255, 255, 0.54)'
    },
    body2: {
      color: 'rgba(255, 255, 255, 0.54)'
    },
    title: {
      color: 'rgba(255, 255, 255, 0.54)'
    }
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Routes />
      </MuiThemeProvider>
    );
  }
}

export default App;
