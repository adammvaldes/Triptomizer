import React, {Component} from 'react';
import { Container } from 'reactstrap';
import Info from './Info'
import Options from './Options';

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

  render() {
    if(!this.state.config) { return <Container/> }
      return(
          <Container id="Application">
              <Info/>
              <Options options={this.state.trip.options} config={this.state.config} updateOptions={this.updateOptions}/>
              <Trip trip={this.state.trip}
                    updateMap={this.updateMap}
                    updateTFFI={this.updateTFFI}
                    updateDistances={this.updateDistances} />
              <Map trip={this.state.trip} />
              <Itinerary trip={this.state.trip} />
          </Container>
      )
    }
}

export default Application;