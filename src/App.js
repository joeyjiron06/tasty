import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Routes from './routes';
const theme = createMuiTheme({
  palette: {
    type: 'dark'
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
