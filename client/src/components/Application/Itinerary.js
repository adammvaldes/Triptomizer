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
        this.renderButtons = this.renderButtons.bind(this);
        // this.addLeg = this.addLeg(this);
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
        let counter = 0;
        let sum = 0;
        let tripDistances = this.props.trip.distances.map((distance)=> {
            sum += distance;
            counter = counter + 1;
            return <td key={'distance ' + sum + counter}>{sum}</td>
        });
        return (
            <tr>
                <th scope="row">Total Distance, {this.props.trip.options.unitName }</th>
                <td>0</td>
                {tripDistances}
            </tr>
        );
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


    renderTripPlaces() {
        let counter = 0;
        let tripPlaces = this.props.trip.places.map((place) => {
            counter += 1;
            return <td key={'place ' + counter}>{place.name}</td>;
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
        let counter = 0;
        let tripGeoLocations = this.props.trip.places.map((place) => {
            counter += 1;
             return <td key={'geo ' + counter}>{place.latitude}, {place.longitude}</td>;
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
        let counter = 0;
        return (
            <tr>
                <th scope="row">Leg Distances</th>
                <td>0</td>
                {this.props.trip.distances.map((el) => {
                    counter += 1;
                    return <td key={'leg ' + counter}>{el}</td>;
                })}
            </tr>
        );
    }

    renderTripRows(){
        let idCounter = 0;
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
                {this.renderButtons()}
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
