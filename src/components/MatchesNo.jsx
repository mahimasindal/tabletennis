import React from 'react';


function MatchesNo(props){
    console.log(props)
    const matchNumber=props.matchNumber
    {
        if(matchNumber===0)
        return(
            <>
            </>
        )
        return(
         
            <div className="row">
                    <div className="col-12"><br/></div>
                    <div className="col-12 name3 alignLeft">
                        Match {matchNumber}
                    </div>

            </div>          
        )
    }
}
export default MatchesNo;