import React, {Component} from 'react';
import {Link} from 'react-router-dom';
export default class LogOutPage extends Component{
    render(){
        return(
            <div>
                <div className="jumbotron text-center"> 
                        <h1>You Have Been Logged Out!!!</h1>
                        <Link to="/Login">Login Again</Link>
                        <br/>
                        <Link to="/">Home</Link>
                        <br/>
                        <Link to="/Signup">Signup</Link>
                    
                </div>

            </div>

        )
    }
}