import React, { Component } from 'react';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import NewsResults from './NewsResults';
import {BASE_URL,API_KEY,urlFields} from './constants';
//import Suggestions from './Suggestions';

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            query:'',
            results:null,
            errFound:false
        }
        this.search = this.search.bind(this);
        this.keySearchHandler = this.keySearchHandler.bind(this);
    }
    componentDidMount(){
        const query = localStorage.getItem("query")!==""? JSON.parse(localStorage.getItem("query")) : "";
        const results = localStorage.getItem("results")!==""? JSON.parse(localStorage.getItem("results")) : null;
        this.setState({query,results})
    }
    search(){
       const searchTopic = `${BASE_URL}?api-key=${API_KEY}&q=${this.state.query}${urlFields}`;
       fetch(searchTopic,{
           method:'GET'
       })
       .then(response => response.json())
       .then(json => {
           this.setState({results:json.response.results});
           localStorage.setItem("query",JSON.stringify(this.state.query));
           localStorage.setItem("results",JSON.stringify(json.response.results));
       })
       .catch(err => console.log("error : ",err));
       
    }

    keySearchHandler(key){
       const searchTopic = `${BASE_URL}?api-key=${API_KEY}&q=${key}${urlFields}`;
       fetch(searchTopic,{
           method:'GET'
       })
       .then(response => response.json())
       .then(json => {
           this.setState({query:key,results:json.response.results});
           localStorage.setItem("query",JSON.stringify(key));
           localStorage.setItem("results",JSON.stringify(json.response.results));
       })
       .catch(err => console.log("error : ",err));
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
               />
               :null
               }
            </div>
            
        );
    }
}

export default Search