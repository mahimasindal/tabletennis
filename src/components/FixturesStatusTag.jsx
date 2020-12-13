import React from 'react';



export default function FixturesLinkBoxes(props){
    if(props.status==="ONGOING")
    {
        return(
            <div className="belowFixtureBox">*Live</div>  

        )
    }
 
    else if(props.status==="COMPLEATED")
    {
        return(
            <div className="belowFixtureBoxGreen">Completed</div>

        )
    }
    else
    return null

 } 
