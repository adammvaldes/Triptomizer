import React, {Component} from 'react'
import {Button, ButtonGroup, Form, Label, Input, FormText, FormGroup, Card, CardBody, Collapse} from 'reactstrap'
import SearchBar from "./SearchBar";
import AddByName from "./AddByName";
import {request} from "../../api/api";

class Trip extends Component {
    constructor(props) {
        super(props);
        this.plan = this.plan.bind(this);
        this.saveFile = this.saveFile.bind(this);
        this.toggle = this.toggle.bind(this);

        this.calcDist = this.calcDist.bind(this);
        this.updateDistance = this.updateDistance.bind(this);
        this.updateValue = this.updateValue.bind(this);
        this.state={
            user : "Dave Matthews, ruler of the universe",
            collapse : false,
            distance : {
                type : "distance",
                version : 2,
                origin : {
                    name : "",
                    latitude : 0,
                    longitude : 0
                },
                destination : {
                    name : "",
                    latitude : 0,
                    longitude : 0
                },
                units : this.props.trip.options.units,
                distance : 0
            }
        };
    }
    plan(){
        this.props.planRequest();
    }
    saveFile(){
        let userVersion = this.props.trip.version;
        let userType = this.props.trip.type;
        let userTitle = this.props.trip.title;
        let userPlaces = this.props.trip.places;
        let userDistances = this.props.trip.distances;
        let userOptions = this.props.trip.options;

        let userObject = {version: userVersion, type: userType, title: userTitle, options: userOptions, places:userPlaces, distances:userDistances};
        let json = JSON.stringify(userObject);

        userTitle += '.json';

        if (window.navigator.msSaveBlob) {
            let blob = new Blob([json], {type: 'json'});
            window.navigator.msSaveBlob(blob, userTitle);
        }
        else{
            let link = document.createElement('a');
            let content = json;
            let uriScheme = ['data:','json',','].join('');
            link.href = uriScheme + content;
            link.download = userTitle;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

    }

    toggle(){
        this.setState({ collapse: !this.state.collapse});
    }

    updateValue(id, field, value){
        let distance = this.state.distance;
        distance[id][field] = value;
        this.setState({distance});
    }

    updateDistance(dist){
        let distance = this.state.distance;
        distance.distance = dist;
        this.setState({distance});
    }

    calcDist(){
        if(this.state.URL === "" || this.state.port==="314") {
            request(this.state.distance, "distance").then(serverResponse => {
                this.updateDistance(serverResponse["distance"]);
            });
        }
        else{
            request(this.state.distance, "distance",this.state.port,this.state.URL).then(serverResponse => {
                this.updateDistance(serverResponse["distance"]);
            });
        }
    }


    render() {
        return (
            <Card>
                <CardBody>
                    <Button style={{backgroundColor: "407157"}} onClick={this.plan} type="button" block> RENDER </Button>
                    <Button style={{backgroundColor: "cea12b"}} onClick={this.saveFile} type="button" block> Save Trip </Button>
                    <Button style={{backgroundColor: "cea12b"}} onClick={this.props.clearTrip} type="button" block> CLEAR </Button>
                    <Button style={{backgroundColor: "cea12b"}} onClick={this.toggle} type="button" block> Calculate Distance </Button>
                    <Collapse isOpen={this.state.collapse}>
                        <p> Choose the desired units in the options above  </p>
                        <FormGroup>
                            <Input type="text" placeholder="Origin Name" onChange={(e) => this.updateValue("origin", "name", e.target.value)}/>
                            <Input type="number" placeholder="Origin Latitude" onChange={(e) => this.updateValue("origin", "latitude", e.target.value)}/>
                            <Input type="number" placeholder="Origin Longitude" onChange={(e) => this.updateValue("origin", "longitude", e.target.value)}/>
                        </FormGroup>
                        <FormGroup>
                            <Input type="text" placeholder="Destination Name"onChange={(e) => this.updateValue("destination", "name", e.target.value)}/>
                            <Input type="number" placeholder="Destination Latitude" onChange={(e) => this.updateValue("destination", "latitude", e.target.value)}/>
                            <Input type="number" placeholder="Destination Longitude" onChange={(e) => this.updateValue("destination", "longitude", e.target.value)}/>
                            <Button style={{backgroundColor: "000000"}} type="button" onClick={this.calcDist}> Calculate </Button>
                            <p> Distance: {this.state.distance.distance} </p>
                        </FormGroup>
                    </Collapse>
                </CardBody>
            </Card>
        );
    }
}

export default Trip;

//https://chuvash.eu/2016/05/15/create-and-download-a-file-in-javascript/
//href='#'
//https://stackoverflow.com/questions/2236747/use-of-the-javascript-bind-method