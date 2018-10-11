import React, {Component} from 'react';
import { Container } from 'reactstrap';
import Info from './Info';
import Options from './Options';
import Interop from './Interop';

import {get_config, request} from '../../api/api';
import Map from "./Map";
import Itinerary from "./Itinerary";
import Trip from "./Trip";
import ModifyButton from "./ModifyButton";
import SetStartLegButton from "./SetStartLegButton";
import SearchBar from "./SearchBar";
import ScratchButton from "./ScratchButton";
import RenderButton from "./RenderButton";
import SaveButton from "./SaveButton";

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
        //Starts true, turns false if ScratchButton is clicked or Load is selected. ScratchButton is visible while true.
        fromScratch: true,
        //Starts false. Turns true if ScratchButton is clicked. Turning true reveals options for building a trip from scratch. Turns false again when RenderButton is clicked.
        fromScratchButtons: false,
        //Starts false. Turns true if Load is selected. Turning true reveals ModifyButton.
        modify: false,
        //Starts false. Turns true if ModifyButton is clicked. Turning true reveals options for modifying an itinerary.
        showModifyButtons: false,
      trip: {
        type: "trip",
        version: "3",
        title: "Stuffity",
        options : {
          units: "",
            unitName: "",
            unitRadius: "",
            optimization: "none"
        },
        places: [],
        distances: [],
        map: ''
      }
    };
    this.updateTrip = this.updateTrip.bind(this);
    this.updateBasedOnResponse = this.updateBasedOnResponse.bind(this);
    this.updateOptions = this.updateOptions.bind(this);
    this.updateMap = this.updateMap.bind(this);
    this.updateTFFI = this.updateTFFI.bind(this);
    this.updateDistances = this.updateDistances.bind(this);

    this.updateNumber = this.updateNumber.bind(this);
    this.changeServer = this.changeServer.bind(this);


    this.updateScratchButton = this.updateScratchButton.bind(this);
    this.updateFromScratch = this.updateFromScratch.bind(this);
    this.closeScratchButton = this.closeScratchButton.bind(this);
    this.updateModify = this.updateModify.bind(this);
    this.updateShowModify = this.updateShowModify.bind(this);
    this.updateRenderButton = this.updateRenderButton.bind(this);

    this.search = this.search.bind(this);
    this.reverseTrip = this.reverseTrip.bind(this);
    this.removeLeg = this.removeLeg.bind(this);
    this.setStartLeg = this.setStartLeg.bind(this);
    this.saveTrip = this.saveTrip.bind(this);
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

  //TODO: Create Plan Request function to use across all buttons and components

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

  //TODO: Implement update* methods to change boolean state
  updateFromScratch(){
      this.setState({
          fromScratch:false,
          fromScratchButtons:true
      });
  }

  updateScratchButton(){
      this.setState({
          fromScratch:false,
          fromScratchButtons:true
      });
  }

  closeScratchButton(){
      this.setState({
          fromScratch:false
      });
  }

  updateModify(value){
      this.setState({
          modify:value
      });
  }

  updateShowModify(){

      this.setState({
          showModifyButtons:true
      });
  }

  updateRenderButton(){
      this.setState({
          fromScratchButtons:false
      });
  }

  //TODO: Implement search() function
  search(value){

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

  //TODO: Implement setStartLeg() function
  setStartLeg(value){

  }

  //TODO: Implement saveTrip() function
  saveTrip(){

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
              {this.state.fromScratch && <ScratchButton updateScratchButton={this.updateScratchButton}/>}
              <Trip trip={this.state.trip}
                    updateTrip={this.updateTrip}
                    updateModify={this.updateModify}
                    closeScratchButton={this.closeScratchButton}
                    updateMap={this.updateMap}
                    updateTFFI={this.updateTFFI}
                    updateDistances={this.updateDistances}
                    updateOptions={this.updateOptions}
                    port={this.state.port}
                    URL={this.state.URL}/>
              <Map trip={this.state.trip} URL={this.state.URL} port={this.state.port}/>
              <Itinerary trip={this.state.trip}
                         updateMap={this.updateMap}
                         updateDistances={this.updateDistances}
                         removeLeg={this.removeLeg}
                         reverseTrip={this.reverseTrip}/>
              <Interop port={this.state.port} URL={this.state.URL} updateNumber={this.updateNumber} changeServer={this.changeServer}/>
              {this.state.fromScratchButtons && <SearchBar showButtons={this.state.showModifyButtons}/>}
              {this.state.fromScratchButtons && <RenderButton showButtons={this.updateRenderButton}/>}
              {this.state.modify && <ModifyButton updateShowModify={this.updateShowModify}/>}
              {this.state.showModifyButtons && <SetStartLegButton showButtons={this.state.showModifyButtons}/>}
              {this.state.showModifyButtons && <SearchBar showButtons={this.state.showModifyButtons}/>}
              {this.state.showModifyButtons && <SaveButton showButtons={this.state.showModifyButtons}/>}
          </Container>
      )
    }
}

export default Application;