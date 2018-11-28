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
            showDistances : true,
            showTotalDistance : true,
            displayedAttributes : [],
            modal : false
        };
        this.removeLeg = this.removeLeg.bind(this);
        this.reverseTrip = this.reverseTrip.bind(this);
        this.setStartLeg = this.setStartLeg.bind(this);
        this.showDistances = this.showDistances.bind(this);
        this.showTotalDistance = this.showTotalDistance.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.updateTable = this.updateTable.bind(this);
        this.attributeButtons = this.attributeButtons.bind(this);
        this.updateAttributes = this.updateAttributes.bind(this);
        this.theTable = this.theTable.bind(this);
        this.getAttribute = this.getAttribute.bind(this);
        this.checkChildren = this.checkChildren.bind(this);

    }

    removeLeg(value){
        this.props.removeLeg(value);
    }

    reverseTrip(){
        this.props.reverseTrip();
    }

    setStartLeg(value){
        this.props.setStartLeg(value);
    }

    calculateTotalDistance() { //calculates cumulative distance between towns
        let counter = 0;
        let sum = 0;
        let tripDistances = this.props.trip.distances.map((distance)=> {
            sum += distance;
            counter = counter + 1;
            return <td key={'distance ' + sum + counter}>{sum}</td>
        });
        if(this.state.showTotalDistance && this.props.trip.distances.length !== 0){
            return (
                <tr>
                    <th scope="row">Total Distance, {this.props.trip.options.units}</th>
                    <td>0</td>
                    {tripDistances}
                </tr>
            );
        }
        else{
            return (
                <tr>
                    <th scope="row">Total Distance, {this.props.trip.options.units}</th>
                </tr>
            );
        }
    }

    showDistances(){
        this.setState({showDistances : !this.state.showDistances});
    }

    showTotalDistance(){
        this.setState({showTotalDistance : !this.state.showTotalDistance});
    }

    renderLegDistances() {
        let counter = 0;
        if(this.state.showDistances && this.props.trip.distances.length !== 0){
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
        else{
            return (
                <tr>
                    <th scope="row">Leg Distances</th>
                </tr>
            );
        }
    }

    renderItineraryButtons(){
        let counter = 0;
        let buttons = this.props.trip.places.map((place) => {
            counter += 1;
            return <td align="center" key={counter}>
                    <Button onClick={() => this.removeLeg(this.props.trip.places.indexOf(place))}>X</Button>
                <p> </p>
                <Button onClick={() => this.setStartLeg(this.props.trip.places.indexOf(place))}>S</Button>
            </td>;
        });
        return(
            <tr>
                <th scope="row"> </th>
                {buttons}
            </tr>
        );
    }

    getAttribute(name){
        let answer = [0,0];
        for(let i = 0; i < this.state.displayedAttributes.length; i++){
            if(this.state.displayedAttributes[i][0] === name){
                answer = this.state.displayedAttributes[i];
            }
        }
        return answer;
    }

    checkChildren(temp){
        let check = false;
        for(let i = 0; i < temp.length; i++){
            if(temp[i].props.children !== undefined){
                check = true;
            }
        }
        if(temp.length === 0){return true;}
        return check;
    }

    toggleModal(){
        this.setState({modal : !this.state.modal});
    }

    theTable(value, count){
        let counter = 0;
        let temp = this.props.trip.places.map((place) => {
            counter++;
            return <td key={'place ' + counter}>{place[value]}</td>;
        });
        let attribute = this.getAttribute(value);
        let check = this.checkChildren(temp);
        if(attribute[1] === "true" && check){
            if(count === 0){
                return (
                    <tr key={count}>
                        <th scope="row">{value}<p><Button onClick={this.toggleModal}>+</Button></p>
                            <AddByName addLeg={this.props.addLeg} modal={this.state.modal} toggleModal={this.toggleModal}/>
                        </th>
                        {temp}
                    </tr>
                );
            }
            return (
                <tr key={count}>
                    <th scope="row">{value}</th>
                    {temp}
                </tr>
            );
        }
        return <tr key={count}>

        </tr>;
    }

    renderTripRows(){
        if(this.state.displayedAttributes.length !== this.props.config.attributes.length){
            this.updateAttributes();
        }
        let places = [];
        for(let i = 0; i < this.state.displayedAttributes.length; i++){
            places.push(this.theTable(this.state.displayedAttributes[i][0], i));
        }
        return (
            <div id="parent">
                <div id="div1">
                    <Card>
                        <CardBody>
                            <Table responsive><tbody>
                            {places}
                            {this.renderLegDistances()}
                            {this.calculateTotalDistance()}
                            {this.renderItineraryButtons()}
                            </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </div>
                <Form>
                    <Row>
                        <Col xs="3"> <Button onClick={this.toggle} type="button" style={{backgroundColor: "000000"}}> Attributes </Button> </Col>
                        <Col xs="3"> <Button onClick={this.reverseTrip} type="button" style={{backgroundColor: "000000"}}>  Reverse  </Button> </Col>
                        <Col xs="3"> <Button onClick={this.props.saveTrip} type="button" style={{backgroundColor: "000000"}}> Save Trip </Button> </Col>
                        <Col xs="3"> <Button onClick={this.props.saveMap} type="button" style={{backgroundColor: "000000"}}> Save Map </Button> </Col>
                    </Row>
                    <Collapse isOpen={this.state.collapse}>
                        {this.attributeButtons()}
                    </Collapse>
                    <SearchBar addDestination={this.props.addDestination} config={this.props.config}/>
                </Form>
            </div>
        );
    }

    updateTable(name, bool){
        let attributes = this.state.displayedAttributes;
        for(let i = 0; i < this.state.displayedAttributes.length; i++){
            if(this.state.displayedAttributes[i][0] === name.name){
                if(bool.bool === "true"){
                    attributes[i] = [this.state.displayedAttributes[i][0], "false"];
                }
                else{
                    attributes[i] = [this.state.displayedAttributes[i][0], "true"];
                }
            }
        }
        this.setState({ displayedAttributes : attributes });
    }

    updateAttributes(){
        let attributes = [];
        for(let i = 0; i < this.props.config.attributes.length; i++){
            if(this.props.config.attributes[i] === "name" || this.props.config.attributes[i] === "latitude" ||
                this.props.config.attributes[i] === "longitude"){attributes.push([this.props.config.attributes[i], "true"]);}
            else{attributes.push([this.props.config.attributes[i], "false"]);}
        }
        this.setState({ displayedAttributes : attributes });
    }

    attributeButtons(){
        let attributes = [];
        for(let i = 0; i < this.state.displayedAttributes.length; i++){
            let name = this.state.displayedAttributes[i][0];
            let bool = this.state.displayedAttributes[i][1];
            let def;
            if(bool === "true"){def=true;}
            else{def=false;}
            let value = name.charAt(0).toUpperCase() + name.slice(1);
            let checkBox = (
                <FormGroup key={name + i} check inline>
                    <Label><Input key={name} type="checkbox" defaultChecked={def}
                                  onChange={(e) => this.updateTable({name}, {bool})} />{value}</Label>
                </FormGroup>
            );
            attributes.push(checkBox);
        }
        attributes.push(
            <FormGroup key="Leg Distances" check inline>
                <Label><Input key="Leg Distances" type="checkbox" defaultChecked={true}
                              onChange={this.showDistances} />Leg Distances</Label>
            </FormGroup>);
        attributes.push(
            <FormGroup key="Total Distances" check inline>
                <Label><Input key="Total Distances" type="checkbox" defaultChecked={true}
                              onChange={this.showTotalDistance} />Total Distances</Label>
            </FormGroup>);
        return (<FormGroup>{attributes}</FormGroup>);
    }

    toggle(){
        this.setState({collapse: !this.state.collapse});
    }

    render() {
        return this.renderTripRows();
    }
}

export default Itinerary;

//https://reactstrap.github.io/components/collapse/
//http://extension.colostate.edu/docs/staffres/csu-colorpalette.pdf
//https://react-bootstrap.github.io/components/buttons/
