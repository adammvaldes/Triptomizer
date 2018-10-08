import React, {Component} from 'react';Options
import { Container } from 'reactstrap';
import Info from './Info'
import Options from './Options';
import Interop from './Interop';

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
        port: "",
        URL: "",
      trip: {
        type: "trip",
        version: "2",
        title: "Stuffity",
        options : {
          units: "",
            unitName: "",
            unitRadius: ""
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


  render() {
    if(!this.state.config) { return <Container/> }
      return(
          <Container id="Application">
              <Info/>
              <Options options={this.state.trip.options}
                       config={this.state.config}
                       updateOptions={this.updateOptions}
                       updateDistances={this.updateDistances} />
              <Trip trip={this.state.trip}
                    updateMap={this.updateMap}
                    updateTFFI={this.updateTFFI}
                    updateDistances={this.updateDistances}
                    updateOptions={this.updateOptions}
                    port={this.state.port}
                    URL={this.state.URL}/>
              <Map trip={this.state.trip} URL={this.state.URL} port={this.state.port}/>
              <Itinerary trip={this.state.trip} />
              <Interop port={this.state.port} URL={this.state.URL} updateNumber={this.updateNumber} changeServer={this.changeServer}/>
          </Container>
      )
    }
}

export default Application;