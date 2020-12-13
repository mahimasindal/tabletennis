import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import image1 from "../shared/images/table-tennis-rackets.png"
import TournamentLoggedIn from './TournamentsLoggedIn';

export default class Home extends Component{

    render(){
        console.log('history',this.props.history)

        if(localStorage.getItem('token'))
        {
            return(
                <div>
                    <TournamentLoggedIn history={this.props.history}/>
                </div>
                
            )
        }

        else{
            return(
                <div className="row">
                        
                        {/*Main Image of the page*/}
                        <img src={image1} className="sidenav" alt="table-tennis"/>

                        <div className="hometext main">

                            {/*Heading of the page*/}
                            <div>Table Tennis Pro</div>
                            <br/>

                            {/*Links to pages*/}
                            <Link to='/Login' history={this.props.history}><button type="button" className="loginbutton">Login</button></Link>
                            <Link to='/Signup' history={this.props.history}><div className="signupbutton">Signup</div></Link>
                            <Link to='/Tournaments' history={this.props.history}><div className="signupbutton">Continue as Audience</div></Link>
                        </div>
                        
                
                </div>
            
            )
        }
}
}