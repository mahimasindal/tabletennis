import React, { Component } from 'react';
import Axios from 'axios';

import RoundAvatar from "../shared/images/RoundAvatar.png"
import Header from './Header';

export default class EditPlayers extends Component{
    constructor(props){
        super(props)
        this.state={id:props.match.params.id,
                    name:"",
                    email:"",
                    gender:"",
                    age:"",
                    isLoaded:"",
                    photoPath:RoundAvatar,
                    image:null,
                    isUploaded:false,
                  }

                  this.handleChange = this.handleChange.bind(this);
    }
    submit= e =>{
        if ( /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email) ===false) {
            alert("Email Id entered is incorrect")
        }
        else if(this.state.age<3){
            alert("Age must me greater than 3")
    
        }
        else if(this.state.email==="" || this.state.name==="" ||
            this.state.age==="" || this.state.gender==="Choose")
        {
            alert("Enter all the required data")
        }
        e.preventDefault();
        let url="http://139.59.16.180:8989/player/update";
        const token=localStorage.getItem('token');
        console.log(token);

        var formData = new FormData()
        formData.append("file",this.state.image)

        let theWrapper={ 'data':{ 
            'id':this.state.id,
            'name':this.state.name,
            'email':this.state.email,
            'gender':this.state.gender,
            'age':this.state.age
            
        }

        };
        formData.append("theWrapper",JSON.stringify(theWrapper))
        console.log(url,theWrapper.data.gender,token,this.name, this.email,this.age);
        console.log("formData=",formData)
       
        Axios.put(url,
             formData,
             {headers: {Authorization: 'Bearer ' + token}},
             )
        .then(res => {
            console.log("data = "+res.data);
            alert("player has been successfully edited");
            this.props.history.push("/PlayerList");
        })
        .catch(err => {
            alert("there was an error adding the player");
            console.log('here is the error'+err)
        })

    };
    handleChange(event) {
        console.log(event.currentTarget.value)
        if(event.currentTarget.name==="Name")
        this.setState({name: event.target.value});
        else if(event.currentTarget.name==="Email")
        this.setState({email: event.target.value});
        else if(event.currentTarget.name==="Age")
        this.setState({age: event.target.value});
        else if(event.currentTarget.name==="Gender")
        { console.log(event.currentTarget.value)
        this.setState({gender:event.currentTarget.value});
        }
      }

    photoChange=(e)=>{
        const reader = new FileReader();
        reader.onload=()=>{
            if(reader.readyState===2){
                console.log('here')
                this.setState({photoPath:reader.result})
            }
            

        }
        reader.readAsDataURL(e.currentTarget.files[0])
        this.setState({image:e.currentTarget.files[0]})
      
        console.log("here in photo Change")
        console.log(e.currentTarget.files[0])
        console.log("obj=",URL.createObjectURL(e.currentTarget.files[0]))
    }
    loadData=()=>{
        console.log("in load Data");
        const token='Bearer '+localStorage.getItem('token');
        const URL='http://139.59.16.180:8989/player/details/'+this.state.id;
        console.log('here is the token '+token);
        Axios
        .get(URL, {headers : {'Authorization':token}})
        .then(res => {
            console.log(res.data)
            if(res.data.image)
            {
            this.setState({image:"http://139.59.16.180/mahimaImages/images/player/"+res.data.id+".jpg",
                   photoPath:"http://139.59.16.180/mahimaImages/images/player/"+res.data.id+".jpg"})

            }
            this.setState({email:res.data.email,name:res.data.name,gender:res.data.gender,age:res.data.age})
           
        })
        .catch(err=>{
            console.log(err)
        })
    }
    
    componentDidMount(){
        console.log("in component mount");
        this.loadData()

    }
    

    render(){
        /*eslint-disable-next-line*/
        /*Heading*/
        const heading="Edit Player";
        const photo=this.state.photoPath
        return(
            <div>
                {/*Header Component*/}
                 <Header heading={heading} history={this.props.history}></Header>

                 {/*Avatar*/}
                 <img src={this.state.photoPath} className="roundprofileimg" alt="Avatar"></img>
                 
                 {/*Add photo link*/}
                 {
                     this.state.photoPath===""?
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
                                value={this.state.name}
                                onChange={this.handleChange} name="Name" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12"><br/></div>
                         {/*Email field*/}
                        <div className="col-12">
                                <input type="text" className="form-control" placeholder="Email"
                                value={this.state.email}
                                onChange={this.handleChange} name="Email" />
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-12"><br/></div>
                         {/*Gender Label*/}
                        <div className="col-2 alignRight alignTop">
                            <label>Gender: </label>
                        </div>

                        {/*Multi Select Field*/}
                        <div className="col-9  alignLeft">
                        
                                <select id="inputState" class="form-control" onChange={this.handleChange}>
                                
                                
                                    <option >Choose</option>
                                {
                                    this.state.gender==="Male"?
                                    <option value="Male" selected>Male</option>:
                                    <option value="Male" >Male</option>
                                }
                                 {
                                    this.state.gender==="Female"?
                                    <option value="Female" selected>Female</option>:
                                    <option value="Female" >Female</option>
                                }
                                {
                                    this.state.gender==="Others"?
                                    <option value="Others" selected>Others</option>:
                                    <option value="Others">Others</option>


                                }
                               
                                </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12"><br/></div>
                        
                        {/*Age field*/}
                        <div className="col-9  alignRight">
                            <input type="number" className="form-control" placeholder="Age"
                            value={this.state.age}
                            onChange={this.handleChange} name="Age" />
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