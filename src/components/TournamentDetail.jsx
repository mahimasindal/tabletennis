import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Axios from 'axios';
import Header from './Header';
import {Link} from 'react-router-dom';
import BlueFooter from './BlueFooter';
import editIcon from '../shared/images/editIcon.png';

export default  function TournamentDetail(props){
    
        const heading='Tournament details';

        var [tournament, setItem]=useState();
        var [isLoaded, setLoaded]=useState(false);
        console.log("here",props.match.params.id)

        useEffect(()=>{
            const token='Bearer '+localStorage.getItem('token');
            localStorage.setItem('tournamentId',props.match.params.id);
            const tournamentId=localStorage.getItem('tournamentId');
            console.log("here",props.match.params.id,localStorage.getItem('tournamentId'))
            const URL='http://139.59.16.180:8989/tournament/details/'+props.match.params.id;

            console.log('here is the token '+token,' URL=',URL);
            Axios
            .get(URL)
            .then(res => {
                console.log(res);
                setItem(res.data.data);
                setLoaded(true);
                localStorage.setItem('matchesType',res.data.data.matchesType);
                localStorage.setItem('maxScore',res.data.data.maxScore);
                console.log("maxScore",localStorage.getItem("maxScore"))
                console.log(tournament,isLoaded);
            })
            .catch(err=>{
                console.log(err)
                alert("Error Loading data")
            })
        },[]
        )
        console.log(isLoaded===false);
        if(isLoaded===false)
        {
            console.log("in 1st if")
            return(<div>
                <Header heading={heading} history={props.history} />
                <div className="topPadding text-center">Loading.....</div>
                </div>)
        }
       
        if(isLoaded===true)
        console.log("in 2nd if",isLoaded,tournament.name);
        return(
            <div className="tournamentMain">
                <Header heading={heading} history={props.history} status={tournament.status}/>
                <div className="boxTournament">
                    <br/>
                    <div className="row alignRight content name1">
                    
                                {tournament.name.toUpperCase()}
                    
                    </div>
                        
                        <br/>
                    
                    <div className="row">
            
                        <span><pre className="greyText1">Started on  :  </pre></span>
                        <span>{tournament.startDate.split('T')[0]}</span>
                
                    </div>
                        
                    <div className="row">
            
                        <span><pre className="greyText1">Status  :  </pre></span>
                        <span>{tournament.status}</span>  

                    </div>
                    
                    <div className="row">
                    
                        <span><pre className="greyText1">Maximum score per set  :  </pre></span>
                        <span>{tournament.maxScore}</span>  
                   
                    </div>
                    
                    <br/>

                    <div className="row name3 removePadding">
                        <div className="col-6 col-sm-6 col-md-5 col-lg-4 noPadding">Matches in the tournament</div>
                        <div className="col-6 col-sm-6 col-md-7 col-lg-8 noPadding alignRight">
                            <svg width="100%" height="2">
                            <rect width="150%" height="2" style={{"fill":"grey","stroke-width":"3","stroke":" #979797"}} />
                            </svg>
                        </div>
                    </div>
                    <br></br>
                    <div className="row">
                    {tournament.matchesType.map(matchType=>(
                        <div className="col-12 name4 noPadding">
                            {matchType}
                        </div>))}
                    </div>
                    {console.log("status",tournament.status==="UPCOMING")}
                    {tournament.status==="UPCOMING" && localStorage.getItem("token")!==null?
                     <Link to={`/EditTournament/${localStorage.getItem('tournamentId')}`} history={props.history}>
                     <img src={editIcon} class="plusCircle"></img>
                     </Link>
                      :
                      <></>
                   
                    }
                </div>
                <br></br>
                <BlueFooter status={tournament.status} players={tournament.players} history={props.history}></BlueFooter>
                   
            </div>
        )

    }
