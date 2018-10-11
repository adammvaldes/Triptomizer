import React, { Component } from 'react';
import {Button, Card, CardBody, Container, Form, FormGroup, Input, Table} from 'reactstrap';


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
        this.props.planRequest();
    }

    reverseTrip(){
        this.props.reverseTrip();
        this.props.planRequest();
    }

    handleChange(event) {
        this.setState({textField: event.target.value})
    }


    calculateTotalDistance() { //calculates cumulative distance between towns
        let sum = 0;
        return this.props.trip.distances.map((distance)=> {
            sum += distance;
            return <td key={'distance ' + sum}>{sum}</td>
        });

    }

    render() {
        const trip = this.props.trip;

        let tripPlaces = [];
        let tripGeoLocations = [];
        let tripDistances = [];

        if (trip.distances !== undefined && trip.distances.length !== 0 && trip.places !== undefined) {
            tripDistances = this.calculateTotalDistance();
            //return array of all places to print in table...
            tripPlaces = trip.places.map((place) => {
                return <td key={'place ' + place.name}>{place.name}</td>;
            });

            //return array of all geo locations in table...
            tripGeoLocations = trip.places.map((place) => {
                return <td key={'geo ' + place.latitude}>{place.latitude}, {place.longitude}</td>
            });

            return (
                <div id="parent">
                    <div id="div1">
                <Table responsive>
                    <tbody>
                    <tr>
                        <th scope="row">Place</th>
                        {tripPlaces}
                        {tripPlaces[0]}
                    </tr>
                    <tr>
                        <th scope="row">Geographical Location</th>
                        {tripGeoLocations}
                        {tripGeoLocations[0]}
                    </tr>
                    <tr>
                        <th scope="row">Leg Distances</th>
                        <td>0</td>
                        {trip.distances.map((el) => {
                            return <td key={'leg ' + el}>{el}</td>;
                        })}
                    </tr>
                    <tr>
                        <th scope="row">Total Distance, {trip.options.unitName }</th>
                        <td>0</td>
                        {tripDistances}
                    </tr>
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

        return <Container></Container>;

    }
}

export default Itinerary;
