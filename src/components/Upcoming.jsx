import Axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import RoundAvatar from '../shared/images/table-tennis-rackets.png';
import {Link} from 'react-router-dom';


function Upcoming(props){
    const [tournaments, setItems]=useState([]);
    const [isLoaded, setLoaded]=useState(false);
    
    

    useEffect(()=>{
        
        const token='Bearer '+localStorage.getItem('token');
        const URL='http://139.59.16.180:8989/tournament/list/upcoming/';
        console.log('here is the token '+token);
        Axios
        .get(URL)
        .then(res => {
            console.log(res)
            setItems(res.data)
            setLoaded(true)
        })
        .catch(err=>{
            console.log(err)
            alert("Error Loading data")
        })
    },[])
    if(isLoaded===false)
   return(<div>Loading.....</div>)
    return(
            <div className="tournamentList">
                    {tournaments.map(tournament=>(
                        <Link key={tournament.id} to={`/TournamentDetail/${tournament.id}`}>

                        <div className="box row" >
                            <div className="col-4 col-sm-3 col-md-2 ">
                                {
                                    tournament.image?
                                    <img src={"http://139.59.16.180/mahimaImages/images/tournament/"+tournament.id+".jpg"} className="roundimg" alt="Avatar"></img>
                                     :
                                     <img src={RoundAvatar} className="roundimg" alt="Avatar"></img>

                                     
                                }
                            </div>
                            <div className="col-8 col-sm-9 col-md-10 alignRight content">
                                <div className="tName" key={tournament.id}>
                                    {tournament.name}
                                </div>
                                <div className="tStartDate">
                                    <span className="greyText2">Starts on : </span>
                                    <span style={{"marginLeft":"2%"}} key={tournament.id}>{tournament.startDate.split('T')[0]}</span>
                                </div>
                                <div className="tStartDate">
                                    <span className="greyText2">Last date of registration : </span>
                                <span style={{"marginLeft":"2%"}} key={tournament.id}>{tournament.registrationEndDate.split('T')[0]}</span>
                                </div>
                            </div>
                        </div>
                </Link>))}
               
        </div>
        )
    }
export default Upcoming;