import React, {Component} from 'react';
import Axios from 'axios'
import './fixtures.scss'
import {Link} from 'react-router-dom'
import FixturesLinkBoxes from './FixturesLinkBoxes'

export default class Fixtures extends Component{
    constructor(props){
        super(props)
        var x=localStorage.getItem('matchesType')
        x=x.split(',');
        /*console.log(x)*/
        this.state={
            tournamentName:null,
            matchesType:x,
            selectedMatchType:x[0],
            isLoaded:false,
            fixtures:[],
            playerDic:{}
        }


    }

    dataFetchStatic=()=>{
        console.log("dataFetchStatic")
        const URL='http://139.59.16.180:8989/tournament/details/'+localStorage.getItem("tournamentId")
        const token='Bearer '+localStorage.getItem('token');
        Axios
        .get(URL)
        .then(res => {
            console.log("res.data.data",res.data.data);
            this.setState({tournamentName:res.data.data.name})
        })
        .catch(err=>{
            console.log("error=",err)
            alert("There is a error loading the page.")
            
        })
        
        
        var URL3='http://139.59.16.180:8989/player/list'
        var playerList=[]
        var PD={},i

        Axios
                .get(URL3)
                .then(res => {
                     console.log("playerList=",res.data)
                    playerList=res.data

                    for(i=0;i<playerList.length;i++)
                    {
                        PD[playerList[i]["id"]]=playerList[i]["name"]
                        
                    }
                     PD[-1]="Bye"
                     PD[0]="Winner"
                     /* console.log("PD=",PD);*/

                    this.setState({ playerDic:PD, isLoaded:true})
                    /*  console.log("this.state",this.state)*/
                })
                .catch(err=>{
                    console.log(err)
                })


    }

    dataFetchDynamic=()=>{
        console.log("dataFetchStatic")

        var URL2='http://139.59.16.180:8989/fixture/view/'+localStorage.getItem('tournamentId')+"/"+this.state.selectedMatchType
       console.log("url2",URL2)
        Axios
        .get(URL2)
        .then(res => {
            console.log(res,res.data.data); 
            var N=res.data.data.length
            console.log("length=",N)
           /* var p=parseInt(Math.sqrt(N))

            if(Math.pow(2,p)<N)
            p=p+1

            var initialMatches=(Math.pow(2,p-1))
             /* console.log("initialMatches=",initialMatches)*/
            
             var initialMatches=(N+1)/2
            var fixturesRoundWise=[]
            var l,i,p=0
            while(initialMatches>=1)
            {l=[]
                i=p
                while(i<p+initialMatches)
                {   
                    l.push(res.data.data[i])
                    i=i+1
                    console.log("round","[",initialMatches,"]","[",i,"]",res.data.data[i])
                  

                }
                p=i
                fixturesRoundWise.push(l)
                initialMatches=initialMatches/2


            }
            console.log("fixturesRoundWise=",fixturesRoundWise)



           this.setState({fixtures:fixturesRoundWise})
        })
        .catch(err=>{
            console.log(err)
        })



        
    }


    componentDidMount(){
        console.log("componentDidMount",this.state)
        this.dataFetchStatic()
        this.dataFetchDynamic()
               
    }

    componentDidUpdate(){
        console.log("componentUpdate",this.state)
        
      

    }

    matchTypeChangeHandle=e=>{
        console.log("matchTypeChangeHandle",this.state)
       /* console.log("selected matchType is = ",e.target.value)*/
        this.setState({selectedMatchType:e.target.value},() => {
            this.dataFetchDynamic();});
      
        console.log("Here after dataFetchDynamic")
    }

    goToLink=(link,setIds,biId)=>{
        localStorage.setItem("setIds",setIds)
        localStorage.setItem("biId",biId)
        localStorage.setItem("selectedMatchType",this.state.selectedMatchType)
        console.log("Here goToLink",link,setIds,biId)
        this.props.history.push(link);

    }

    render(){
        if(this.state.isLoaded===false)
        return( <div className="text-center">
                <br/>
                <br/>
                <br/>
                Loading...
                </div>)
        return(
            <div>
                <div className="box1">
                    <br/>
                    <div className="row alignRight content name1">
                    {this.state.tournamentName}
                    </div>
                    <div className="row">
                        <div className="col-12"><br/></div>
                        <div className="col-4 alignRight alignTop">
                            <label>View for: </label>
                        </div>
                        <div className="col-8 alignLeft">
                        
                                <select id="inputState" class="form-control" onChange={this.matchTypeChangeHandle}>
                                {this.state.matchesType.map(matchType=>(
                                    
                                <option value={matchType}>{matchType}</option>))
                                
                                }
                                </select>
                                
                        </div>
                    </div>
                </div>
                <>

                <div class="bracket ">
                    {/*console.log("this.state.fixtures=",this.state.fixtures)*/}
                    {this.state.fixtures.map(round=>(
                <div class="column">
                    {round.map(match=>(
                        <div class="match winner-top" >
                            {/*localStorage.setItem("setIds",match.set1Id+','+match.set2Id+','+match.set3Id)*/}
                            <FixturesLinkBoxes link={`/Scorer/${match.id}/${this.state.playerDic[match.team1Id]}/${this.state.playerDic[match.team2Id]}/${match.team1Id}/${match.team2Id}`}
                                                 team1={this.state.playerDic[match.team1Id]} team2={this.state.playerDic[match.team2Id]}
                                                 team1Id={match.team1Id} team2Id={match.team2Id} goToLink={this.goToLink} 
                                                 setIds={match.set1Id+','+match.set2Id+','+match.set3Id} biId={match.biId} status={match.status} winner={match.winnerId}> 
                                                 
                            </FixturesLinkBoxes>
                            {/*<Link to={`/Scorer/${match.id}/${match.set1Id}_${match.set2Id}_${match.set3Id}/${this.state.playerDic[match.team1Id]}/${this.state.playerDic[match.team2Id]}/${match.team1Id}/${match.team2Id}`} team1Id={match.team1Id} team2Id={match.team2Id}>
                                <div class="match-top team" >
                                    <span class="seed">
                                        <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' alt="" className='fimg'/>
                                    </span>
                                    <span class="fixtureName" >
                                        {this.state.playerDic[match.team1Id]}
                                    </span>                            
                                </div>
                                                        
                                <div class="match-bottom team">
                                    <span class="seed">
                                        <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' alt="" className='fimg'/>
                                    </span>
                                    <span class="fixtureName">
                                        {this.state.playerDic[match.team2Id]}
                                    </span>   
                                </div>
                    </Link>*/} 

                            <div class="match-lines">
                                <div class="line one"></div>
                                <div class="line two"></div>
                            </div>
                            <div class="match-lines alt">
                                <div class="line one"></div>
                            </div>
                        </div>
                        
                    ))}
                </div>
                ))}
                </div>

                </>
            </div>

        )
    }
}