import Axios from 'axios';
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import { Link } from 'react-router-dom';

import Auth from './Auth.js';

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            email:"",
            password:"",
            isLoading:true
    
        }
       
        this.Login=this.Login.bind(this);
        
    }
    handleEmailChange=(e) => {
        this.setState({
            email:e.target.value
        })
    }

    handlePasswordChange=(e) => {
        this.setState({
            password:e.target.value
        })
    }
    
    

    Login(){
        Auth.authenticate();
        console.log(Auth.getAuth());

    }
    submit=()=>{
        console.log(this.email,this.password
            );
        let url="http://139.59.16.180:8989/authenticate";
        console.log(this.state);
        let data={
            "email":this.state.email,
            "password":this.state.password

        };

        Axios.post(url, data)
        .then(res => {
            this.setState({isLoading : false});
            localStorage.setItem('token', res.data.token);
            console.log("token = "+res.data.token);
            this.Login();
            return <Redirect to="/" />
        })
        .catch(err => {
            console.log('here is the error'+err)
        })
        console.log("here"+Auth.getAuth())
        if (Auth.getAuth()) {
            console.log("here2"+this.getAuth)
           
        }
    };

    render(){

        /*Heading for BlueButton*/
        const buttonName="Continue";
        return(
            <div className="container">

                {/*Login Heading*/}
                <div className="row SignupRow1">
                    <div className="col-12">Login</div>
                </div>

                {/*Login Form*/}
                <div className="form-group">

                    {/*EmailID input*/}    
                    <div className="row">
                        <div className="col-12"><br/></div>
                        <div className="col-12">
                                <input type="text" value={this.state.email} className="form-control input1" placeholder="Email ID"
                                onChange={this.handleEmailChange} name="Email" />
                        </div>
                    </div>

                    {/*Password input*/}
                    <div className="row">
                        <div className="col-12"><br/></div>
                        <div className="col-12">
                                <input type="password" value={this.state.password} className="form-control input1" placeholder="Password"
                                onChange={this.handlePasswordChange} name="password"/>
                        </div>
                        <div className="col-12"><br/><br/></div>
                    </div>

                    {/*Blue Button*/}
                    <div className="row">
                    <div className="col-12">
                       <button type="button" onClick={this.submit} className="form-control continuebutton">{buttonName}</button>
                    </div>
                    </div>
            
                </div>
                {/*Link to Signup Page*/}
                <div className="row SignupRowLast">
                    <div className="col-12">
                            Do not have have an account? <Link to="/Signup">Signup</Link>
                    </div>
                </div>
                
            </div>
        )
    }
}