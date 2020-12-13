import React, {Component} from 'react';
import Header from './Header';
import Fixtures from './Fixtures';

export default class Fixture extends Component{
    render(){
        return(
            <>
            <Header heading="View fixtures" history={this.props.history}></Header>
            <Fixtures heading="View fixtures" history={this.props.history}></Fixtures>
            </>
        )
    }


}