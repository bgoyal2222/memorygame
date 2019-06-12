
import { Provider } from 'react-redux'
import React, {Component} from 'react';
import configureStore from './src/store';
import Main from './src/Main';


export default class App extends Component{
  
  render() {
    return (
      <Provider store={configureStore()}>
        <Main/>
      </Provider>
    );
  }
}

