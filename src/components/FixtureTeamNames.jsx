import './fixtures.scss'
import React from 'react';



export default function FixtureTeamNames(props){
    console.log(props)

    if(props.winnerId!==0 && props.teamId===props.winnerId)
    return(
        <span style={{'color': '#54D17B'}}><b>{props.teamName}</b></span> 

    )
    else if(props.winnerId!==0 && props.teamId!==props.winnerId)
    return(
        <span style={{'color':'#DC6562'}}><s>{props.teamName}</s></span> 

    )

    return(
        <span>{props.teamName}</span> 
    )
}