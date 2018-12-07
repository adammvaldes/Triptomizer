import React, {Component} from 'react';
import {Button, Card, CardBody, Col, Collapse, FormGroup, Input, Row} from "reactstrap";
import {request} from "../../api/api";

class DistanceCalculator extends Component{
    constructor(props){
        super(props);
        this.state = {
            distance : {
                type : "distance",
                version : 4,
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
                units : "miles",
                unitRadius : this.props.trip.options.unitRadius,
                distance : 0
            }
        };

        this.calcDist = this.calcDist.bind(this);
        this.updateDistance = this.updateDistance.bind(this);
        this.updateValue = this.updateValue.bind(this);
        this.renderDistance = this.renderDistance.bind(this);
    }

    calcDist(){
        let tempDistance = this.state.distance;
        tempDistance.units = this.props.trip.options.units;
        tempDistance.unitRadius = this.props.trip.options.unitRadius;
        this.setState({distance : tempDistance});
        if(this.props.trip.options.units === "user defined"){
           this.setState({units : this.props.trip.options.unitName});
        }
        if(this.props.URL === "" || this.props.port==="314") {
            request(this.state.distance, "distance").then(serverResponse => {
                this.updateDistance(serverResponse["distance"]);
            });
        }
        else{
            request(this.state.distance, "distance", this.props.port,this.props.URL).then(serverResponse => {
                this.updateDistance(serverResponse["distance"]);
            });
        }
    }

    updateDistance(dist){
        let distance = this.state.distance;
        distance.distance = dist;
        this.setState({distance});
    }

    updateValue(id, field, value){
        let distance = this.state.distance;
        distance[id][field] = value;
        this.setState({distance});
    }

    renderDistance(){
        if(this.props.trip.options.units === "user defined"){
            return(
                <h5> Distance: {this.state.distance.distance} {this.props.trip.options.unitName} </h5>
                );
        }
        return(
            <h5> Distance: {this.state.distance.distance} {this.state.distance.units} </h5>
        );
    }

    render() {
        return(
            <Card>
                <CardBody>
                    <h5>Origin:</h5>
                    <FormGroup>
                        <Row>
                            <Col md={"4"}>
                                <Input type="text" placeholder="Name" onChange={(e) => this.updateValue("origin", "name", e.target.value)}/>
                            </Col>
                            <Col md={"4"}>
                                <Input type="number" placeholder="Latitude" onChange={(e) => this.updateValue("origin", "latitude", e.target.value)}/>
                            </Col>
                            <Col md={"4"}>
                                <Input type="number" placeholder="Longitude" onChange={(e) => this.updateValue("origin", "longitude", e.target.value)}/>
                            </Col>
                        </Row>
                    </FormGroup>

                    <h5>Destination:</h5>
                    <FormGroup>
                        <Row>
                            <Col md={"4"}>
                                <Input type="text" placeholder="Name" onChange={(e) => this.updateValue("destination", "name", e.target.value)}/>
                            </Col>
                            <Col md={"4"}>
                                <Input type="number" placeholder="Latitude" onChange={(e) => this.updateValue("destination", "latitude", e.target.value)}/>
                            </Col>
                            <Col md={"4"}>
                                <Input type="number" placeholder="Longitude" onChange={(e) => this.updateValue("destination", "longitude", e.target.value)}/>
                            </Col>
                        </Row>
                        <br/>
                        <Button style={{backgroundColor: "000000"}} type="button" onClick={this.calcDist}> Calculate </Button>
                        <br/><br/>
                        {this.renderDistance()}
                    </FormGroup>
                </CardBody>
            </Card>
        );
    }
}

export default DistanceCalculator;