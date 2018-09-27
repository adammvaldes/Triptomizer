import React, {Component} from 'react';
import { Container } from 'reactstrap';
import Info from './Info'
import Options from './Options';

import { get_config } from '../../api/api';
import Map from "./Map";

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
        title: "",
        options : {
          unit: "miles"
        },
        places: [],
        distances: [],
        map: ''/*'<svg width="1920" height="200" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><g>' +
            '<rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)" />' +
            '</g></svg>'*/
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

  updateMap(map, value){
      let trip = this.state.trip;
      trip.map = value;
      this.setState(trip);
  }

  render() {
    if(!this.state.config) { return <Container/> }

    return(
      <Container id="Application">
        <Info/>
        <Options options={this.state.trip.options} config={this.state.config} updateOptions={this.updateOptions}/>
        <Map config={this.state.trip.map} updateMap={this.updateMap}/>
      </Container>
    )
  }//config={this.state.config} updateMap={this.updateMap()} config={this.state.trip.map}
}

export default Application;