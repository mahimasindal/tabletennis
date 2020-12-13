import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class BlueFooter extends Component{
   constructor(props){
       super(props)
       console.log("props=",props)
   }
    render(){
        {console.log("token=",localStorage.getItem("token"),localStorage.getItem("token")!==null)}
        if((this.props.status==="UPCOMING") && (this.props.players===undefined)&&(localStorage.getItem("token")!==null) || (this.props.players===[]))
        return(
            <div>
                <Link to="/CreateDraws" history={this.props.history}> <div className="fixed-bottom footer2">Create draws</div></Link>

            </div>
        )
        else if((this.props.status==="UPCOMING") && (this.props.players!==undefined) && (this.props.players!==[]))
        {
        {console.log(this.props.players,"in jhere")}
        return(
            <div>
                 <Link to="/fixture" history={this.props.history}> <div className="fixed-bottom footer2">View fixture</div></Link>

            </div>
        )
    }
        else if(this.props.status==="ONGOING")
        return(
            <div>
                <Link to="/fixture" history={this.props.history}> <div className="fixed-bottom footer2">View fixture</div></Link>

            </div>
        )
        else if(this.props.status==="COMPLEATED")
        return(
            <div>
                <Link to="/Matches" history={this.props.history}> <div className="fixed-bottom footer2">View matches</div></Link>

            </div>
        )
        else{
            return(
                <></>
            )
        }
    }
}