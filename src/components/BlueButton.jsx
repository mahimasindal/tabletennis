import React, { Component } from 'react';


export default class BlueButton extends Component{
    submit(){
        let url="https://jsonplaceholder.typicode.com/posts";
        let data=this.props.data;
        fetch(url, {
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(data)
        }).then((result)=>{
            result.json().then((resp)=>{
                console.warn("resp",resp)
                alert("data is submitted")
            })
        })
    }
    render(){
        return(
            <div>
            <button type="button" onClick={()=>{this.submit()}} className="form-control continuebutton">{this.props.buttonName}</button>
            </div>
        )
    }
}