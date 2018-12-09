import React, { Component } from 'react';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import NewsResults from './NewsResults';
//import Suggestions from './Suggestions';

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            query:'',
            results:null
        }
        this.search = this.search.bind(this);
        this.keySearchHandler = this.keySearchHandler.bind(this);
    }
    
    search(){
        const BASE_URL ='http://content.guardianapis.com/search';
        const API_KEY = 'test';
        const otherFields = '&show-fields=thumbnail,headline&show-tags=keyword&page=1&page-size=10';
    
        const searchTopic = `${BASE_URL}?api-key=${API_KEY}&q=${this.state.query}${otherFields}`;
      console.log(searchTopic);
       fetch(searchTopic,{
           method:'GET'
       })
       .then(response => response.json())
       .then(json => {
           this.setState({results:json.response.results});
           console.log(this.state)
           
       })
       .catch(err => console.log("error : ",err));
       
    }

    keySearchHandler(key){
        console.log(key);
        this.setState({query:key});
        console.log(this.state)
        this.search();
    }
    render(){
        return(
            <div className="App">
               <div className="App-title">
                    <h1 style={{color:'darkgray'}}>News Lister</h1>
               </div>
               <FormGroup className="container">
                    <InputGroup>
                        <FormControl type="text" 
                        placeholder="Search for a news topic"
                        value={this.state.query}
                        onKeyPress={event => {
                            if(event.key === 'Enter'){
                               this.search();
                            }
                        }}
                        onChange={event => {this.setState({query:event.target.value})}}/>
                        <InputGroup.Addon 
                            onClick={() => this.search()}>
                            <Glyphicon glyph="search"></Glyphicon>
                        </InputGroup.Addon>
                    </InputGroup>
               </FormGroup>
               {this.state.results!==null?
               <NewsResults results={this.state.results}
                   keySearchHandler={this.keySearchHandler}
               />:null
               }
            </div>
            
        );
    }
}

export default Search