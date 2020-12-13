import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Axios from 'axios';

import Header from "./Header";
import Footer from "./Footer";
import RoundAvatar from "../shared/images/RoundAvatar.png";
import Players from './Players';
import { Link } from 'react-router-dom';

function PlayerList(props){
    const [players, setItems]=useState([]);
    const [isLoaded, setLoaded]=useState(false);
    /*Heading*/
    const heading="Players";

    console.log("player List History",props.history)

   

    useEffect(()=>{
        const token='Bearer '+localStorage.getItem('token');
        const URL='http://139.59.16.180:8989/player/list/';
        console.log('here is the token '+token);
        Axios
        .get(URL, {headers : {'Authorization':token}})
        .then(res => {
            console.log(res)
            setItems(res.data)
            setLoaded(true)
        })
        .catch(err=>{
            console.log(err)
            alert("Error Loading data")
        })
    },[]
    )
    if(isLoaded===false)
    {
        return(
            <>
        <Header heading={heading} history={props.history}/>
        <div className="topPadding text-center">Loading.....</div>
        <Footer history={props.history} active={2}/>
        </>
        )
        
    }

    else{
        if(players===[])
            return(<Players/>)
        return(
            <div>
                {/*Header Component*/}
                <Header heading={heading} history={props.history}/>
                <div className="playerList">

                    {/*Going to become dynamic content*/}
                    {players.map(player=>(
                        <Link className="playerListLink" history={props.history} key={player.id} to={`/PlayerDetails/${player.id}`}>
                        
                            <div className="box row" >

                        {/*profile image*/}
                        <div className="col-4 col-sm-3 col-md-2">
                        {
                                    player.image?
                                    <img src={"http://139.59.16.180/mahimaImages/images/player/"+player.id+".jpg"} className="roundprofileimg1" alt="Avatar"></img>
                                    :
                                     <img src={RoundAvatar} className="roundimg" alt="Avatar"></img>

                                     
                                }
                        </div>
                        <div className="col-8 col-sm-9 col-md-10 alignRight content" key={player.id}>

                            {/*Name*/}
                            <div className="name1">
                                {player.name}
                            </div>

                            {/*Age and gender*/}
                            <div className="name2" key={player.id}>
                                <span >{player.age} years</span>
                                <span style={{"marginLeft":"6%"}}> {player.gender}</span>
                            </div>
                        </div>
                    </div>
                        </Link>
                   
                    ))}
                </div>

                

                {/*Adding more players*/}
                <Link to="/AddPlayerForm">
                    <i className="fa fa-plus-circle plusCircle" history={props.history}></i>
                </Link>

                {/*Footer Component*/}
                <Footer history={props.history} active={2}/>
            </div>
        )
    }
}

export default PlayerList;