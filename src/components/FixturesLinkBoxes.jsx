import React from 'react';
import './fixtures.scss'
import FixturesStatusTag from './FixturesStatusTag';
import FixtureTeamNames from './FixtureTeamNames';



export default function FixturesLinkBoxes(props){
    console.log(props)
    console.log(localStorage.getItem("token"))
    if(localStorage.getItem("token")===null && props.team1Id>0 && props.team2Id>0)
    {
        var link=props.link
        link=link.substring(0,6)+link.substring(7)
        console.log("link=",link)
        return(
            <>
            <div class="match-top team" onClick={()=>{props.goToLink(link,props.setIds,props.biId)}} >
               <span class="seed">
                   <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' alt="" className='fimg'/>
               </span>
               <span class="fixtureName" >
               <FixtureTeamNames teamId={props.team1Id} winnerId={props.winner} teamName={props.team1}></FixtureTeamNames>
               </span>                            
           </div>
                                   
           <div class="match-bottom team" onClick={()=>{props.goToLink(link,props.setIds,props.biId)}}>
               <span class="seed">
                   <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' alt="" className='fimg'/>
               </span>
               <span class="fixtureName">
               <FixtureTeamNames teamId={props.team2Id} winnerId={props.winner} teamName={props.team2}></FixtureTeamNames>
               </span>   
               <FixturesStatusTag status={props.status}/>
           </div>
       </>


        )
    }
    if((props.team1Id===-1)||(props.team2Id===-1)||(props.team1Id===0)||(props.team2Id===0))
    {
        return(
            <>
             <div class="match-top team" >
                <span class="seed">
                    <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' alt="" className='fimg'/>
                </span>
                <span class="fixtureName" >
                    {props.team1}
                </span>                            
            </div>
                                    
            <div class="match-bottom team">
                <span class="seed">
                    <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' alt="" className='fimg'/>
                </span>
                <span class="fixtureName">
                    {props.team2}
                </span>   
            </div>
        </>

        )
    }
    return(
       
        <>
        { console.log(props.link,props.goToLink)}
            <div class="match-top team" onClick={()=>{props.goToLink(props.link,props.setIds,props.biId)}} >
                <span class="seed">
                    <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' alt="" className='fimg'/>
                </span>
                <span class="fixtureName" >
                <FixtureTeamNames teamId={props.team1Id} winnerId={props.winner} teamName={props.team1}></FixtureTeamNames>
                </span>                            
            </div>
                                    
            <div class="match-bottom team" onClick={()=>{props.goToLink(props.link,props.setIds,props.biId)}}>
                <span class="seed">
                    <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' alt="" className='fimg'/>
                </span>
                <span class="fixtureName">
                    <FixtureTeamNames teamId={props.team2Id} winnerId={props.winner} teamName={props.team2}></FixtureTeamNames>
                </span>  
                <FixturesStatusTag status={props.status}/>
               
                
            </div>
        </>   

    )


}