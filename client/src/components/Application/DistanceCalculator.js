import React, {Component} from 'react';
import {Button, Collapse, FormGroup, Input} from "reactstrap";

class DistanceCalculator extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return(
            <div>
                <h5>Origin:</h5>
                <FormGroup>
                    <Input type="text" placeholder="Name" onChange={(e) => this.updateValue("origin", "name", e.target.value)}/>
                    <Input type="number" placeholder="Latitude" onChange={(e) => this.updateValue("origin", "latitude", e.target.value)}/>
                    <Input type="number" placeholder="Longitude" onChange={(e) => this.updateValue("origin", "longitude", e.target.value)}/>
                </FormGroup>

                <h5>Destination:</h5>
                <FormGroup>
                    <Input type="text" placeholder="Name" onChange={(e) => this.updateValue("destination", "name", e.target.value)}/>
                    <Input type="number" placeholder="Latitude" onChange={(e) => this.updateValue("destination", "latitude", e.target.value)}/>
                    <Input type="number" placeholder="Longitude" onChange={(e) => this.updateValue("destination", "longitude", e.target.value)}/>
                    <Button style={{backgroundColor: "000000"}} type="button" onClick={this.calcDist}> Calculate </Button>
                    <br/><br/>
                    <h5> Distance: {this.props.distance.distance} </h5>
                </FormGroup>
            </div>
        );
    }
}

export default DistanceCalculator;