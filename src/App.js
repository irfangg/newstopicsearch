import React, { Component } from 'react';
import Search from './components/Search';
import './App.css';
import ErrorBoundary from './exception/ErrorBoundary';

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