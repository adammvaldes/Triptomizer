import React, {Component} from 'react';
import { Container } from 'reactstrap';
import Info from './Info'
import Options from './Options';
import { ButtonGroup, Button } from 'reactstrap'

import { get_config } from '../../api/api';
import Map from "./Map";
import Itinerary from "./Itinerary";

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
        title: "aslkdfjoawiej",
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
        map: '<svg width="1920" height="200" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><g>' +
             '<rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)" />' +
             '</g></svg>'
      }
    };
    this.updateTrip = this.updateTrip.bind(this);
    this.updateBasedOnResponse = this.updateBasedOnResponse.bind(this);
    this.updateOptions = this.updateOptions.bind(this);
    this.updateMap = this.updateMap.bind(this);
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

  render() {
    if(!this.state.config) { return <Container/> }

    return(
      <Container id="Application">
        <Info/>
          <Options options={this.state.trip.options} config={this.state.config} updateOptions={this.updateOptions}/>
          <Map trip={this.state.trip} updateMap={this.updateMap}/>
          <Itinerary trip={this.state.trip} />
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