import React, { Component } from 'react'

import Header from './Header';
import Footer from './Footer';

export default class Players extends Component{
    render(){
         /*Heading name*/
        const heading="Players";
        return(
            <div>
                 {/*Header Component*/}
                <Header heading={heading}></Header>
                    
                    {/*Middle text*/}
                    <div className="text-center greyText">
                        You have not added players
                    </div>

                    {/*Button Add players*/}
                    <button type="button" className="form-control continuebutton">Add players</button>

                {/*Footer Component*/}
                <Footer></Footer>
            </div>


        )
    }
}