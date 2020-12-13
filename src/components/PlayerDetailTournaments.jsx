import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';

export default function PlayerDetailTournaments(props){
    console.log(props,props.tournamentDic[props.tournamentId],typeof(props.tournamentDic[props.tournamentId])!=="undefined")

if(typeof(props.tournamentDic[props.tournamentId])!=="undefined")
return(
    <div className="box2 row">
                    
                                    <div className="col-4 col-sm-3 col-md-2 text-center content">
                                        <i class="fas fa-trophy icons trophy1"></i>
                                    </div>
                                    <div className="col-8 col-sm-9 col-md-10 alignRight content">
                                        {props.tournamentDic[props.tournamentId]}
                                    </div>
                            </div>
)
else
return null


}