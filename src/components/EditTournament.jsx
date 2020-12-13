import React, {Component} from 'react';
import Axios from 'axios';

import Header from './Header';
import tropyImg from '../shared/images/trophy.jpg';

export default class EditTournament extends Component{
    constructor(props){  
        super(props);
       this.state={
        id:props.match.params.id,
        name:"",
        startDate:"",
        registrationEndDate:"",
        maxScore:"",
        isLoaded:"",
        matchesType:[],
        photoPath:tropyImg,
        image:null,
        
       } 
       this.handleChange = this.handleChange.bind(this);
        }
        handleChange(event) {
            console.log(event.currentTarget.value,event,event.currentTarget.name)
            console.log(this.state)
            if(event.currentTarget.name==="Name")
            this.setState({name: event.target.value});
            else if(event.currentTarget.name==="startDate")
            this.setState({startDate: event.target.value});
            else if(event.currentTarget.name==="regEndDate")
            this.setState({registrationEndDate: event.target.value});
            else if(event.currentTarget.name==="maxScore")
            { console.log(event.currentTarget.value)
            this.setState({maxScore:event.currentTarget.value});
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
            const URL='http://139.59.16.180:8989/tournament/details/'+this.state.id;
            console.log('here is the token '+token);
            Axios
            .get(URL)
            .then(res => {
                console.log(res.data)
                if(res.data.image)
                {
                this.setState({image:"http://139.59.16.180/mahimaImages/images/player/"+res.data.id+".jpg",
                       photoPath:"http://139.59.16.180/mahimaImages/images/player/"+res.data.id+".jpg"})
    
                }
                console.log(res.data.startDate.split("To"))
                this.setState({name:res.data.name,startDate:res.data.startDate.split("T")[0],registrationEndDate:res.data.registrationEndDate.split("T")[0],
                maxScore:res.data.maxScore,matchesType:res.data.matchesType})
               
            })
            .catch(err=>{
                console.log(err)
            })
        }
        
        componentDidMount(){
            console.log("in component mount");
            this.loadData()
    
        }
    submit= e =>{
        e.preventDefault();
        let url="http://139.59.16.180:8989/tournament/update";
        const token=localStorage.getItem('token');
        console.log(token);

        var formData = new FormData()
        formData.append("file",this.state.image)

        let theWrapper={ 'data':{ 
            'id':this.state.id,
            'name':this.state.name,
            'startDate':this.state.startDate,
            'registrationEndDate':this.state.registrationEndDate,
            'maxScore':this.state.maxScore,
            'matchesType':this.state.matchesType
            
        }

        };
        formData.append("theWrapper",JSON.stringify(theWrapper))
        console.log(url,theWrapper.data);
        console.log("formData=",formData)
       
        Axios.put(url,
             formData,
             {headers: {Authorization: 'Bearer ' + token}},
             )
        .then(res => {
            console.log("data = "+res.data);
            alert("Tournament has been successfully updated");
            this.props.history.push("/TournamentDetail/"+this.state.id);
        })
        .catch(err => {
            alert("there was an error adding the player");
            console.log('here is the error'+err)
        })

    };


    render(){
        const heading="Edit Tournament"
        return(
            <div className="bottomMargin">
                <Header heading={heading} history={this.props.history}/>
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

                <form className="form1">
                    <div className="row">
                        <div className="col-12">
                                <input type="text" className="form-control" placeholder="Tournament Name"
                                value={this.state.name}
                                onChange={this.handleChange} name="Name" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12"><br/></div>
                        <div className="col-12">
                                <input type="date" className="form-control" placeholder="Start Date" 
                                value={this.state.startDate}
                                onChange={this.handleChange} name="startDate" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12"><br/></div>
                        <div className="col-12">
                                <input type="date" className="form-control" placeholder="Registration End Date" 
                                value={this.state.registrationEndDate}
                                onChange={this.handleChange} name="regEndDate" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12"><br/></div>
                        <div className="col-6 col-sm-7 col-md-7 col-lg-8 alignRight alignTop">
                            <label><pre className="maxScoreLable">    Max score per set: </pre></label>
                        </div>
                        <div className="col-6 col-sm-5 col-md-5 col-lg-4 alignLeft">
                            <input type="number" className="form-control" placeholder="Max score"
                            value={this.state.maxScore}
                            onChange={this.handleChange} name="maxScore" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <br/>
                        </div>
                        <div className="col-12 name1">
                            Matches in the tournament
                        </div>
                        <div class="form-check">
                        {this.state.matchesType.map(match=>(
                        <div className="col-12 name5">
                            <div className="col-12"><br/></div>
                            <label class="form-check-label" id="matchType" >
                            {match}
                            </label>
                        </div>
                        ))}

                       
                       
                        </div>
                    </div>
                </form>
                <br/>
                <br/>
                <div className="row">
                <div className="col-12 text-center">
                    <button type="button" onClick={this.submit} className="form-control continuebutton">Save</button>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>

                </div>
                
            </div>
        )
    }
}