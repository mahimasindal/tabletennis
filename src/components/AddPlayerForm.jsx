import React, { Component } from 'react';
import Axios from 'axios';

import RoundAvatar from "../shared/images/RoundAvatar.png"
import Header from './Header';

export default class AddPlayerForm extends Component{
    constructor(props){
        super(props)
        this.state={photoPath:RoundAvatar,
                    image:null
                    }
    }
    submit= e =>{
    if(typeof(this.email)==="undefined" || typeof(this.name)==="undefined" ||
    typeof(this.age)==="undefined" || typeof(this.gender)==="undefined")
    {
        alert("Enter all the required data")
    }

   else if ( /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email) ===false) {
        alert("Email Id entered is incorrect")
    }
    else if(this.age<3){
        alert("Age must me greater than 3")

    }
   
    else{
        
        e.preventDefault();
        let url="http://139.59.16.180:8989/player/add";
        const token=localStorage.getItem('token');
        console.log(token);

        var formData = new FormData()
        formData.append("file",this.state.image)
        
        let theWrapper={ 'data':{ 
            'name':this.name,
            'email':this.email,
            'gender':this.gender,
            'age':this.age
            
        }
    
    };
    formData.append("theWrapper",JSON.stringify(theWrapper))
        console.log(url,theWrapper.data.gender,token,this.name, this.email,this.age);
        console.log("formData=",formData)
        console.log("Gender=",this.gender);
        Axios.post(url,
             formData,
             {headers: {Authorization: 'Bearer ' + token}},
             )
        .then(res => {
            console.log("data = "+res.data);
            alert("player has been successfully added");
            this.props.history.push("/PlayerList");
        })
        .catch(err => {
            alert("there was an error adding the player");
            console.log('here is the error'+err)
        })
    }
    };

    photoChange=(e)=>{
        const reader = new FileReader();
        reader.onload=()=>{
            if(reader.readyState===2){
                console.log('here')
                this.setState({photoPath:reader.result})
            }
        }
        reader.readAsDataURL(e.currentTarget.files[0])
       
        console.log("here in photo Change")
        console.log(e.currentTarget.files[0])
        this.setState({image:e.currentTarget.files[0]})
        console.log("obj=",URL.createObjectURL(e.currentTarget.files[0]))
    }
    

    render(){
        /*eslint-disable-next-line*/
        /*Heading*/
        const heading="Add Player";
        const photo=this.state.photoPath
        return(
            <div>
                {/*Header Component*/}
                 <Header heading={heading} history={this.props.history}></Header>

                 {/*Avatar*/}
                 <img src={photo} className="roundprofileimg" alt="Avatar"></img>
                 
                 {/*Add photo link*/}
                 {
                     this.state.image===null?
                     <div className="addPhoto1 text-center">
                        <label for="img">Add photo</label>
                        <input type="file" onChange ={this.photoChange} id="img" name="img" accept="image/*" className="custom-file-input"></input>
                    </div>:
                    <div className="addPhoto1 text-center">
                        <label for="img">Change photo</label>
                        <input type="file" onChange ={this.photoChange} id="img" name="img" accept="image/*" className="custom-file-input"></input>
                    </div>

                 }
                

                {/*Form for adding details*/}
                <form className="form1">
                    <div className="row">
                        {/*Name field*/}
                        <div className="col-12">
                                <input type="text" className="form-control " placeholder="Name"
                                onChange={e => this.name=e.target.value} name="Name" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12"><br/></div>
                         {/*Email field*/}
                        <div className="col-12">
                                <input type="text" className="form-control" placeholder="Email"
                                onChange={e => this.email=e.target.value} name="Email" />
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-12"><br/></div>
                         {/*Gender Label*/}
                        <div className="col-2 alignRight1 alignTop">
                            <label>Gender: </label>
                        </div>

                        {/*Multi Select Field*/}
                        <div className="col-9  alignLeft">
                        
                                <select id="inputState" class="form-control" onChange={e => this.gender=e.currentTarget.value}>
                                <option selected>Choose</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Others">Others</option>
                                </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12"><br/></div>
                        
                        {/*Age field*/}
                        <div className="col-9  alignRight1">
                            <input type="number" className="form-control" placeholder="Age"
                            onChange={e => this.age=e.target.value} name="Age" />
                        </div>

                        {/*Age label*/}
                        <div className="col-2 alignLeft alignTop">
                            <label>Age </label>
                        </div>
                        <div className="col-12"><br/></div>
                        <div className="col-12"><br/></div>
                    
                    </div>

                </form>

                {/*Save button*/}
                <button type="button" onClick={this.submit} className="form-control continuebutton">Save</button>
            </div>

        )
    }
}