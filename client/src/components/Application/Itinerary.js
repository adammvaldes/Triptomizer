import React, { Component } from 'react';
import {Button, Card, CardBody, Container, Form, FormGroup, Input, Table} from 'reactstrap';


class Itinerary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textField1 : "",
            textField2 : ""
        };
        this.removeLeg = this.removeLeg.bind(this);
        this.reverseTrip = this.reverseTrip.bind(this);
        this.setStartLeg = this.setStartLeg.bind(this);
        this.handleChange1  = this.handleChange1.bind(this);
        this.handleChange2  = this.handleChange2.bind(this);
        this.renderButtons();
    }

    removeLeg(){
        this.props.removeLeg(this.state.textField1);
        this.props.planRequest();
    }

    reverseTrip(){
        this.props.reverseTrip();
        this.props.planRequest();
    }

    setStartLeg(){
        this.props.setStartLeg(this.state.textField2);
        this.props.planRequest();
    }

    handleChange1(event) {
        this.setState({textField1: event.target.value})
    }

    handleChange2(event) {
        this.setState({textField2: event.target.value})
    }


    calculateTotalDistance() { //calculates cumulative distance between towns
        let sum = 0;
        return this.props.trip.distances.map((distance)=> {
            sum += distance;
            return <td key={'distance ' + sum}>{sum}</td>
        });
    }

    renderButtons(){
        return(
        <div id="div2">
            <Card>
                <CardBody>
                    <Button className="btn text-white" type="button" color="info"  onClick={this.removeLeg}>Remove Leg</Button>
                    <Form>
                        <FormGroup>
                            <Input type="number" placeholder="Number of leg to remove (Starting position is 0)" onChange={this.handleChange1}/>
                        </FormGroup>
                    </Form>
                    <div id="div3">
                        <Button className="btn text-white" type="button" color="info"  onClick={this.reverseTrip}>Reverse Trip Order</Button>
                    </div>
                    <Button className="btn text-white" type="button" color="info"  onClick={this.setStartLeg}>Set Start Leg</Button>
                    <Form>
                        <FormGroup>
                            <Input type="number" placeholder="Enter leg number to set to start (Starting position is 0)" onChange={this.handleChange2} />
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        </div>
     );
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
                            {this.renderButtons()}
                </div>
                </div>
            );

        }

        return <Container></Container>;

    }
}

export default Itinerary;
