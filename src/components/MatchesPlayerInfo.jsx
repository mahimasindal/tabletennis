import React from 'react';
import RoundAvatar from "../shared/images/RoundAvatar.png"
import medal from "../shared/images/medal.png";
import MatchesNo from './MatchesNo';



function MatchesPlayerInfo(props){
    console.log(props)
    const winnerId=props.winnerId
    const team1Id=props.team1Id
    const  team2Id=props.team2Id
    const playerDic=props.playerDic
    if(team1Id ===-1 || team2Id===-1)
    {
        return(
            <>
            </>
        )
    }
    else if(team1Id!==0 && team2Id !==0){
        return(
            <>
            <MatchesNo  matchNumber={props.matchNumber}/>
            <div className="row box">
            <div className="col-5 col-lg-5 text-center leftPic">
                            {winnerId===team1Id?
                              <img src={medal} className="smallMedalLeft"/>:
                              <></>
                            }
                            
                            <img src={RoundAvatar} className="roundprofileimg3" alt="Avatar"></img>
                            {/*console.log(this.state.playerDic[match.team1Id] )*/}
                            <div className="name5">{playerDic["id"+team1Id].split(',')[0]}</div>
                            {/*console.log("console",this.state.playerDic[match.team1Id])*/}
                            <div>Rank - {playerDic["id"+team1Id].split(',')[1]}</div>
            </div>
            
            <div className="col-2 col-lg-2 text-center">
                        <div className="dot text-center">V/S</div>
            </div>
            <div className="col-5 col-lg-5 text-center rightPic">
                            {winnerId===team2Id?
                              <img src={medal} className="smallMedalRight"/>:
                              <></>
                            }
                            
                            <img src={RoundAvatar} className="roundprofileimg3" alt="Avatar"></img>
                            {/*console.log(this.state.playerDic[match.team1Id] )*/}
                            <div className="name5">{playerDic["id"+team2Id].split(',')[0]}</div>
                            {/*console.log("console",this.state.playerDic[match.team1Id])*/}
                            <div>Rank - {playerDic["id"+team2Id].split(',')[1]}</div>
            </div>
            
            </div>
            </>
        )
    
    }
    else if(team1Id===0 || team2Id===0)
    {
        return(
            null
        )
    }
    

  {/* else if(team1Id===0 && team2Id===0)
    {
        return(
            <div className="row box">
            
            <div className="col-5 col-lg-5 text-center">
                            <img src={RoundAvatar} className="roundprofileimg3" alt="Avatar"></img>
                            <div className="name5">Previous Winner</div>
                            <div>Rank will update</div>
            </div>
            <div className="col-2 col-lg-2 text-center">
                        <div className="dot text-center">V/S</div>
            </div>
            <div className="col-5 col-lg-5 text-center">
                            <img src={RoundAvatar} className="roundprofileimg3" alt="Avatar"></img>
                            <div className="name5">Previous Winner</div>
                            <div>Rank will update</div>
            </div>
            </div>
        )

    }

    else if(team1Id===0)
    {
        return(
            <div className="row box">
            <div className="col-5 col-lg-5 text-center">
                            <img src={RoundAvatar} className="roundprofileimg3" alt="Avatar"></img>
                            <div className="name5">Previous Winner</div>
                            <div>Rank will update</div>
            </div>
            <div className="col-2 col-lg-2 text-center">
                        <div className="dot text-center">V/S</div>
            </div>
            <div className="col-5 col-lg-5 text-center">
                            <img src={RoundAvatar} className="roundprofileimg3" alt="Avatar"></img>
                            <div className="name5">{playerDic["id"+team2Id].split(',')[0]}</div>
                            <div>Rank - {playerDic["id"+team2Id].split(',')[1]}</div>
            </div>
            </div>
        )
    }

else if(team2Id===0)
    {
        return(
            <div className="row box">
            <div className="col-5 col-lg-5 text-center">
                            <img src={RoundAvatar} className="roundprofileimg3" alt="Avatar"></img>
                            <div className="name5">{playerDic["id"+team1Id].split(',')[0]}</div>
                           {console.log("console playerDic[team1Id]=",playerDic["id"+team1Id].toString())}
                            <div>Rank - {playerDic["id"+team1Id].split(',')[1]}</div>
            </div>
            
            <div className="col-2 col-lg-2 text-center">
                        <div className="dot text-center">V/S</div>
            </div>
            <div className="col-5 col-lg-5 text-center">
                            <img src={RoundAvatar} className="roundprofileimg3" alt="Avatar"></img>
                            <div className="name5">Previous Winner</div>
                            <div>Rank will update</div>
            </div>
            
            </div>
        )
    }*/}


}

export default MatchesPlayerInfo;
