import React, {Component} from 'react';
import {Grid,Row,Col,Image} from 'react-bootstrap';
import '../App.css';

class NewsResults extends Component{
    render(){
        let results = [{
            webUrl:'', 
            fields:{'headline':'','thumbnail':''},
            tags: [{'webTitle':''},{'webTitle':''},{'webTitle':''}]
        }];
        results = this.props.results !==null ? results = this.props.results : results;
        return(
        
            <Grid>
            { results.length!==0 ?
              results.map((res, index)=>
                    <Row className="show-grid thumbnail resultRow"  key={index}>
                        <Col xs={12} md={4}>
                            <div className="profile">
                            <a href={res.webUrl}>
                                <Image src={res.fields.thumbnail ? res.fields.thumbnail :  require('../resources/loading.gif') } thumbnail/>
                            </a>
                            </div>
                        </Col>
                        <Col xs={12} md={8} >
                            <Row className="show-grid">
                            <a href={res.webUrl}><h2>{res.fields.headline}</h2></a>
                            </Row>
                            <Row className="show-grid">
                                {res.tags.map((tag,index)=>
                                    <Col xs={3} md={3} key={index}>
                                        <label className='keywords' onClick={()=>this.props.keySearchHandler(tag.webTitle)}>{tag.webTitle}</label>
                                    </Col>)
                                }
                            </Row>
                        </Col>
                    </Row>
                )
                : <div className="show-grid thumbnail resultRow" style={{background:'lightgoldenrodyellow'}}><h4>Sorry, no results found !</h4></div>  
            }
          </Grid> 
        )
    }
}

export default NewsResults;