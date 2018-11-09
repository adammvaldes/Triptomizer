import React, { Component } from 'react';
import {Button, Card, CardBody, Container, Form, FormGroup, Input, Table, Collapse, InputGroupAddon, InputGroup, Row, Col, Label} from 'reactstrap';
import SearchBar from "./SearchBar";
import AddByName from "./AddByName";


class Itinerary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textField1 : "",
            textField2 : "",
            collapse : false,
            showPlace : true,
            showGeoLocation : true,
            showDistances : true,
            showTotalDistance : true
        };
        this.removeLeg = this.removeLeg.bind(this);
        this.reverseTrip = this.reverseTrip.bind(this);
        this.setStartLeg = this.setStartLeg.bind(this);
        this.handleChange1  = this.handleChange1.bind(this);
        this.handleChange2  = this.handleChange2.bind(this);
        this.renderButtons = this.renderButtons.bind(this);
        this.showPlace = this.showPlace.bind(this);
        this.showGeoLocation = this.showGeoLocation.bind(this);
        this.showDistances = this.showDistances.bind(this);
        this.showTotalDistance = this.showTotalDistance.bind(this);
        this.toggle = this.toggle.bind(this);
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
        if(this.state.showTotalDistance){
            return (
                <tr>
                    <th scope="row">Total Distance, {this.props.trip.options.units}</th>
                    <td>0</td>
                    {tripDistances}
                </tr>
            );
        }
    }

    showPlace(){
        this.state.showPlace = !this.state.showPlace;
        this.props.planRequest();
    }

    showGeoLocation(){
        this.state.showGeoLocation = !this.state.showGeoLocation;
        this.props.planRequest();
    }

    showDistances(){
        this.state.showDistances = !this.state.showDistances;
        this.props.planRequest();
    }

    showTotalDistance(){
        this.state.showTotalDistance = !this.state.showTotalDistance;
        this.props.planRequest();
    }


    renderButtons(){
        return(
        <div id="div2">
            <div id="div3">
                <Button className="btn text-white" type="button" style={{backgroundColor: "407157"}} onClick={this.reverseTrip}>Reverse Trip Order</Button>
            </div>
            <InputGroup>
                <InputGroupAddon addonType="prepend"><Button className="btn text-white" type="button" style={{backgroundColor: "407157"}} onClick={this.removeLeg}>Remove Leg</Button></InputGroupAddon>
                <Input type="number" placeholder="Number of leg to remove (Starting position is 0)" onChange={this.handleChange1}/>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend"><Button className="btn text-white" type="button" style={{backgroundColor: "407157"}} onClick={this.setStartLeg}>Set Start Leg</Button></InputGroupAddon>
                <Input type="number" placeholder="Enter leg number to set to start (Starting position is 0)" onChange={this.handleChange2} />
            </InputGroup>
        </div>
     );
    }


    renderTripPlaces() {
        let counter = 0;
        let tripPlaces = this.props.trip.places.map((place) => {
            counter += 1;
            return <td key={'place ' + counter}>{place.name}</td>;
        });
        if(this.state.showPlace){
            return (
                <tr>
                    <th scope="row">Place</th>
                    {tripPlaces}
                    {tripPlaces[0]}
                </tr>
            );
        }
    }

    renderTripGeoLocations() {
        let counter = 0;
        let tripGeoLocations = this.props.trip.places.map((place) => {
            counter += 1;
             return <td key={'geo ' + counter}>{place.latitude}, {place.longitude}</td>;
        });
        if(this.state.showGeoLocation){
            return (
                <tr>
                    <th scope="row">Geographical Location</th>
                    {tripGeoLocations}
                    {tripGeoLocations[0]}
                </tr>

            );
        }
    }

    renderLegDistances() {
        let counter = 0;
        if(this.state.showDistances){
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
    }

    renderTripRows(){
        let idCounter = 0;
        return (
            <div id="parent">
                <div id="div1">
                    <Card>
                        <CardBody>
                            <Row>
                                <Col lg="3">
                                    {this.renderCheckboxes()}
                                </Col>
                                <Col lg="9">
                            <Table responsive><tbody>
                            {this.renderTripPlaces()}
                            {this.renderTripGeoLocations()}
                            {this.renderLegDistances()}
                            {this.calculateTotalDistance()}
                            </tbody>
                            </Table>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>

                </div>
                <Button onClick={this.toggle} type="button" style={{backgroundColor: "000000"}}> Edit Trip </Button>
                <Collapse isOpen={this.state.collapse}>
                    <Card>
                        <CardBody>
                            {this.renderButtons()}
                            <SearchBar addDestination={this.props.addDestination} config={this.props.config}/>
                            <AddByName addLeg={this.props.addLeg}/>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        );
    }

    renderCheckboxes(){
        return(
            <Card>
                <CardBody>
                    <FormGroup>
                     <FormGroup>
                        <Label><Input name="Hide Places" type="checkbox" onChange={this.showPlace}/>Hide Places</Label>
                    </FormGroup>
                    <FormGroup>
                        <Label><Input name="Hide Geographical Location" type="checkbox" onChange={this.showGeoLocation}/>Hide Geographical Location</Label>
                    </FormGroup>
                    <FormGroup>
                        <Label><Input name="Hide Leg Distances" type="checkbox" onChange={this.showDistances}/>Hide Leg Distances</Label>
                    </FormGroup>
                    <FormGroup>
                        <Label><Input name="Hide Total Distance" type="checkbox" onChange={this.showTotalDistance}/>Hide Total Distance</Label>
                    </FormGroup>
                    </FormGroup>
                </CardBody>
            </Card>
        );
    }

    toggle(){
        this.setState({collapse: !this.state.collapse});
    }

    render() {
        if (this.props.trip.distances !== undefined && this.props.trip.distances.length !== 0 && this.props.trip.places !== undefined) {
            return this.renderTripRows();
        }
        return <Container></Container>;
    }
}

export default Itinerary;

//https://reactstrap.github.io/components/collapse/
//http://extension.colostate.edu/docs/staffres/csu-colorpalette.pdf
//https://react-bootstrap.github.io/components/buttons/