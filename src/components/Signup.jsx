import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Header from './Header';

export default class Signup extends Component{

    constructor(props){
        super(props);
        console.log(this.props.history)
        this.state={
            name:"",
            email:"",
            password:"",
            password2:"",
            isRevealPassword:false,
            isRevealPassword2:false
        }
    }

    togglePassword=(e)=>{
        this.setState({isRevealPassword:!this.state.isRevealPassword})
        

    }

    togglePassword2=(e)=>{
        this.setState({isRevealPassword2:!this.state.isRevealPassword2})
    }

    submit= e =>{
        e.preventDefault();
        
        let url="http://139.59.16.180:8989/register";
        let data={
            email:this.state.email,
            name:this.state.name,
            password:this.state.password

        };
        console.log(data.email,data.name,data.password);
        localStorage.setItem("password",data.password)
        localStorage.setItem("name",data.name)
  
        Axios.post(url, data)
        .then(res => {

            localStorage.setItem('email',res.data.email);
            localStorage.setItem('userId',res.data.id);
            this.props.history.push("/Otp");
        })
        .catch(err => {
            var pattern = new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/);
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            console.log(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email),"here")

            if((this.state.email==="")||(this.state.name==="")||(this.state.password==="")||(this.state.password2===""))
            alert("Entered all the required fields")
            else if (re.test(this.state.email)!==true)
            alert("Entered email is not valid")

            else if(pattern.test(this.state.password)!==true)
            alert("password must contain one capital letter, one number, one smalll letter and must be of length 8-20")
            
            else if(this.state.password!==this.state.password2)
            alert("Both the passwords doesn't match")
            else if(err.toString()==="Error: Request failed with status code 400")
            alert("An account already exists with this email")
            console.log('here is the error'+err)
        })

    };
    render(){

        return(
            <div className="container">

                {/*Heading Of the page*/}
                <div className="row SignupRow1">
                <Header heading="Sign up" history={this.props.history}/>
                </div>
                
                {/*Form for Signup*/}
                <div className="form-group">
                    
                    {/*input for name*/}
                    <div className="row">
                        <div className="col-12">
                                <input type="text" value={this.state.name} name="Name" onChange={(data)=>{this.setState({name:data.target.value})}} className="form-control input1" placeholder="Name" required />
                        </div>
                    </div>
                     
                     {/*input for Email*/}
                    <div className="row">
                        <div className="col-12"><br/></div>
                        <div className="col-12">
                                <input type="text" value={this.state.email} name="Email" onChange={(data)=>{this.setState({email:data.target.value})}} className="form-control input1" placeholder="Email" required/>
                        </div>
                    </div>
                    {/*value={this.state.password} name="password" onChange={(data)=>{this.setState({password:data.target.value})}} */}
                    
                     {/*input for Password*/}
                     <div className="row" >
                        <div className="col-12"><br/></div>
                        <div className="col-12" style={{'position':"relative"}}>
                                <input type={this.state.isRevealPassword?"text":"password"}  className="form-control input1" placeholder="Password"
                                value={this.state.password} name="password" onChange={(data)=>{this.setState({password:data.target.value})}}
                                name="password" 
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
                    </div>

                    {/*input for confirm Password*/}
                    <div className="row" >
                        <div className="col-12"><br/></div>
                        <div className="col-12" style={{'position':"relative"}}>
                                <input type={this.state.isRevealPassword2?"text":"password"}  className="form-control input1" placeholder="Confirm Password"
                                value={this.state.password2} name="password" onChange={(data)=>{this.setState({password2:data.target.value})}}
                                name="password" 
                                />
                                <span onClick={this.togglePassword2}>
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
                    
                    {/*button to generate OTP*/}
                    <div className="row">
                        <div className="col-12">
                                
                       
                       <button type="button" onClick={this.submit} className="form-control continuebutton">Continue</button>
                        

                        </div>
                    </div>
                
                </div>
            
            {/*Link to Login Page*/}
                <div className="row SignupRowLast">
                    <div className="col-12">
                            Already have an account? <Link to="/Login">Login</Link>
                    </div>
                </div>
                

            </div>
        )
    }
}