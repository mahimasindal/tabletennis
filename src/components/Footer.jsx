import React, { Component } from 'react';
import {Link} from 'react-router-dom';


export default class Footer extends Component{
    constructor(props){
        super(props)
        var class1="fas fa-trophy icons"
        var class1tag
        var class2="fas fa-table-tennis icons"
        var class2tag
        var class3="fas fa-user icons"
        var class3tag
        if(this.props.active===1)
        {
        class1="fas fa-trophy icons "+"active"
        class1tag="active"
        class2="fas fa-table-tennis icons"
        class3="fas fa-user icons"
        }

        else if(this.props.active===2)
        {
        class1="fas fa-trophy icons"
        class2="fas fa-table-tennis icons "+"active"
        class2tag="active"
        class3="fas fa-user icons"
        }
        else if(this.props.active===3)
        {
        class1="fas fa-trophy icons"
        class2="fas fa-table-tennis icons"
        class3="fas fa-user icons "+"active"
        class3tag="active"
        }
        this.state={
            history:this.props.history,
            class1:class1,
            class2:class2,
            class3:class3,
            class1tag:class1tag,
            class2tag:class2tag,
            class3tag:class3tag
        }

    }
   
    
    render(){
        
        return(
            <div className="fixed-bottom footer ">
                <div className="row align-items-center noPadding">
                    
                    <div className="col-4 text-center ">
                    <Link to="/" className="iconTags" history={this.state.history}>
                        
                                <i className={this.state.class1}></i>
                                <br/>
                                <div className={this.state.class1tag}>Tournaments</div>
                    </Link>
 
                    </div>
                   

                    <div className="col-4 text-center">
                    <Link to="/PlayerList" className="iconTags" history={this.state.history}>

                                <i className={this.state.class2}></i>
                                <br/>
                                <div className={this.state.class2tag}>Players</div>      
                    </Link>
                    </div>

                    <div className="col-4 text-center">
                    <Link to="/Profile" className="iconTags" history={this.state.history}>
                        
                                <i className={this.state.class3}></i>     
                                <br/>
                                <div className={this.state.class3tag}>My Profile</div>
                    </Link>
                    </div>

                    {/*<div className="col-4 text-center">
                    <Link to="/Profile" className="link1">
                        <div className="col-12">
                                <i className="fas fa-user icons"></i>     
                        </div>

                        <div className="col-12 iconTags">
                                My Profile
                        </div>
                    </Link>
                    </div> */}
                </div>
            </div>
        )
    }
}