import React, {Component} from 'react';
import Header from "./Header";
import RoundAvatar from "../shared/images/RoundAvatar.png"
import Axios from "axios"
import MatchesPlayerInfo from './MatchesPlayerInfo';


export default class Matches extends Component{
    constructor(props){
        super(props)
        var x=localStorage.getItem('matchesType')
        x=x.split(',');
        this.state={
            matchesType:x,
            selectedMatchType:x[0],
            allMatches:[],
            playerDic:{},
            isLoaded:false,
        }

       /* this.state.matchesType.map(matchType=>(console.log("here",matchType)))*/
    }

    getDataStatic=()=>{
        console.log("getDataStatic",this.state)
        const token='Bearer '+localStorage.getItem('token')
        var URL2='http://139.59.16.180:8989/player/list'
        var playerList=[]
        var PD={},i
        Axios
                .get(URL2)
                .then(res => {
                   /* console.log(res.data)*/
                    playerList=res.data

                    for(i=0;i<playerList.length;i++)
                    {
                        PD["id"+playerList[i]["id"]]=playerList[i]["name"]+","+playerList[i]["seedRanking"].toString()
                        console.log(PD["id"+playerList[i]["id"]],PD["id"+5])
                        
                    }
                    var x="id5"
                    console.log("PD=",PD,PD["id6"]);
                    this.setState({playerDic:PD},() => {
                        this.getDataDynamic();})
    
                })
                .catch(err=>{
                    console.log(err)
                })
               
               
               /* console.log("this.state",this.state)*/
               



    }

    getDataDynamic=()=>{
        console.log("getDataDynamic",this.state)
        const token='Bearer '+localStorage.getItem('token')
        const tournamentId=localStorage.getItem('tournamentId')
        var URL='http://139.59.16.180:8989/fixture/view/'+tournamentId+'/'+this.state.selectedMatchType
        var allMatches
        Axios
                .get(URL)
                .then(res => {
                    console.log(res.data.data)
                   allMatches=res.data.data
                   this.setState({allMatches:allMatches, isLoaded:true})
                   console.log("state matches",this.state)
                })
                .catch(err=>{
                    console.log(err)
                })
               
    }

    componentDidMount(){
        console.log("componentDidMount",this.state)
        this.getDataStatic();
       

               
                

    }

    componentDidUpdate(){
        console.log("component update", this.state)
    }

   
    matchTypeChangeHandle=e=>{
        console.log("matchTypeChangeHandle",this.state)
       /* console.log("selected matchType is = ",e.target.value)*/
        this.setState({selectedMatchType:e.target.value},() => {
            this.getDataDynamic();});
      
        console.log("Here after dataFetchDynamic")
    }



    render(){
        const x=this.state.matchesType
        const heading="Matches"
        if(this.state.isLoaded===false)
        return(<>
            <Header heading={heading} history={this.props.history}/>
            <div className="topPadding text-center">Loading.....</div>
            </>)
        return(
           
            <>
             {console.log(this.state.isLoaded===true,this.state.matchesType)}
            <Header heading={heading} history={this.props.history}/>
            <br/><br/><br/>
            <div class="main-container">
                <div className="row">
                        <div className="col-12"><br/></div>
                        <div className="col-5 alignRight alignTop name2">
                            <label>View matches for: </label>
                        </div>
                        <div className="col-7 alignLeft name2">
                        
                        <select id="inputState" class="form-control" onChange={this.matchTypeChangeHandle}>
                                {x.map(matchType=>(
                                 <option value={matchType}>{matchType}</option>))}
                        </select>
                        </div>
                </div>
                {console.log("allMatches=",this.state.allMatches)}
                {this.state.allMatches.map(match=>(
                <>
                
                <MatchesPlayerInfo matchNumber={match.matchNumber} team1Id={match.team1Id} team2Id={match.team2Id} winnerId={match.winnerId} playerDic={this.state.playerDic}/>
                </>
                ))}

            </div>
            </>
            

        )
    }
}