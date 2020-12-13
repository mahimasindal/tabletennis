/*dependencies*/
import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

/*Public Routes*/
import Home from "../Home.jsx";
import Signup from "../Signup.jsx";
import Login from "../Login1.jsx";
import Otp from "../Otp.jsx";
import Tournaments from "../Tournaments.jsx";
import LogOutPage from "../LogOutPage.jsx";

/*Private Routes*/
import Profile from "../Profile.jsx";
import FirstTournament from "../FirstTournament";
import Players from "../Players";
import AddPlayerForm from "../AddPlayerForm";
import PlayerList from "../PlayerList";
import PlayerDetails from "../PlayerDetails";
import TournamentsLoggedIn from "../TournamentsLoggedIn";
import TournamentDetail from '../TournamentDetail';
import CreateTournament from '../CreateTournament';
import CreateDraws from '../CreateDraws';
import Matches from '../Matches';
import Scorer from '../Scorer';
import ScorerAudience from '../ScorerAudience';
import Fixture from "../Fixture";
import EditPlayer from "../EditPlayer";
import EditTournament from "../EditTournament";


const Routes = (props) => (

    
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/Signup" component={Signup}/>
                <Route path="/Login" component={Login}/>
                <Route path="/Otp" component={Otp}/>
                <Route path="/Tournaments" component={Tournaments}/>
                <Route path="/TournamentDetail/:id" component={TournamentDetail}/>
                <Route path="/CreateTournament"component={CreateTournament}/>
                <Route path="/CreateDraws"component={CreateDraws}/>
                <Route path="/Matches"component={Matches}/>
                <Route path="/Scorer/:id/:team1/:team2/:team1id/:team2id"component={Scorer}/>
                <Route path="/Score/:id/:team1/:team2/:team1id/:team2id" component={ScorerAudience}/>
                <Route path="/Fixture"component={Fixture}/>
                <Route path="/loggedout"component={LogOutPage}/>;


                <PrivateRoute path="/TournamentsLoggedIn" component={TournamentsLoggedIn}/>
                <PrivateRoute path="/Profile" component={Profile}/>
                <PrivateRoute path="/FirstTournament" component={FirstTournament}/>
                <PrivateRoute path="/Players" component={Players}/>
                <PrivateRoute path="/AddPlayerForm" component={AddPlayerForm}/>
                <PrivateRoute path="/PlayerList" component={PlayerList}/>
                <PrivateRoute path="/PlayerDetails/:id" component={PlayerDetails}/>
                <PrivateRoute path="/EditPlayer/:id" component={EditPlayer}/>
                <PrivateRoute path="/EditTournament/:id" component={EditTournament}/>

            </Switch>
        )
    
        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route
              {...rest}
              render={props =>
                localStorage.getItem('token') ? (
                  <Component {...props} />
                ) : (
                  <Redirect
                    to={{
                      pathname: "/"
                    }}
                  />
                )
              }
            />
          );
          
          
          export default Routes;