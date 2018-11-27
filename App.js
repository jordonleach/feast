import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import Router from './src/Router';

export default class App extends React.Component {
  componentWillMount() {
    const config = {
      apiKey: "AIzaSyDV3m4OtDZWDHGPzA-dwaiEDKhEEUOHDFg",
      authDomain: "feast-f32e4.firebaseapp.com",
      databaseURL: "https://feast-f32e4.firebaseio.com",
      projectId: "feast-f32e4",
      storageBucket: "feast-f32e4.appspot.com",
      messagingSenderId: "174419788589"
    };

    firebase.initializeApp(config);
  }


  render() {
    const store = createStore(
      reducers, 
      {}, 
      applyMiddleware(ReduxThunk)
    );

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

