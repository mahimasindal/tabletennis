import React, {Component} from 'react';
import Axios from 'axios'
import medal from "../shared/images/medal.png";


export default class ScorerButtons extends Component{
    constructor(props){
        super(props)
        var status=[props.set1.status,props.set2.status,props.set3.status]
        console.log("status=",status)
        var isOngoing=false
        var OngoingSet
        var ongoingSetNo=0
        var compleatedSetNo=0
        const fixtureId=props.fixtureId
        const teamNames=props.teamNames
        const teamNamesDic=props.teamNamesDic


        console.log("teamNameDic=",teamNamesDic)
        var winners=[0,0,0]
        console.log(props)
        if(status[0]==="ONGOING")
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



        }
        var biId=props.biId

        this.state={
            fixtureId:fixtureId,
            teamNames:teamNames,
            status:status,
            isOngoing:isOngoing,
            ongoingSet:OngoingSet,
            ongoingSetNo:ongoingSetNo,
            compleatedSetNo: compleatedSetNo,
            winners:winners,
            winsByTeam1:0,
            winsByTeam2:0,
            biId:biId,
            teamNameDic:teamNamesDic

        }
        console.log("this.state in constructor=",this.state)
    }

    checkForCompletion(team){
        var winners
        var maxScore=localStorage.getItem('maxScore')
        
        var status=this.state.status
        var teamId
        if(team===1)
        teamId=this.state.ongoingSet.team1Id
        else if(team===2)
        teamId=this.state.ongoingSet.team2Id
        
        if(this.state.ongoingSet.team1Score===maxScore || this.state.ongoingSet.team2Score===maxScore)
        {  var winsByTeam1=this.state.winsByTeam1
            var winsByTeam2=this.state.winsByTeam2
            if(this.state.ongoingSet.team1Score===maxScore)
            {   
                console.log(this.state.teamNames[0],"team1 wins")
                winners=this.state.winners
                winsByTeam1=winsByTeam1+1
                winners[this.state.ongoingSetNo-1]=this.state.teamNames[0]
            }
            else{
                console.log(this.state.teamNames[1],"team2 wins")
                winners=this.state.winners
                winsByTeam2=winsByTeam2+1
                winners[this.state.ongoingSetNo-1]=this.state.teamNames[1]
            }
             status[this.state.ongoingSetNo]="COMPLEATED"
            this.setState({ongoingSet:{},isOngoing:false,status:status, compleatedSetNo:this.state.ongoingSetNo,ongoingSetNo:0,winners:winners,winsByTeam1:winsByTeam1,winsByTeam2:winsByTeam2})
        }
       

    }

    changeScore=(team,opt)=>{
        console.log("inside changeScore")
        var setId=this.state.ongoingSet.id
        var winners
        var maxScore=localStorage.getItem('maxScore')  
        console.log("maxScore=",maxScore)
        var status=this.state.status
        var teamId
        if(team===1)
        teamId=this.state.ongoingSet.team1Id
        else if(team===2)
        teamId=this.state.ongoingSet.team2Id
        var URL="http://139.59.16.180:8989/match/"+opt+"/"+setId+"/"+teamId
        console.log("URL=",URL)
        var token="Bearer "+localStorage.getItem("token")
                Axios
                .get(URL, {headers : {'Authorization':token}})
                .then(res => {
                    var index=this.state.ongoingSetNo
                    console.log("here in Axio",res.data,"data=",res.data.data.winnerId,"index=",index)
                   if(res.data.data.winnerId!==0)
                    {   console.log("inside if 1")
                        status[this.state.ongoingSetNo]=res.data.data.status
                        
                        /*if(this.state.ongoingSet.team1Score===maxScore || this.state.ongoingSet.team2Score===maxScore)*/
                        {  console.log("res.data.data.team1Score===maxScore=",res.data.data.team1Score,parseInt(maxScore))
                            if(res.data.data.team1Score===parseInt(maxScore))
                            {   console.log("inside if 2")
                                console.log(this.state.teamNames[0],"team1 wins")
                                winners=this.state.winners
                                winners[this.state.ongoingSetNo-1]=this.state.teamNames[0]
                            }
                            else{
                                console.log("inside else 2")
                                console.log(this.state.teamNames[1],"team2 wins")
                                winners=this.state.winners
                                winners[this.state.ongoingSetNo-1]=this.state.teamNames[1]
                                
                            }
                            status[this.state.ongoingSetNo]="COMPLEATED"
                            this.setState({ongoingSet:{},isOngoing:false,status:status, compleatedSetNo:this.state.ongoingSetNo,ongoingSetNo:0,winners:winners},() => {this.showState();})
                        }
                        if( this.state.compleatedSetNo===3  && this.state.isOngoing===false)
                        {
                            this.props.setMatchOver();
                        }
                    }
                   
                    else{
                        this.setState({ongoingSet:res.data.data},() => {this.showState();})
                    }
                    this.props.changeState(index,res.data.data)
                    console.log("after if of max")
                    
                })
                .catch(err=>{
                    console.log(err)
                },[])
            
               }


    
    matchFinish(){
        console.log("match Finish")
        this.props.history.push("/fixture");


    }

    showState(){
        console.log("state=",this.state)
    }


    startSet=()=>{
        console.log("startingSet")
        var setNo=this.state.compleatedSetNo+1
        var URL="http://139.59.16.180:8989/match/start/"+this.state.fixtureId+"/"+setNo
        console.log("URL",URL)
        var token="Bearer "+localStorage.getItem("token")
        var status=this.state.status
                Axios
                .get(URL, {headers : {'Authorization':token}})
                .then(res => {
                    var index=this.state.compleatedSetNo+1
                    console.log("here in Axio",res.data)
                    status[this.state.compleatedSetNo+1]="ONGOING"
                    this.setState({isOngoing:true, ongoingSetNo:this.state.compleatedSetNo+1, ongoingSet:res.data.data,status:status},() => {this.showState();})
                    this.props.changeState(index,res.data.data)
                })
                .catch(err=>{
                    console.log(err)
                },[])
            

    }
    componentDidMount(){
        console.log("ScorerButton Mount")

    }

    componentDidUpdate(){
        console.log("Scorer Button update")
        console.log(this.state)
      


    }
    render(){
        if (localStorage.getItem("biId")!=="0")
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

        else if(this.state.isOngoing && localStorage.getItem("token")!==null)/* */
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

        else if(this.state.isOngoing )/* */
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

        else if(this.state.compleatedSetNo===0 && this.state.isOngoing===false)/**/
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
            }

    }



}