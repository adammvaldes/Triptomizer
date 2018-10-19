import React, {Component} from 'react';
import { Container } from 'reactstrap';
import Info from './Info';
import Options from './Options';
import Interop from "./Interop";
import {get_config, request} from '../../api/api';
import Map from "./Map";
import Itinerary from "./Itinerary";
import Trip from "./Trip";
import SearchBar from "./SearchBar";
import OptimizationButtons from "./OptimizationButtons";

/* Renders the application.
 * Holds the destinations and options state shared with the trip.
 */
class Application extends Component {
  constructor(props){
    super(props);

    this.state = {
      config: null,
        port: "",
        URL: "",
      trip: {
        type: "trip",
        version: "3",
        title: "Stuffity",
        options : {
          units: "miles",
            unitName: "miles",
            unitRadius: "3959",
            optimization: "none"
        },
        places: [],
        distances: [],
        map: ''
      }
    };
    this.planRequest = this.planRequest.bind(this);
    this.clearTrip = this.clearTrip.bind(this);
    this.updateTrip = this.updateTrip.bind(this);
    this.updateBasedOnResponse = this.updateBasedOnResponse.bind(this);
    this.updateOptions = this.updateOptions.bind(this);
    this.updateMap = this.updateMap.bind(this);
    this.updateTFFI = this.updateTFFI.bind(this);
    this.updateDistances = this.updateDistances.bind(this);

    this.updateNumber = this.updateNumber.bind(this);
    this.changeServer = this.changeServer.bind(this);

    this.addDestination = this.addDestination.bind(this);
    this.reverseTrip = this.reverseTrip.bind(this);
    this.removeLeg = this.removeLeg.bind(this);
    this.setStartLeg = this.setStartLeg.bind(this);
  }

  componentWillMount() {
    get_config().then(
      config => {
        this.setState({
          config:config
        })
      }
    );
  }

  planRequest(){
        if(this.state.URL === "" || this.state.port==="314") {
            this.updateOptions('unitName', this.state.trip.options.units);
            request(this.state.trip, "plan").then(serverResponse => {
                this.updateMap(serverResponse["map"]);
                this.updateDistances(serverResponse["distances"]);
            });
        }
        else{
            this.updateOptions('unitName', this.state.trip.options.units);
            request(this.state.trip, "plan",this.state.port,this.state.URL).then(serverResponse => {
                this.updateMap(serverResponse["map"]);
                this.updateDistances(serverResponse["distances"]);
            });
        }
  }

  clearTrip(){
      let trip = this.state.trip;
      trip.places.length = 0;
      trip.distances.length = 0;
      trip.options.units = "";
      trip.options.unitName = "";
      trip.options.unitRadius = "";
      trip.options.optimization = "none";
      this.setState(trip);
  }

  updateTrip(field, value){
    let trip = this.state.trip;
    trip[field] = value;
    this.setState(trip);
  }

  updateBasedOnResponse(value) {
    this.setState({'trip': value});
  }

  updateOptions(option, value){
    let trip = this.state.trip;
    trip.options[option] = value;
    this.setState(trip);
  }

  //Functions to update the state in the Trip Class
  updateMap(value){
      let trip = this.state.trip;
      trip.map = value;
      this.setState(trip);
  }

  updateDistances(value){
      let trip = this.state.trip;
      trip.distances = value;
      this.setState(trip);
  }

  updateTFFI(value){
      this.setState({'trip' : value});
  }

  //Function to update the server for Interoperation of teams
    updateNumber(value){
      this.setState({
          port:value
      });
  }

  changeServer(value){
      this.setState({
          URL:value
      });
  }

  addDestination(value){
      let trip = this.state.trip;
      trip.places.push(value);
      this.setState(trip);
      this.planRequest();
  }

  reverseTrip(){
      let trip = this.state.trip;
      trip.places.reverse();
  }

  removeLeg(value){
      if(value < 0){
          return;
      }
      let trip = this.state.trip;
      trip.places.splice(value,1);
  }

  setStartLeg(value){
      if(value <= 0){
          return;
      }
      let trip = this.state.trip;
      let temp = trip.places[value];
      trip.places.splice(value, 1);
      trip.places.splice(0, 0, temp);
  }

  render() {
    if(!this.state.config) { return <Container/> }
      return(
          <Container id="Application">
              <Info/>
              <Options options={this.state.trip.options}
                       config={this.state.config}
                       updateOptions={this.updateOptions}
                       updateDistances={this.updateDistances}/>
              <Interop changeServer={this.changeServer}
                       updateNumber={this.updateNumber}
                       updateDistances={this.updateDistances}/>
              <OptimizationButtons updateOptions={this.updateOptions}
              config={this.state.config}/>
              <Trip trip={this.state.trip}
                    planRequest={this.planRequest}
                    clearTrip={this.clearTrip}
                    updateTrip={this.updateTrip}
                    updateMap={this.updateMap}
                    updateTFFI={this.updateTFFI}
                    updateDistances={this.updateDistances}
                    updateOptions={this.updateOptions}
                    port={this.state.port}
                    URL={this.state.URL}/>
              <Map trip={this.state.trip} URL={this.state.URL} port={this.state.port}/>
              <SearchBar addDestination={this.addDestination}/>
              <Itinerary trip={this.state.trip}
                         planRequest={this.planRequest}
                         updateMap={this.updateMap}
                         updateDistances={this.updateDistances}
                         removeLeg={this.removeLeg}
                         reverseTrip={this.reverseTrip}
                         setStartLeg={this.setStartLeg}/>
          </Container>
      )
    }
}

export default Application;