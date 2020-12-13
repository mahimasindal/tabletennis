import React from 'react'
import medal from "../shared/images/medal.png";

export default function ScorerSets(props)
{
    var setIds=props.setIds
    var set1=props.set1
    var set2=props.set2
    var set3=props.set3
    var biId=props.biId
    var maxScore=parseInt(localStorage.getItem("maxScore"))

    console.log(set1,set2,set3,setIds,maxScore,props.biId)
    
    /*Case 1  0N 0N 0N*/
    if(setIds[0]===0 || (biId!==0 && setIds[0]===-1))
    {
    return(
    <div className="row">
                    <div className="col-12 text-center">
                        <div className="box4">
                            <div className="row name8">
                                <div className="col-4">
                                -
                                </div>
                                <div className="col-4">
                                Set1
                                </div>
                                <div className="col-4">
                                -
                                </div>
                            </div>

                        </div>
                        
                    </div>
                    <div className="col-12 text-center">
                        <div className="box4">
                            <div className="row name8">
                                <div className="col-4">
                                -
                                </div>
                                <div className="col-4">
                                Set2
                                </div>
                                <div className="col-4">
                                -
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 text-center">
                        <div className="box4">
                            <div className="row name8">
                                <div className="col-4">
                                -
                                </div>
                                <div className="col-4">
                                Set3
                                </div>
                                <div className="col-4">
                                -
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

)
}


/*Case 2  1G 0N 0N */
/*case 3 1C 0N 0N*/

else if((setIds[0]!==1 && setIds[1]===0)||(biId!==0 && setIds[0]!==-1 && setIds[1]===-1 && setIds[2]===-1))
{
return(<>
                <div className="row">
                    <div className=" box4 text-center">
                        {
                            set1.team1Score===maxScore?
                            <div className="leftIcon">
                                <img className="smallMedal" src={medal}/>
                            </div>:
                            <></>
                        }
                            <div className="row name8">
                                <div className="col-4">
                                {set1.team1Score}
                                </div>
                                <div className="col-4">
                                Set1
                                </div>
                                <div className="col-4">
                                {set1.team2Score}
                                </div>

                           </div>
                        {   
                            set1.team2Score===maxScore?
                            <div className="rightIcon">
                                <img className="smallMedal" src={medal}/>
                            </div>:
                            <></>
                        }
                        
                    </div>
                </div>
                    
                    <div className="col-12 text-center">
                        <div className="box4">
                            <div className="row name8">
                                <div className="col-4">
                                -
                                </div>
                                <div className="col-4">
                                Set2
                                </div>
                                <div className="col-4">
                                -
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 text-center">
                        <div className="box4">
                            <div className="row name8">
                                <div className="col-4">
                                -
                                </div>
                                <div className="col-4">
                                Set3
                                </div>
                                <div className="col-4">
                                -
                                </div>
                            </div>

                        </div>
                    </div>
                    </>

              

)
}


/*case 4 1C 2G 0N*/
/*case 5 1C 2C 0N*/
else if(setIds[0]!==0 && setIds[1]!==0 && (setIds[2]===0|| setIds[2]===-1)||(biId!==0 && setIds[0]!==-1 && setIds[1]!==-1 && setIds[2]===-1))
{
return(
    <>
    <div className="row">
        {console.log(set1.team1Score,set2.team2Score,maxScore,set1.team1Score===maxScore)}
                    <div className=" box4 text-center">
                        {
                            set1.team1Score===maxScore?
                            <div className="leftIcon">
                                <img className="smallMedal" src={medal}/>
                            </div>:
                            <></>
                        }
                            <div className="row name8">
                                <div className="col-4">
                                {set1.team1Score}
                                </div>
                                <div className="col-4">
                                Set1
                                </div>
                                <div className="col-4">
                                {set1.team2Score}
                                </div>

                           </div>
                        {   
                            set1.team2Score===maxScore?
                            <div className="rightIcon">
                                <img className="smallMedal" src={medal}/>
                            </div>:
                            <></>
                        }
                        
                    </div>
        </div>

          <div className="row">
                        <div className="box4 text-center">
                        {
                            set2.team1Score===maxScore?
                            <div className="leftIcon">
                                <img className="smallMedal" src={medal}/>
                            </div>:
                            <></>
                        }
                            <div className="row name8">
                                <div className="col-4">
                                {set2.team1Score}
                                </div>
                                <div className="col-4">
                                Set2
                                </div>
                                <div className="col-4">
                                {set2.team2Score}
                                </div>
                            </div>
                           { set2.team2Score===maxScore?
                            <div className="rightIcon">
                                <img className="smallMedal" src={medal}/>
                            </div>:
                            <></>
                           }
                        </div>
                        </div>
        
                    <div className="col-12 text-center">
                        <div className="box4">
                            <div className="row name8">
                                <div className="col-4">
                                -
                                </div>
                                <div className="col-4">
                                Set3
                                </div>
                                <div className="col-4">
                                -
                                </div>
                            </div>

                        </div>
                    </div>
                </>

               

)
}




/*case 6 1C 2C 3G*/
/*case 7 1C 2C 3C*/
if((setIds[0]!==0 && setIds[1]!==0 && setIds[2]!==0)||(biId!==0 && setIds[0]!==-1 && setIds[1]!==-1 && setIds[2]!==-1))
{
return(
    <>
    <div className="row">
        {console.log(set1.team1Score,set2.team2Score,maxScore,set1.team1Score===maxScore)}
                    <div className=" box4 text-center">
                        {
                            set1.team1Score===maxScore?
                            <div className="leftIcon">
                                <img className="smallMedal" src={medal}/>
                            </div>:
                            <></>
                        }
                            <div className="row name8">
                                <div className="col-4">
                                {set1.team1Score}
                                </div>
                                <div className="col-4">
                                Set1
                                </div>
                                <div className="col-4">
                                {set1.team2Score}
                                </div>

                           </div>
                        {   
                            set1.team2Score===maxScore?
                            <div className="rightIcon">
                                <img className="smallMedal" src={medal}/>
                            </div>:
                            <></>
                        }
                        
                    </div>
        </div>

          <div className="row">
                        <div className="box4 text-center">
                        {
                            set2.team1Score===maxScore?
                            <div className="leftIcon">
                                <img className="smallMedal" src={medal}/>
                            </div>:
                            <></>
                        }
                            <div className="row name8">
                                <div className="col-4">
                                {set2.team1Score}
                                </div>
                                <div className="col-4">
                                Set2
                                </div>
                                <div className="col-4">
                                {set2.team2Score}
                                </div>
                            </div>
                           { set2.team2Score===maxScore?
                            <div className="rightIcon">
                                <img className="smallMedal" src={medal}/>
                            </div>:
                            <></>
                           }
                        </div>
                        </div>
        
                        <div className="row">
                        <div className="box4 text-center">
                        {
                            set3.team1Score===maxScore?
                            <div className="leftIcon">
                                <img className="smallMedal" src={medal}/>
                            </div>:
                            <></>
                        }
                            <div className="row name8">
                                <div className="col-4">
                                {set3.team1Score}
                                </div>
                                <div className="col-4">
                                Set3
                                </div>
                                <div className="col-4">
                                {set3.team2Score}
                                </div>
                            </div>
                           { set3.team2Score===maxScore?
                            <div className="rightIcon">
                                <img className="smallMedal" src={medal}/>
                            </div>:
                            <></>
                           }
                        </div>
                        </div>
                </>


)
}

}