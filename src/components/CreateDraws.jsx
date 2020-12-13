import React, {Component} from 'react';
import Axios from 'axios';

import Header from "./Header";
import RoundAvatar from "../shared/images/RoundAvatar.png";
import CreateDrawsAddRemove from "./CreateDrawsAddRemove";



export default class CreateDraws extends Component{
    constructor(props){  
            super(props);
            var x=localStorage.getItem("matchesType");
            x=x.split(',');
            var dic={}
            var i
            for(i=0;i<x.length;i++ )
            {
                dic[x[i]]=[];

            }
            console.log("dic",dic)
            this.state={
                matchesType:x,
                selectedMatchType:x[0],
                isLoaded:false,
                players:[],
                filteredPlayers:[],
                selectedPlayers:dic,
                keyword:""
            } 
        }
        matchTypeChangeHandle=e=>{
            console.log(e.currentTarget.value)
            console.log(e.target.value)
            var list=[]
            var flag=0
            if(e.target.value==="Men's singles" || e.target.value==="Men's doubles")
            {    var k=this.state.keyword.toLowerCase()
                list=this.state.players.filter(player=>player.gender=='Male')
                list=list.filter(player=>player.name.includes(k))
                console.log("here in 1 if",list)
            }
            else if(e.target.value==="Women's single" || e.target.value==="Women's doubles")
            {    var k=this.state.keyword.toLowerCase()
                list=this.state.players.filter(player=>player.gender=='Female')
                list=list.filter(player=>player.name.includes(k))
                console.log("here in 2 if",list)
            }
            else if(e.target.value==="Mixed doubles")
            {    var k=this.state.keyword.toLowerCase()
                list=this.state.players
                list=list.filter(player=>player.name.includes(k))
                console.log("here in 3 if",list)

            }
            else{
                console.log("here in else",list)
                var matchType=this.state.selectedMatchType
                if(matchType==="Men's singles" || matchType==="Men's doubles")
                {  
                    list=this.state.players.filter(player=>player.gender=='Male')
                    console.log("here in search 1 if",list)

                }
                else if(matchType==="Women's single" || matchType==="Women's doubles")
                {    
                    list=this.state.players.filter(player=>player.gender=='Female')
                    console.log("here in search 2 if",list)

                }
                else if(matchType==="Mixed doubles")
                {    
                    list=this.state.players
                    console.log("here in search 3 if",list)
    
                }
                list=list.filter(player=>player.name.toLowerCase().includes(e.target.value.toLowerCase()))  
                flag=1

            }

            if(flag)
            {
                console.log("flag=",flag)
            this.setState({keyword:e.target.value,filteredPlayers:list})
            }
            else
            {               
                console.log("flag=",flag)
            this.setState({selectedMatchType:e.target.value,filteredPlayers:list})
            }

        }

        searchChangeHandle=e=>{
            var k=e.target.value
            console.log("in searchChangeHandle", e.target.value)
            console.log("after setting state")
            var l=this.state.filteredPlayers.filter(player=>player.name.includes(k))
            this.setState({keyword:k,filteredPlayers:l})    
        }
        addPlayer=(e,id)=>{
            var d=this.state.selectedPlayers
            console.log("in addPlayer",e,e.currentTarget.value,id,d)
            let array = d[this.state.selectedMatchType]
            console.log("array=",array)
            d[this.state.selectedMatchType].push(id.toString())
            console.log("array after push",d[this.state.selectedMatchType])
            this.setState({selectedPlayers:d})

        }
        removePlayer=(e,id)=>{
            var d=this.state.selectedPlayers
            id=id.toString()
            console.log("in removePlayer",e,e.currentTarget.value,id,d)
            let array = d[this.state.selectedMatchType]
            console.log("array=",array)
            const index = array.indexOf(id);
            if (index > -1) {
                d[this.state.selectedMatchType].splice(index,1)
            }
            console.log("array after removal",d[this.state.selectedMatchType])
            this.setState({selectedPlayers:d})
    


        }

        submit=e=>{
            console.log("inSubmit")
            const token='Bearer '+localStorage.getItem('token')
            var URL
            const id=localStorage.getItem('tournamentId')
            console.log(id)
            var i
            var data
            for(i=0;i<this.state.matchesType.length;i++)
            {
                URL='http://139.59.16.180:8989/fixture/set/'+this.state.matchesType[i]
                data={data:{"id": id,"players": this.state.selectedPlayers[this.state.matchesType[i]]}}
                console.log('here is the token ',token,URL)
                console.log("data=",data)
               /* URL="http://139.59.16.180:8989/player/details/5"*/
                Axios.post(URL,data, {headers : {'Authorization':token}})
                .then(res => {
                    console.log("inside here")
                    this.props.history.push("/fixture");
                })
                .catch(err=>{
                    console.log(err)
                })

            }
            


        }
        componentDidMount(){
            const token='Bearer '+localStorage.getItem('token');
            const URL='http://139.59.16.180:8989/player/list/';
            console.log('here is the token '+token);
            Axios
            .get(URL, {headers : {'Authorization':token}})
            .then(res => {
            console.log("in then",res.data)
            this.setState({players:res.data})
            if(this.state.selectedMatchType==="Men's singles" || this.state.selectedMatchType==="Men's doubles")
            {
                var list=res.data.filter(player=>player.gender=='Male')
                console.log("here in if",list)
                this.setState({filteredPlayers:list})
            }
            else if(this.state.selectedMatchType==="Women's single" || this.state.selectedMatchType==="Women's doubles")
            {
                var list=res.data.filter(player=>player.gender=='Female')
                console.log("here in if",list)
                this.setState({filteredPlayers:list})
            }
            else{
                this.setState({filteredPlayers:res.data})
            }
            this.setState({isLoadeded:true})

            })
            .catch(err=>{
            console.log(err)
        })
        }
        componentDidUpdate(){
            console.log("componentDidUpdate",this.state.keyword,this.state.selectedPlayers)
            console.log(this.state.selectedPlayers[this.state.selectedMatchType].includes(5))

           
        }
    render(){
    
    const heading="Create draws";
        return(
            <div>
                <Header heading={heading} history={this.props.history}/>
                <br/><br/><br/>
                <form className="form1">
                <div className="row">
                    <div className="col-12"><br/></div>
                    <div className="col-4 alignRight alignTop">
                        <label>Match type </label>
                    </div>
                    <div className="col-8 alignLeft">
                    
                            <select id="inputState" className="form-control" onChange={this.matchTypeChangeHandle}>
                            {this.state.matchesType.map(matchType=>(
                            <option value={matchType}>{matchType}</option>))}
                             </select>
                    </div>
                </div>
                <div className="row">
                <div className="col-12"><br/></div>
                <div className="col-12" >
                    <div className="right-inner-addon">
                        <input value={this.state.keyword} onChange={this.matchTypeChangeHandle} type="search" className="form-control" placeholder="Q Search" />
                    </div>
                </div>
                </div>
                </form>
                <div className="marginBottom">
                {this.state.filteredPlayers.map(player=>(
                <div className="box3">
                    <br/>
                <div className="row alignRight">

                        <div className="col-5 col-sm-4 col-md-4 ">
                        <img src={RoundAvatar} className="roundprofileimg1" alt="Avatar"></img>
                        </div>
                        <div className="col-5 col-sm-6 col-md-6 ">
                            <div className="name5 alighRight">
                                {player.name}
                            </div>
                            <div className="name6">
                                <span>{player.age} years</span>
                                <span style={{"marginLeft":"6%"}}>{player.gender}</span>
                            </div>
                        </div>
                        {console.log("player.id=",player.id,"this.state.selectedPlayers[this.state.selectedMatchType]",this.state.selectedPlayers[this.state.selectedMatchType],this.state.selectedPlayers[this.state.selectedMatchType].includes(player.id))}
                        <CreateDrawsAddRemove isInTheList={this.state.selectedPlayers[this.state.selectedMatchType].includes(player.id.toString())} addPlayer={this.addPlayer} removePlayer={this.removePlayer} playerId={player.id}/>
                             
                        <div className="col-12">
                            <br/>
                        </div>
                        <div className="col-6 col-sm-4 col-md-4 ">
                        <button type="button" class="btn btn-outline-secondary btn1">Add seed rank</button>
                        </div>
                        <div className="col-6 col-sm-8 col-md-8 name6 alignRight ">
                            Adding seed rank is optional
                        </div>
                </div>    
                <hr className="hr-style"/>  
                </div>
                ))}
                </div>
               

                <div className="fixed-bottom footer2" onClick={this.submit}>Create draws</div>
            </div>

        )
    }
}