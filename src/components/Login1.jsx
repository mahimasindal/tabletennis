import Axios from 'axios';
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

import Auth from './Auth.js';

export default class Login1 extends Component{
    constructor(props){
        super(props)
        console.log(this.props)
        this.state={
            isRevealPassword:false
        }

    }
    componentDidMount(){
        console.log('componentdidmount');
    }
    componentWillUnmount(){
        console.log('componentWillUnmount');
    }

    Login(){
        Auth.authenticate();
        console.log(Auth.getAuth());

    }
    togglePassword=(e)=>{
        this.setState({isRevealPassword:!this.state.isRevealPassword})
    }
    submit= e =>{
        e.preventDefault();
        console.log("data",this.email,this.password);
        let url="http://139.59.16.180:8989/authenticate";
        let data={
            email:this.email,
            password:this.password

        };
  
        Axios.post(url, data)
        .then(res => {

            localStorage.setItem('token', res.data.token.token);
            localStorage.setItem('userId',res.data.data.id);
            localStorage.setItem('email',res.data.data.email);
            localStorage.setItem('userName',res.data.data.name);
            console.log("token = "+res.data.token.token, "id="+res.data.data.id);
            this.Login();
            this.props.history.push("/");
        })
        .catch(err => {
            console.log('here is the error'+err)
            if(err.toString()==="Error: Request failed with status code 401")
            alert("Entered Email or Password is incorrect")
            else
            alert("Error while logging in")


        })

    };

    render(){

        /*Heading for BlueButton*/
        const buttonName="Continue";
        return(
            <div className="container">

                {/*Login Heading*/}
                <div className="row SignupRow1">
                 <Header heading="Login" history={this.props.history}/>
                </div>

                {/*Login Form*/}
                <div className="form-group">

                    {/*EmailID input*/}    
                    <div className="row">
                        <div className="col-12"><br/></div>
                        <div className="col-12">
                                <input type="text"  className="form-control input1" placeholder="Email ID"
                                onChange={e => this.email=e.target.value} name="Email" />
                        </div>
                    </div>

                    {/*Password input*/}
                    <div className="row" >
                        <div className="col-12"><br/></div>
                        <div className="col-12" style={{'position':"relative"}}>
                                <input type={this.state.isRevealPassword?"text":"password"}  className="form-control input1" placeholder="Password"
                                onChange={e => this.password=e.target.value} name="password" 
                                />
                                <span onClick={this.togglePassword}>
                                <span>
                                {
                                    this.state.isRevealPassword?
                                    <i className="fa fa-eye customIcon" aria-hidden="true" ></i>:
                                    <i className="fa fa-eye-slash customIcon" aria-hidden="true"></i>
                                }
                                </span>
                                </span>
                                
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





