import React from 'react';
import AddIcon from "../shared/images/greenAddIcon.png"
import MinusIcon from "../shared/images/redMinusIcon.png"


export default function CreateDrawsAddRemove(props){
    console.log(props)


    if(props.isInTheList)
    {
    return( 
    <div className="col-2 col-sm-2 col-md-2 alignLeft " value={props.playerId} onClick={((e)=>props.removePlayer(e,props.playerId))}>
                <img src={MinusIcon} className="minus"/>

    </div>
    )
    }

    else
    {
    return(
        
    <div className="col-2 col-sm-2 col-md-2 alignLeft "  value={props.playerId} onClick={((e)=>props.addPlayer(e,props.playerId))}>
                 <img src={AddIcon} className="plus"/>

    </div>
    )
    }

}