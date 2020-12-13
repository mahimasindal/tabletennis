import React, {Component, useEffect} from 'react';
import Axios from 'axios';
import medal from "../shared/images/medal.png";


export default function ScorerButtonAudience(props)
{
   
        var status=[props.set1.status,props.set2.status,props.set3.status]
        console.log("status=",status)
       /* var isOngoing=false
        var OngoingSet
        var ongoingSetNo=0
        var compleatedSetNo=0*/
        var fixtureId=props.fixtureId
        var teamNames=props.teamNames
        var teamNamesDic=props.teamNamesDic
        var match=props.match
        var set1=props.set1
        var set2=props.set2
        var set3=props.set3
        var setIds=props.setIds

        var biId
        if(match!==null)
        biId=props.match.biId
        else
        biId=0

        var winnerId
        if(match)
        winnerId=props.match.winnerId
        else
        winnerId=0


        console.log("teamNameDic=",teamNamesDic,"setIds=",props.setIds)
        var winners=[0,0,0]
        console.log(props)
      /*  if(status[0]==="ONGOING")
        {   console.log("ongoing is 1")
            OngoingSet=props.set1
            ongoingSetNo=1
            isOngoing=true


        }
        else if(status[1]==="ONGOING")
        {   console.log("ongoing is 2")
            OngoingSet=props.set2
            ongoingSetNo=2
            isOngoing=true

        }
        else if(status[2]==="ONGOING")
        {   
            OngoingSet=props.set3
            ongoingSetNo=3
            isOngoing=true

        }

        if(status[2]==="COMPLEATED")
        {
            compleatedSetNo=3
            console.log("in1")
            winners[2]=teamNamesDic[props.set3.winnerId]
            winners[1]=teamNamesDic[props.set2.winnerId]
            winners[0]=teamNamesDic[props.set1.winnerId]
            
        }
        else if(status[1]==="COMPLEATED")
        {
            compleatedSetNo=2
            console.log("in2")
            winners[1]=teamNamesDic[props.set2.winnerId]
            winners[0]=teamNamesDic[props.set1.winnerId]


        }
        else if(status[0]==="COMPLEATED")
        {   
            compleatedSetNo=1
            console.log("in3")
            winners[0]=teamNamesDic[props.set1.winnerId]



        }*/
        

       /* this.state={
            fixtureId:fixtureId,
            teamNames:teamNames,
            status:status,
           /* isOngoing:isOngoing,
            ongoingSet:OngoingSet,
            ongoingSetNo:ongoingSetNo,
            compleatedSetNo: compleatedSetNo,
            winners:winners,
            winsByTeam1:0,
            winsByTeam2:0,
            biId:biId,
            teamNamesDic:teamNamesDic,
            match:props.match,
            winnerId:winnerId,
            set1:props.set1,
            set2:props.set2,
            set3:props.set3

        */
       
    
   const matchFinish=()=>{
        console.log("match Finish")
        props.history.push("/fixture");


    }

    const showState=()=>{
        console.log("state=",set1,set2,set3,match,status)
    }


    useEffect(()=>{
        console.log("ScorerButton Mount")
        showState()
   
   
    }
        
    )
   /* componentDidMount(){
        console.log("ScorerButton Mount")
        this.showState()

    }

    componentDidUpdate(){
        console.log("Scorer Button update")
        console.log(this.state)
        console.log(this.state.status,this.state.winnerId===0 , this.state.biId===0 , this.state.status[0],this.state.setIds==={} , this.state.set2==={} , this.state.set3==={},this.state.set1,this.state.set2,this.state.set3)


    }*/
        if(winnerId===0 && biId===0 && status[0]===undefined )
        {
            return(
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6 box6 text-center">
                    <img src={medal} alt="medal" className="medal"></img>
                    {
                        localStorage.getItem("token")?
                        <button type="button" className="form-control button1" onClick={()=>this.startSet()}>Start set 1</button>:
                        <div>Set one is going to start</div>

                    }
                    </div>
                    <div className="col-3"></div>
                
                </div>
            )

        }

       else if(winnerId===0 && biId===0 && status[0]==="COMPLEATED" && status[1]===undefined)
        {
            return(
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6 box6 text-center">
                    <img src={medal} alt="medal" className="medal"></img>
                    {
                        localStorage.getItem("token")?
                        <button type="button" className="form-control button1" onClick={()=>this.startSet()}>Start set 1</button>:
                        <div>Set 2 is going to start</div>

                    }
                    </div>
                    <div className="col-3"></div>
                
                </div>
            )

        }

        else if(winnerId===0 && biId===0 && status[0]==="COMPLEATED" && status[1]==="COMPLEATED" && status[2]===undefined && winnerId===0)
        {
            return(
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6 box6 text-center">
                    <img src={medal} alt="medal" className="medal"></img>
                    {
                        localStorage.getItem("token")?
                        <button type="button" className="form-control button1" onClick={()=>this.startSet()}>Start set 1</button>:
                        <div>Set 3 is going to start</div>

                    }
                    </div>
                    <div className="col-3"></div>
                
                </div>
            )

        }

       else if(winnerId!==0 && biId===0)
        {
            return(
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6 box6 text-center">
                    <img src={medal} alt="medal" className="medal"></img>
                   
                     <div className="col-12 name10">{teamNamesDic[winnerId]} won the match</div>
            
                  <button type="button" className="form-control button1" onClick={()=>matchFinish()}>Go Back</button>

            

                    </div>
                    <div className="col-3"></div>
                
                </div>
            )

        }

        else if(winnerId!==0 && biId!==0)
        {
            return(
                <div className="row">
                <div className="box6 text-center">
                <img src={medal} alt="medal" className="medal"></img>
                <div className="col-12 name10">{teamNamesDic[winnerId]} Got Bye</div>
               
                  <button type="button" className="form-control button1" onClick={()=>matchFinish()}>Go Back</button>

             
                </div>
               
            
                </div>

            )

        }

        else if(status[0]==="ONGOING")
        {
            return(
                <div className="row">
                <div className="col-6 text-center"> 
                    <div className="row text-center">
                         <div className="col-12 name9" >{set1.team1Score}</div>
                    </div>
                </div>
                <div className="col-6 text-center"> 
                    <div className="row text-center">
                            <div className="col-12 name9">{set1.team2Score}</div>
                    </div>
                </div>
            </div>
    
            )

        }

        else if(status[1]==="ONGOING")
        {
            return(
                <div className="row">
                <div className="col-6 text-center"> 
                    <div className="row text-center">
                         <div className="col-12 name9" >{set2.team1Score}</div>
                    </div>
                </div>
                <div className="col-6 text-center"> 
                    <div className="row text-center">
                            <div className="col-12 name9">{set2.team2Score}</div>
                    </div>
                </div>
            </div>
    
            )
            
        }

        else if(status[2]==="ONGOING")
        {
            return(
                <div className="row">
                <div className="col-6 text-center"> 
                    <div className="row text-center">
                         <div className="col-12 name9" >{set3.team1Score}</div>
                    </div>
                </div>
                <div className="col-6 text-center"> 
                    <div className="row text-center">
                            <div className="col-12 name9">{set3.team2Score}</div>
                    </div>
                </div>
            </div>
    
            )
            
        }
        else{
            return(
                null
            )
        }








        /**************************** */
       /* if (localStorage.getItem("biId")!=="0")
        {
            return(
                <div className="row">
                <div className="box6 text-center">
                <img src={medal} alt="medal" className="medal"></img>
                <div className="col-12 name10">{this.state.teamNameDic[localStorage.getItem("biId")]} Got Bye</div>
                {
                 localStorage.getItem("token")?
                 <button type="button" className="form-control button1" onClick={()=>this.matchFinish()}>Finish</button>
                  :
                  <button type="button" className="form-control button1" onClick={()=>this.matchFinish()}>Go Back</button>

             }
                </div>
               
            
                </div>

            )

        }
        else if((this.state.winners[0]!==0 && this.state.winners[1]!==0 && this.state.winners[0]===this.state.winners[1]))
        {
            return(
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6 box6 text-center">
                    <img src={medal} alt="medal" className="medal"></img>
                    <div className="col-12 name10">{this.state.winners[0]} won 2 sets in row and hence is the winner</div>
                    {
                 localStorage.getItem("token")?
                 <button type="button" className="form-control button1" onClick={()=>this.matchFinish()}>Finish</button>
                  :
                  <button type="button" className="form-control button1" onClick={()=>this.matchFinish()}>Go Back</button>

             }
                    </div>
                    <div className="col-3"></div>
                
                </div>
            )

        }

        else if(this.state.isOngoing && localStorage.getItem("token")!==null)
        return(
            <div className="row">
            <div className="col-6 text-center"> 
                <div className="row text-center">
                    <div className="col-12" onClick={()=>this.changeScore(1,"decrease")}><i class="fa fa-minus-circle minusCircle2" ></i></div>
                     <div className="col-12 name9" onClick={(e)=>{console.log(e)}}>{this.state.ongoingSet.team1Score}</div>
                     <div className="col-12" onClick={()=>this.changeScore(1,"increase")}><i class="fa fa-plus-circle plusCircle2 "></i></div>
                </div>
            </div>
            <div className="col-6 text-center"> 
                <div className="row text-center">
                        <div className="col-12" onClick={()=>this.changeScore(2,"decrease")}><i class="fa fa-minus-circle minusCircle2" ></i></div>
                        <div className="col-12 name9">{this.state.ongoingSet.team2Score}</div>
                        <div className="col-12" onClick={()=>this.changeScore(2,"increase")}><i class="fa fa-plus-circle plusCircle2 "></i></div>
                </div>
            </div>
        </div>

        )

        else if(this.state.isOngoing )
        return(
            <div className="row">
            <div className="col-6 text-center"> 
                <div className="row text-center">
                     <div className="col-12 name9" >{this.state.ongoingSet.team1Score}</div>
                </div>
            </div>
            <div className="col-6 text-center"> 
                <div className="row text-center">
                        <div className="col-12 name9">{this.state.ongoingSet.team2Score}</div>
                </div>
            </div>
        </div>

        )

        else if(this.state.compleatedSetNo===0 && this.state.isOngoing===false)
        {
            return(
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6 box6 text-center">
                    <img src={medal} alt="medal" className="medal"></img>
                    {
                        localStorage.getItem("token")?
                        <button type="button" className="form-control button1" onClick={()=>this.startSet()}>Start set 1</button>:
                        <div>Set one is going to start</div>

                    }
                    </div>
                    <div className="col-3"></div>
                
                </div>
            )
            
        }

        else if((this.state.compleatedSetNo===1 || this.state.compleatedSetNo===2) && this.state.isOngoing===false)
        {
            return(
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6 box6 text-center">
                    <img src={medal} alt="medal" className="medal"></img>
                    <div className="col-12 name10">{this.state.winners[this.state.compleatedSetNo-1]} won set{this.state.compleatedSetNo}</div>
            
                    {
                        localStorage.getItem("token")?
                        <button type="button" className="form-control button1" onClick={()=>this.startSet()}>Start set{this.state.compleatedSetNo+1}</button>:
                        <div>Next Set will start soon</div>
                    }

                    </div>
                    <div className="col-3"></div>
                
                </div>
            )
        }

           else if(this.state.compleatedSetNo===3  && this.state.isOngoing===false)
        {
            return(
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6 box6 text-center">
                    <img src={medal} alt="medal" className="medal"></img>
                   
                     <div className="col-12 name10">{this.state.winners[2]} won the match</div>
             {
                 localStorage.getItem("token")?
                 <button type="button" className="form-control button1" onClick={()=>this.matchFinish()}>Finish</button>
                  :
                  <button type="button" className="form-control button1" onClick={()=>this.matchFinish()}>Go Back</button>

             }

                    </div>
                    <div className="col-3"></div>
                
                </div>
            )
            }*/

    };



