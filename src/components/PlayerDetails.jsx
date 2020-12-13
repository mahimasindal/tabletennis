import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';

import ProfilePic from '../shared/images/ProfilePic.png';
import editIcon from '../shared/images/editIcon.png';
import Header from './Header'
import PlayerDetailTournaments from './PlayerDetailTournaments';


export default function PlayerDetails(props){

        /*Heading*/
        const heading="Player Details";
        console.log(props.match.params.id);
        const [player, setItems]=useState([]);
        const [isLoaded, setLoaded]=useState(false);
        const [tournamentDic,setTournamentDic]=useState({});
        const [playedIn,setPlayedIn]=useState([]);
        const tournamentDetails=()=>{
            const URL='http://139.59.16.180:8989/tournament/list/compleated/';
                Axios
                .get(URL)
                .then(res => {
                    console.log(res.data)
                    let dic={}
                    let i
                    for(i=0;i<res.data.length;i++)
                    {
                        dic[res.data[i].id.toString()]=res.data[i].name
                        console.log("player",player)
                        

                    }
                    console.log(dic)
                    setTournamentDic(dic)        
                    setLoaded(true)
                })
                .catch(err=>{
                    console.log(err)
                    
                })
            }

        useEffect(()=>{
            const token='Bearer '+localStorage.getItem('token');
            const URL='http://139.59.16.180:8989/player/details/'+props.match.params.id;
            console.log('here is the token '+token);
            Axios
            .get(URL, {headers : {'Authorization':token}})
            .then(res => {
                console.log("player Data=",res.data.data)
                setItems(res.data.data)
                console.log(res.data.data.tournamentPlayed)
                if(res.data.data.tournamentPlayed!==null)
                setPlayedIn(res.data.data.tournamentPlayed)
                tournamentDetails()
               
            })
            .catch(err=>{
                console.log(err)
                alert("Error Loading data")
            })
        },[]
        )
        if(isLoaded===false)
            return( <>
                <Header heading={heading} history={props.history}/>
                <div className="topPadding text-center">Loading.....</div>
                
                </>)
        return(
            <div>

                {/*Header Component*/}
                <Header heading={heading}  history={props.history}/>
                <div className="box1 ">
                    {/*dynamic content coming through API*/}
                    <div className="row">
                        
                        {/*Profile Image*/}
                        <div className="col-7 col-sm-5 col-md-3 noPadding">
                            {
                                player.image?
                                <img src={"http://139.59.16.180/mahimaImages/images/player/"+player.id+".jpg"} className="roundprofileimg2" alt="Avatar"></img>
                                 :
                                 <img src={ProfilePic} className="roundprofileimg2" alt="Avatar"></img>


                            }
                        </div>
                        
                        {/*Name age and gender*/}
                        <div className="col-5 col-sm-7 col-md-9 alignRight content noPadding">
                            <div className="name1">
                                {player.name}
                            </div>
                            <div className="name2">
                                {player.age} years
                            </div>
                            <div className="name2">
                                {player.gender}
                            </div>
                        </div>
                    
                    </div>
                        
                        <br/>
                        <br/>
                    
                    {/*Player Details Email, Matches played and won */}
                    <div className="row">
                        <span><pre className="greyText1">Email:   </pre></span>
                        <span>{player.email}</span>
                    </div>
                        
                    <div className="row">
                        <span><pre className="greyText1">Matches Played:   </pre></span>
                        <span>{player.matchPlayed}</span>  
                    </div>
                    
                    <div className="row">
                        <span><pre className="greyText1">Matches won:   </pre></span>
                        <span>{player.matchesWon}</span>  
                    </div>
                    <br/>

                    {/*Tournaments the player played in*/}
                    <div className="row name1 marginBottom">
                        <div className="col-6 col-sm-5 col-md-4 col-lg-3 noPadding">Played in tournaments</div>
                        <div className="col-6 col-sm-7 col-md-8 col-lg-9 noPadding">
                            <svg width="100%" height="1">
                            <rect width="100%" height="1" style={{"fill":" #979797","stroke-width":"3","stroke":" #979797"}} />
                            </svg>
                        </div>

                        {/*dynamic content to be added*/}
                        {
                            playedIn.map(tournament=>(
                                
                            <PlayerDetailTournaments tournamentId={tournament} tournamentDic={tournamentDic}></PlayerDetailTournaments>
                        ))
                    }

                    </div>
                    

                </div>
                
                            
                <Link to={`/EditPlayer/${props.match.params.id}`} history={props.history}>
                     <img src={editIcon} class="editCircle"></img>
                     </Link>
                
            </div>

    
        )
    }
