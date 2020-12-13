import React, {Component} from 'react';
import Tournaments from './Tournaments';
import Footer from './Footer';

export default class TournamentLoggedIn extends Component{
    render(){
        return(
            <>
            <Tournaments history={this.props.history} ></Tournaments>
            <Footer history={this.props.history} active={1}></Footer>
            </>

        )
    }
}