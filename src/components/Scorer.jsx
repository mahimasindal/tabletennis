import React, {Component} from 'react';
import Axios from 'axios'
import Header from './Header';
import RoundAvatar from "../shared/images/RoundAvatar.png";
import medal from "../shared/images/medal.png";
import ScorerSets from './ScorerSets';
import ScorerButtons from './ScorerButtons';


export default class Scorer extends Component{
    constructor(props){
        super(props);
        console.log("setIds local storage=",localStorage.getItem("setIds"),props.team1)
        console.log(props.match.params.team1id,props.match.params.team2id)
        console.log("team1Id=",props.team1Id,"team2Id=",props.team2Id,props)
        const fixtureId=props.match.params.id
        console.log(fixtureId)
        const Team1Name=props.match.params.team1
        const Team2Name=props.match.params.team2
        const team1id=props.match.params.team1id
        const team2id=props.match.params.team2id
        var teamNamesDic={}
        teamNamesDic[team1id]=Team1Name
        teamNamesDic[team2id]=Team2Name
        var x=localStorage.getItem("setIds").split(",")
        var ids=[parseInt(x[0]),parseInt(x[1]),parseInt(x[2])]
        var biId=localStorage.getItem("biId")
        console.log("biid=",biId)
       /* var status=["UPCOMING","UPCOMING","UPCOMING"]*/
        
        console.log(x)
        this.state={
            setIds:ids,
            set1:{},
            set2:{},
            set3:{},
            fixtureId:fixtureId,
            team1Name:Team1Name,
            team2Name:Team2Name,
            team1Id:team1id,
            team2Id:team2id,
            teamNamesDic:teamNamesDic,
            score1:'',
            score2:'',
            isLoaded1:false,
            isLoaded2:false,
            isLoaded3:false,
            biId:biId,
            matchOver:false

            

        }
        console.log("here",props.match.params.id,this.state)


    }
    setMatchOver=()=>{
        console.log("inside set Match Over")
        this.setState({matchOver:true})

    }
    changeState=(index,set)=>{
        console.log("in change state",index,set)
        var setIds=this.state.setIds
        setIds[index-1]=set.id
        var storageSetIds=localStorage.getItem("setIds").split(",")
        if(index===1)
        {   
            
            console.log("changing set ",index,"setIds",setIds)
            storageSetIds[0]=setIds[0]
            localStorage.setItem('setIds',storageSetIds.join())
            this.setState({set1:set,setIds:setIds})
            

        }

        else if(index===2)
        {
            
            console.log("changing set ",index,"setIds",setIds)
            storageSetIds[1]=setIds[1]
            localStorage.setItem('setIds',storageSetIds.join())
            this.setState({set2:set,setIds:setIds})

        }

        else if(index===3)
        {    
            console.log("changing set ",index,"setIds",setIds)
            storageSetIds[2]=setIds[2]
            localStorage.setItem('setIds',storageSetIds.join())
            this.setState({set3:set,setIds:setIds})

        }
    }

    showState=()=>{
        console.log("in ShowState",this.state)
    }

    getSetData=()=>{
        console.log("getSetData",this.state)
        const token='Bearer '+localStorage.getItem('token')
        const tournamentId=localStorage.getItem('tournamentId')
        var URL='http://139.59.16.180:8989/fixture/view/'+tournamentId+'/'+this.state.selectedMatchType
        var allMatches
        Axios
                .get(URL, {headers : {'Authorization':token}})
                .then(res => {
                    console.log(res.data)
                   allMatches=res.data
                   this.setState({allMatches:allMatches, isLoaded:true})
                   console.log("state matches",this.state)
                })
                .catch(err=>{
                    console.log(err)
                })
               
    }

    allTheSetData=()=>
    {
        var URL
        var token="Bearer "+localStorage.getItem("token")
        var sets=[{},{},{}]
        var ids=this.state.setIds
       /* if(ids[0]!==0 && ids[1]!==0 && ids[2]===-1)
        {   this.setState({isLoaded1:true,isLoaded2:true,isLoaded3:true},() => {this.showState();}) 
            return
        }*/
        if(ids!==[0,0,0] || (ids[0]!==0 && ids[1]!==0 && ids[2]===-1) )
        {       if(ids[0]===0||ids[0]===-1)
                 {  console.log("in 1 if")
                    this.setState({isLoaded1:true,isLoaded2:true,isLoaded3:true},() => {this.showState();}) 
                    return   
                 }
                
                 else{
                    console.log("in 1 else")
                URL="http://139.59.16.180:8989/match/get/"+ids[0]
                Axios
                .get(URL, {headers : {'Authorization':token}})
                .then(res => {
                    console.log(res.data)
                   sets[0]=res.data.data
                   this.setState({isLoaded1:true,set1:sets[0]})
                })
                .catch(err=>{
                    console.log(err)
                })
               }

                if(ids[1]===0||ids[1]===-1)
                {   console.log("in 2 if")
                    this.setState({isLoaded2:true,isLoaded3:true})
                return
                }
                else{
                    console.log("in 2 else")
                    URL="http://139.59.16.180:8989/match/get/"+ids[1]
                    Axios
                    .get(URL, {headers : {'Authorization':token}})
                    .then(res => {
                        console.log(res.data)
                       sets[1]=res.data.data
                       this.setState({isLoaded2:true,set2:sets[1]})

                    })
                    .catch(err=>{
                        console.log(err)
                    })

                }

                if(ids[2]===0 || ids[2]===-1)
                {   console.log("in 3 if")
                    this.setState({isLoaded3:true})
                    return
                }
                else{
                    console.log("in 3 else")
                    URL="http://139.59.16.180:8989/match/get/"+ids[2]
                    Axios
                    .get(URL, {headers : {'Authorization':token}})
                    .then(res => {
                        console.log(res.data)
                       sets[2]=res.data.data
                       this.setState({isLoaded3:true,set3:sets[2]})

                    })
                    .catch(err=>{
                        console.log(err)
                    })

                }


               
            console.log("sets=",sets)
        }

    }


    giveBye=(teamId)=>{
        console.log("in give bye",this.state)
        const token='Bearer '+localStorage.getItem('token')
        console.log(token)
        var URL='http://139.59.16.180:8989/match/givebi/'+teamId+'/'+this.state.fixtureId
        console.log("URL=",URL)
        Axios
                .get(URL, {headers : {'Authorization':token}})
                .then(res => {
                    console.log(res.data.data)
                    localStorage.setItem("biId",res.data.data.biId)
                    localStorage.setItem("setIds",res.data.data.set1Id+","+res.data.data.set2Id+","+res.data.data.set3Id)
                    this.setState({setIds:[res.data.data.set1Id,res.data.data.set2Id,res.data.data.set3Id],matchOver:true,biId:res.data.data.biId.toString()},() => {this.allTheSetData()})
                    
                })
                .catch(err=>{
                    console.log(err)
                })

    }

   
    componentDidMount(){
        console.log("setIds local storage=",localStorage.getItem("setIds"))
        this.allTheSetData();

       

    }

    componentDidUpdate(){
        console.log("setIds local storage=",localStorage.getItem("setIds"))
        console.log("componentDidUpdate Scorer",this.state)
    }

    render(){
        const heading='Scorer'
        console.log(this.state.isLoaded===false)
       /* if(this.state.setIds[0]===-1 || this.state.setIds[1]===-1 || this.state.setIds[2]===-1)
        return(
            <div>*****Match Over*****</div>
        )*/
     if(this.state.isLoaded1===false || this.state.isLoaded2===false || this.state.isLoaded3===false )
        return(
            <div>Loading....</div>
        )
        else 
        {
        return(
            <>
             <div className="vertical"></div>
            <Header heading={heading} history={this.props.history}/>
            <br/><br/><br/>
            {  console.log("inside render = ",this.state.isLoaded===false)}
            <div className="main-container2">
                       <div className="row text-center">
                        <div className="name7 col-6">{this.state.team1Name}</div>
                        <div className="name7 col-6">{this.state.team2Name}</div>
                        </div>
                        <div className="row text-center">
                        <div className="col-6">
                        <img src={RoundAvatar} className="roundprofileimg4" alt="Avatar"></img>
                        </div>
                        <div className="col-6">
                        <img src={RoundAvatar} className="roundprofileimg4" alt="Avatar"></img>
                        </div>
                        </div>
                        <div className="row text-center">
                            {
                                this.state.matchOver?
                                <></>

                                :
                                <div className="nameBlue col-6" onClick={()=>{this.giveBye(this.state.team1Id)}}>Give bye</div>

                            }
                              {
                                this.state.matchOver?
                                <></>
                                :
                                <div className="nameBlue col-6" onClick={()=>{this.giveBye(this.state.team2Id)}}>Give bye</div>

                            }
                       

                         </div>
                    
                    
                   {/* <div className="col-2 col-lg-2 text-center">
                        <br/><br/>
                      <div className="dot text-center">V/S</div>
                    </div>
                    <div className="col-5 text-center">
                        <div className="name7 col-12">{this.state.team2Name}</div>
                        <img src={RoundAvatar} className="roundprofileimg4 col-12" alt="Avatar"></img>
                        <div className="nameBlue col-12" onClick={()=>{this.giveBye(this.state.team2Id)}}>Give bye</div>
        </div>*/}

            </div>
                <ScorerSets setIds={this.state.setIds} biId={this.state.biId} set1={this.state.set1} set2={this.state.set2} set3={this.state.set3} />         
                <br/><br/><br/>
                <ScorerButtons set1={this.state.set1} set2={this.state.set2} set3={this.state.set3} fixtureId={this.state.fixtureId} biId={this.state.biId} 
                teamNames={[this.state.team1Name,this.state.team2Name]} teamNamesDic={this.state.teamNamesDic} 
                history={this.props.history} changeState={this.changeState} setMatchOver={this.setMatchOver}/>
               
            </>
        )
    }
}
}