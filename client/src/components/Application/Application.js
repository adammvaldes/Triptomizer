import React, {Component} from 'react';
import { Container } from 'reactstrap';
import Info from './Info'
import Options from './Options';
import { ButtonGroup, Button } from 'reactstrap'

import { get_config } from '../../api/api';
import Map from "./Map";
import Itinerary from "./Itinerary";
import Trip from "./Trip";

/* Renders the application.
 * Holds the destinations and options state shared with the trip.
 */
class Application extends Component {
  constructor(props){
    super(props);

    this.state = {
      config: null,
      trip: {
        type: "trip",
        version: "2",
        title: "Stuffity",
        options : {
          units: "miles"
        },
        places: [
            {"id":"dnvr", "name":"Denver", "latitude":39.7392, "longitude":-104.9903},
            {"id":"bldr", "name":"Boulder", "latitude":40.01499, "longitude":-105.27055},
            {"id":"foco", "name":"Fort Collins", "latitude":40.585258, "longitude":-105.084419},
            {"id":"stuff", "name":"Anything", "latitude":36.9932,"longitude":-102.0420}
        ],
        distances: [],
        map: ''
      }
    };
    this.updateTrip = this.updateTrip.bind(this);
    this.updateBasedOnResponse = this.updateBasedOnResponse.bind(this);
    this.updateOptions = this.updateOptions.bind(this);
    this.updateMap = this.updateMap.bind(this);
    this.updateStuff = this.updateStuff.bind(this);
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

  updateMap(value){
      let trip = this.state.trip;
      trip.map = value;
      //trip.title = value;
      this.setState(trip);
  }

  updateStuff(value){
      this.setState({'trip' : value});
  }

  render() {
    if(!this.state.config) { return <Container/> }

    return(
      <Container id="Application">
        <Info/>
          <Options options={this.state.trip.options} config={this.state.config} updateOptions={this.updateOptions}/>
          <Trip trip={this.state.trip} updateStuff={this.updateStuff} updateMap={this.updateMap} />
          <Map trip={this.state.trip} updateMap={this.updateMap}/>
          <Itinerary trip={this.state.trip}/>
      </Container>
    )
  }
}
/*<button className="btn"  onClick={()=> {
    return (
        <Map trip={{  "type" : "trip",  "version" : 2,  "title" : "Shopping loop",  "options" : {     "units":"miles"     },  "places" :  [     {"id":"dnvr", "name":"Denver", "latitude":39.7392, "longitude":-104.9903},       {"id":"bldr", "name":"Boulder", "latitude":40.01499, "longitude":-105.27055} ] }} updateMap={this.updateMap}/>
    )
}} type="button">Plan</button>*/
export default Application;