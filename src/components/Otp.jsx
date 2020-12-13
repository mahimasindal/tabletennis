import React, {Component} from 'react'

import Header from './Header';
import Axios from 'axios';


export default class Otp extends Component{

    constructor(props){
        super(props);
        console.log(this.props.history)
        this.state={
            OTP:""
        }
    }

    submit= e =>{
        e.preventDefault();
        
        let url="http://139.59.16.180:8989/verification";
        let data={
            otp:this.state.OTP,
            email:localStorage.getItem('email')

        };
        console.log(data.email,data.otp);
        console.log(URL,data)
  
        Axios.post(url, data)
        .then(res => {
            console.log(res);
            localStorage.setItem('token',res.data.token.token)
            localStorage.setItem('userName',res.data.data.name)

            console.log('token=',localStorage.getItem('token'))
            alert("Account has been created successfully")
            this.props.history.push("/");

            
        })
        .catch(err => {
            console.log('here is the error'+err);
            alert("Either incorrect or expired OTP");
            console.log(err==="Request failed with status code 408");
            


        })

    };

    resendOtp=(e)=>{
        e.preventDefault();
        let url="http://139.59.16.180:8989/resendotp";
        let data={
            "email":localStorage.getItem('email'),
            "password":localStorage.getItem('password'),
            "name":localStorage.getItem('name')

        };
        console.log(data.email);
        console.log(url,data)
       console.log("before axios of OTP resend")
        Axios.post(url, data)
        .then(res => {
            console.log(res);
            alert("OTP has been Resent");
            
        })
        .catch(err => {
            console.log('here is the error'+err);
            alert("There was an error while resending OTP");            

        })

    }
      
    render(){
        const heading="Otp";
        return(
            <div className="container">
                 <div className="row SignupRow1">
                 <Header heading="Enter OTP" history={this.props.history}/>

                </div>

                <div className="form-group">
                <div className="row">
                    <div className="col-12"><br/></div>
                    <div className="col-12">
                            
                        {/*<div className="mb-6 text-center">
                            <div id="otp" className="flex justify-center">
                                <input className="m-2 text-center form-control1 form-control-solid rounded focus:border-blue-400 focus:shadow-outline" type="text" id="first" maxlength="1" />
                                <input className="m-2 text-center form-control1 form-control-solid rounded focus:border-blue-400 focus:shadow-outline" type="text" id="second" maxlength="1" />
                                <input className="m-2 text-center form-control1 form-control-solid rounded focus:border-blue-400 focus:shadow-outline" type="text" id="third" maxlength="1" />
                                <input className="m-2 text-center form-control1 form-control-solid rounded focus:border-blue-400 focus:shadow-outline" type="text" id="fourth" maxlength="1" />
                            </div>
                        </div>*/}
                        <div className="mb-6 text-center">
                            <div id="otp" className="flex justify-center">
                                <input type="text" value={this.state.OTP} name="OTP" onChange={(data)=>{this.setState({OTP:data.target.value})}} className="form-control input1" placeholder="Enter OTP" />

                            </div>
                        </div>
	                                                
                    </div>
                    <div className="col-12"><br/><br/></div>
                </div>
               
                <div className="row">
                    <div className="col-12 text-center signupbutton" onClick={this.resendOtp}>
                        Resend OTP
                    </div>
                    <div className="col-12" ><br/></div>
                    <div className="col-12">
                        <button type="button" onClick={this.submit} className="form-control continuebutton">Continue</button>
                    </div>
                </div>
            </div>

            </div>
        )
    }
}