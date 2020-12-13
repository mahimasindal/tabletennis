import React, { Component } from 'react';
import Axios from 'axios';


export default class Header extends Component{
    constructor(props){  
        super(props);
        console.log(props)
        console.log("Bool",this.props.heading,this.props.heading==="Tournament details", 
        this.props.status,this.props.status==="UPCOMING")

       
    }
    logout=()=>{
        console.log("Gift",this.props.heading);
        console.log(localStorage.getItem('token'));
        localStorage.removeItem('token');
        console.log(localStorage.getItem('token'));
        console.log(this.props)

        this.props.history.push("/");
        this.props.history.push("/loggedout");
    }
    login=()=>{
        this.props.history.push("/Login")
    }
    signup=()=>{
        this.props.history.push("/Signup")
    }
    home=()=>{
        this.props.history.push("/")
    }
    audience=()=>{
        this.props.history.push("/Tournaments")
    }

    clone=()=>{
            const token='Bearer '+localStorage.getItem('token');
            const tournamentId=localStorage.getItem('tournamentId');
            const URL='http://139.59.16.180:8989/tournament/clone/'+tournamentId;
            console.log('here is the token '+token,' URL=',URL);
            Axios
            .get(URL, {headers : {'Authorization':token}})
            .then(res => {
                console.log(res);
                alert("Tournament has been cloned successfully");
            })
            .catch(err=>{
                console.log(err)
                alert("There was an error while cloning the tournament");

            })
        }

        delete=()=>{
            if(window.confirm("Delete the tournament?")){
            const token='Bearer '+localStorage.getItem('token');
            const tournamentId=localStorage.getItem('tournamentId');
            const URL='http://139.59.16.180:8989/tournament/delete/'+tournamentId;
            console.log('here is the token '+token,' URL=',URL);
            Axios
            .delete(URL, {headers : {'Authorization':token}})
            .then(res => {
                console.log(res);
                alert("Tournament has been deleted successfully");
                this.props.history.push("/")
            })
            .catch(err=>{
                console.log(err)
                alert("There was an error while deleting the tournament");

            })}
            
        }
        back=()=>{
            console.log("in back",this.props.history)
            this.props.history.goBack();
        }
 
    
    render(){
        if(this.props.heading==="Login")
        {
            return(
                <div>
                 <div className="row fixed-top stickyHead text-center">
                    {/*header sticky */}
                    <div className="col-2" onClick={this.back}>
                        <i className="fas fa-arrow-left alignLeft" ></i>
                    </div>
    
                    <div className="col-8 text-center">
                        {this.props.heading}
                    </div>
    
                    <div className="col-2">
                        <div className="dropdown">
                            <a className="btn" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-ellipsis-v" aria-hidden="true"></i>                
                            </a>
    
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <div className="dropdown-item" onClick={this.home}><i class="fa fa-home" aria-hidden="true"></i> Home</div>
                                    <div className="dropdown-item" onClick={this.signup}><i class="fa fa-user-plus" aria-hidden="true"></i> Signup</div>
                                    <div className="dropdown-item" onClick={this.audience}><i class="fa fa-users" aria-hidden="true"></i> Audience App</div>

                            </div>
                        </div>
                            
                        
                        
                    </div>
                </div>
                </div>
                
    
            )

        }

        else if(this.props.heading==="Sign up")
        {
            return(
                <div>
                 <div className="row fixed-top stickyHead text-center">
                    {/*header sticky */}
                    <div className="col-2" onClick={this.back}>
                        <i className="fas fa-arrow-left alignLeft" ></i>
                    </div>
    
                    <div className="col-8 text-center">
                        {this.props.heading}
                    </div>
    
                    <div className="col-2">
                        <div className="dropdown">
                            <a className="btn" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-ellipsis-v" aria-hidden="true"></i>                
                            </a>
    
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <div className="dropdown-item" onClick={this.home}><i class="fa fa-home" aria-hidden="true"></i> Home</div>
                                    <div className="dropdown-item" onClick={this.login}><i className="fa fa-power-off" aria-hidden="true"></i> Login</div>
                                    <div className="dropdown-item" onClick={this.audience}><i class="fa fa-users" aria-hidden="true"></i> Audience App</div>

                            </div>
                        </div>
                            
                        
                        
                    </div>
                </div>
                </div>
                
    
            )

        }

        
        else if(localStorage.getItem("token")===null)
        {
            return(
                <div>
                <div className="row fixed-top stickyHead text-center">
                   {/*header sticky */}
                   <div className="col-2" onClick={this.back}>
                       <i className="fas fa-arrow-left alignLeft" ></i>
                   </div>
   
                   <div className="col-8 text-center">
                       {this.props.heading}
                   </div>
   
                   <div className="col-2">
                       
                       <div className="dropdown">
                           <a className="btn" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                               <i className="fa fa-ellipsis-v" aria-hidden="true"></i>                
                           </a>
   
                           <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                  <div className="dropdown-item" onClick={this.home}><i class="fa fa-home" aria-hidden="true"></i> Home</div>

                                   <div className="dropdown-item" onClick={this.login}><i className="fa fa-power-off" aria-hidden="true"></i> Login</div>
                                   <div className="dropdown-item" onClick={this.signup}><i class="fa fa-user-plus" aria-hidden="true"></i> Signup</div>

                           </div>
                       </div>
                
                       
                       
                   </div>
               </div>
               </div>
            )

        }
        
        else if(this.props.heading==="Tournament details" && this.props.status==="UPCOMING")
        {
            return(
                <div>
                 <div className="row fixed-top stickyHead text-center">
                    {/*header sticky */}
                    <div className="col-2" onClick={this.back}>
                        <i className="fas fa-arrow-left alignLeft" ></i>
                    </div>
    
                    <div className="col-8 text-center">
                        {this.props.heading}
                    </div>
    
                    <div className="col-2">
                         <div className="dropdown">
                            <a className="btn" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-ellipsis-v" aria-hidden="true"></i>                
                            </a>
    
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <div className="dropdown-item" onClick={this.home}><i class="fa fa-home" aria-hidden="true"></i> Home</div>
                                    <div className="dropdown-item" onClick={this.clone}><i className="fa fa-clone" aria-hidden="true"></i> Tournament Clone</div>
                                    <div className="dropdown-item" onClick={this.delete}><i className="fas fa-trash-alt"></i> Tournament Delete</div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>)
        }


         
        else if((this.props.heading==="Tournament details") && (this.props.status==="ONGOING" || this.props.status=="COMPLEATED"))
        {
            return(
                <div>
                 <div className="row fixed-top stickyHead text-center">
                    {/*header sticky */}
                    <div className="col-2" onClick={this.back}>
                        <i className="fas fa-arrow-left alignLeft" ></i>
                    </div>
    
                    <div className="col-8 text-center">
                        {this.props.heading}
                    </div>
    
                    <div className="col-2">
                         <div className="dropdown">
                            <a className="btn" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-ellipsis-v" aria-hidden="true"></i>                
                            </a>
    
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <div className="dropdown-item" onClick={this.home}><i class="fa fa-home" aria-hidden="true"></i> Home</div>
                                    <div className="dropdown-item" onClick={this.clone}><i className="fa fa-clone" aria-hidden="true"></i> Tournament Clone</div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>)
        }


        else{
        return(
            <div>
             <div className="row fixed-top stickyHead text-center">
                {/*header sticky */}
                <div className="col-2" onClick={this.back}>
                    <i className="fas fa-arrow-left alignLeft" ></i>
                </div>

                <div className="col-8 text-center">
                    {this.props.heading}
                </div>

                <div className="col-2">
                   
                    <div className="dropdown">
                        <a className="btn" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>                
                        </a>

                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <div className="dropdown-item" href="#">{localStorage.getItem("userName")}</div>
                                <div className="dropdown-item" onClick={this.home}><i class="fa fa-home" aria-hidden="true"></i> Home</div>
                                <div className="dropdown-item" onClick={this.logout}><i className="fa fa-power-off" aria-hidden="true"></i> Logout</div>
                                <div className="dropdown-item" onClick={this.myTournaments}><i className="fa fa-trophy" aria-hidden="true"></i> My Tournaments</div>

                               
                        </div>
                    </div>
                        
                    
                    
                </div>
            </div>
            </div>
            

        )
    }
}
}
