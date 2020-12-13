import React, {Component} from 'react';
import Axios from 'axios';

import Header from './Header';
import tropyImg from '../shared/images/trophy.jpg';

export default class CreateTournament extends Component{
    constructor(props){  
        super(props);
       this.state={
           matchesType:[],
           photoPath:tropyImg,
            image:null
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
           
            console.log("here in photo Change")
            console.log(e.currentTarget.files[0])
            this.setState({image:e.currentTarget.files[0]})
            console.log("obj=",URL.createObjectURL(e.currentTarget.files[0]))
        }
        
    handleChange(e) {
        
        let array = [...this.state.matchesType];
        let isChecked = e.target.checked;
        console.log(isChecked+e.target.value);
        // do whatever you want with isChecked value
        if(isChecked){
            this.setState({matchesType: [...this.state.matchesType, e.target.value]})

        }
        else{
            const index = this.state.matchesType.indexOf(e.target.value);
            if (index > -1) {
                array.splice(index,1)
                this.setState({matchesType: array});
            }
        }
        console.log(this.state.matchesType);
      }
    submit= e =>{
        e.preventDefault();
        console.log(this.state.matchesType);
        let url="http://139.59.16.180:8989/tournament/add";
        const token=localStorage.getItem('token');
        console.log(token);

        var formData = new FormData()
        formData.append("file",this.state.image)
        
        let theWrapper={ 'data':{ 
            'name':this.name,
            'startDate':this.startDate,
            'registrationEndDate':this.registrationEndDate,
            'maxScore':this.maxScore,
            'matchesType':this.state.matchesType,
            
            }};
        formData.append("theWrapper",JSON.stringify(theWrapper))
        console.log(url,theWrapper.data.matchesType,token,this.name, this.startDate,this.registrationEndDate,this.maxScore,this.state.matchesType);

        Axios.post(url,
             formData,
             {headers: {Authorization: 'Bearer ' + token}},
             )
        .then(res => {
            console.log("data = "+res.data);
            localStorage.setItem('tournamentId',res.data.data.id);
            localStorage.setItem("matchesType",res.data.data.matchesType);
            console.log(localStorage.getItem('tournamentId'));
            alert("Tournament added successfully")
            this.props.history.push("/TournamentDetail/"+localStorage.getItem('tournamentId'));
        })
        .catch(err => {
            console.log("in catch")
            if(this.name==="" || this.registrationEndDate==="" || this.startDate==="")
            alert("Enter all the required field")
            if(this.maxScore<3)
            alert("Maxscore must be greater than or equal to 3")
            if(this.registrationEndDate>this.startDate)
            alert("Registration date cannot be ahead of start date. Also, both the dates must not be behind today.")
            console.log(this.state.matchesType===[],this.state.matchesType)
            if(this.state.matchesType.length===0)
            alert("You must select atleast one match type")
            console.log('here is the error'+err)
            alert("There was an error while sending data")
        })

    };


    render(){
        const heading="Create Tournament"
        const photo=this.state.photoPath
        return(
            <div className="bottomMargin">
                <Header heading={heading} history={this.props.history}/>
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

                <form className="form1">
                    <div className="row">
                        <div className="col-12">
                                <input type="text" className="form-control" placeholder="Tournament Name"
                                onChange={e => this.name=e.target.value} name="tournamentName" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12"><br/></div>
                        <div className="col-12">
                                <input type="date" className="form-control" placeholder="Start Date" 
                                onChange={e => this.startDate=e.target.value} name="startDate" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12"><br/></div>
                        <div className="col-12">
                                <input type="date" className="form-control" placeholder="Registration End Date" 
                                onChange={e => this.registrationEndDate=e.target.value} name="regEndDate" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12"><br/></div>
                        <div className="col-6 col-sm-7 col-md-7 col-lg-8 alignRight alignTop">
                            <label><pre className="maxScoreLable">    Max score per set: </pre></label>
                        </div>
                        <div className="col-6 col-sm-5 col-md-5 col-lg-4 alignLeft">
                            <input type="number" className="form-control" placeholder="Max score"
                            onChange={e => this.maxScore=e.target.value} name="maxScore" />
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
                        <div className="col-12 name5">
                            <div className="col-12"><br/></div>
                            <input class="form-check-input" type="checkbox" value="Men's singles" 
                            onClick={e => this.handleChange(e)} id="ms" multiple/>
                            <label class="form-check-label" for="ms" >
                            Men's singles
                            </label>
                        </div>

                        <div className="col-12 name5">
                            <div className="col-12"><br/></div>
                            <input name="men's double" class="form-check-input" type="checkbox" value="Men's doubles" 
                            onClick={e => this.handleChange(e)} id="md" multiple/>
                            <label name="men's double" class="form-check-label" for="md" >
                            Men's doubles 
                            </label>
                        </div>
                        <div className="col-12 name5">
                            <div className="col-12"><br/></div>
                            <input class="form-check-input" type="checkbox" value="Women's single" 
                            onClick={e => this.handleChange(e)} id="ws" multiple/>                            
                            <label class="form-check-label" for="ws">
                              Women's single 
                            </label>
                        </div>
                        <div className="col-12 name5">
                            <div className="col-12"><br/></div>
                            <input class="form-check-input" type="checkbox" value="Women's doubles" 
                            onClick={e => this.handleChange(e)} id="wd" multiple/>
                            <label class="form-check-label" for="wd">
                                Women's doubles
                            </label>
                        </div>
                        <div className="col-12 name5">
                            <div className="col-12"><br/></div>
                            <input class="form-check-input" type="checkbox" value="Mixed doubles" 
                            onClick={e => this.handleChange(e)} id="mx" multiple/>                           
                             <label class="form-check-label" for="mx">
                                Mixed doubles
                            </label>
                        </div>
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