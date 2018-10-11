import React, { Component } from 'react';
import {Button, Card, CardBody, Container, Form, FormGroup, Input, Media, Table} from 'reactstrap';
import { request } from '../../api/api';


class Itinerary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textField : ""
        };
        this.removeLeg = this.removeLeg.bind(this);
        this.reverseTrip = this.reverseTrip.bind(this);
        this.handleChange  = this.handleChange.bind(this);
    }

    removeLeg(){
        this.props.removeLeg(this.state.textField);
        request(this.props.trip, "plan").then(serverResponse => {
            this.props.updateMap(serverResponse["map"]);
            this.props.updateDistances(serverResponse["distances"]);
        });
    }

    reverseTrip(){
        this.props.reverseTrip();
        request(this.props.trip, "plan").then(serverResponse => {
            this.props.updateMap(serverResponse["map"]);
            this.props.updateDistances(serverResponse["distances"]);
        });
    }

    handleChange(event) {
        this.setState({textField: event.target.value})
    }


    calculateTotalDistance() { //calculates cumulative distance between towns
        let sum = 0;
        let tripDistances = this.props.trip.distances.map((distance)=> {
            sum += distance;
            return <td key={'distance ' + sum}>{sum}</td>
        });

        return (
            <tr>
                <th scope="row">Total Distance, {this.props.trip.options.unitName }</th>
                <td>0</td>
                {tripDistances}
            </tr>
        );

    }

    renderTripPlaces() {
        let tripPlaces = this.props.trip.places.map((place) => {
            return <td key={'place ' + place.name}>{place.name}</td>;
        });

        return (
            <tr>
                <th scope="row">Place</th>
                {tripPlaces}
                {tripPlaces[0]}
            </tr>
        );
    }

    renderTripGeoLocations() {
        let tripGeoLocations = this.props.trip.places.map((place) => {

             return <td key={'geo ' + place.latitude}>{place.latitude}, {place.longitude}</td>;
        });

        return (
            <tr>
                <th scope="row">Geographical Location</th>
                {tripGeoLocations}
                {tripGeoLocations[0]}
            </tr>

        );

    }

    renderLegDistances() {
        return (
            <tr>
                <th scope="row">Leg Distances</th>
                <td>0</td>
                {this.props.trip.distances.map((el) => {
                    return <td key={'leg ' + el}>{el}</td>;
                })}
            </tr>
        );
    }

    renderTripRows(){
        return (
            <div id="parent">
                <div id="div1">
            <Table responsive>
                <tbody>
                {this.renderTripPlaces()}
                {this.renderTripGeoLocations()}
                {this.renderLegDistances()}
                {this.calculateTotalDistance()}
                </tbody>
            </Table>
            </div>
            <div id="div2">
            <Card>
                <CardBody>
                        <Button className="btn text-white" type="button" color="info"  onClick={this.removeLeg}>Remove Leg</Button>
                    <Form>
                        <FormGroup>
                            <Input type="number" placeholder="Number of leg to remove" onChange={this.handleChange}/>
                        </FormGroup>
                    </Form>
                        <Button className="btn text-white" type="button" color="info"  onClick={this.reverseTrip}>Reverse Trip Order</Button>
                </CardBody>
            </Card>
            </div>
            </div>
        );
    }

    render() {
        if (this.props.trip.distances !== undefined && this.props.trip.distances.length !== 0 && this.props.trip.places !== undefined) {
            return this.renderTripRows();
        }
        return <Container></Container>;

    }
}

export default Itinerary;
