import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Header from './Header';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Ongoing from './Ongoing';
import Upcoming from './Upcoming';
import Previous from './Previous';

export default class Tournaments extends Component{
    

    render(){
        const heading="Tournaments"
        return(
            <div className="outer-container ">
                <Header heading={heading} history={this.props.history}/>

                <div className=" stickyHead2">

                <Tabs fill defaultActiveKey="home" id="uncontrolled-tab-example">
                    <Tab eventKey="home" title="Ongoing" >
                        <Ongoing></Ongoing>
                    </Tab>
                    <Tab eventKey="profile" title="Upcoming" className="headings">
                        <Upcoming history={this.props.history} className="marginBottom"></Upcoming>
                    </Tab>
                    <Tab eventKey="contact" title="Previous" className="headings">
                        <Previous></Previous>
                    </Tab>
                </Tabs>
                {localStorage.getItem("token")?
                <Link to="/CreateTournament" history={this.props.history}>
                <i className="fa fa-plus-circle plusCircle" ></i>
            </Link>:
            <>
            </>
                }
                

                </div>
            </div>
        )
    }
}