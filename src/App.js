import React, { Component } from 'react';
import Search from './components/Search';
import ErrorBoundary from './exception/ErrorBoundary';
import './App.css';

class App extends Component{   
    render(){ 
        return(
          <ErrorBoundary>
            <Search />
          </ErrorBoundary>
          
        );
    }
}

export default App;