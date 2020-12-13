import React, { Component } from 'react'

import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';

export default class FirstTournament extends Component{
    render(){
        /*eslint-disable-next-line*/
        /*Heading name*/
        const heading="Tournament";
       
        return(
            <div>
                {/*Header Component*/}
                <Header heading={heading}></Header>

                    {/*Middle text*/}
                    <div className="text-center greyText">
                        Create Your First Tournament
                    </div>
                    
                    {/*Button Create Now*/}
                   <Link to="/CreateTournament"> <button type="button" className="form-control continuebutton">Create Now</button></Link>

                {/*Footer Component*/}
                <Footer></Footer>
            </div>


        )
    }
}