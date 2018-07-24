import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Routes from './routes';
import { initializeApp } from 'firebase';

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
});

class App extends Component {
  UNSAFE_componentWillMount() {
    document.body.style.backgroundColor = theme.palette.primary.main;
    initializeApp({
      apiKey: 'AIzaSyDBvRtM40nJMAyoZKaRZbA5vpPI9n-USVk',
      authDomain: 'tasty-27697.firebaseapp.com',
      databaseURL: 'https://tasty-27697.firebaseio.com',
      projectId: 'tasty-27697',
      storageBucket: '',
      messagingSenderId: '145178868001'
    });
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
