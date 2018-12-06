import './enzyme.config.js'                   // (1)
import {mount} from "enzyme/build";
import Trip from "../src/components/Application/Trip";
import React from "react";
import DistanceCalculator from "../src/components/Application/DistanceCalculator";
import {Button, Card, CardBody, Col, FormGroup, Input, Row} from "reactstrap";

const testProps = {
    config: null,
    port: "",
    URL: "",
    trip: {
        type: "trip",
        version: "3",
        title: "Stuffity",
        options: {
            units: "miles",
            unitName: "miles",
            unitRadius: "3959",
            optimization: "none"
        },
        places: [],
        distances: [],
        map: ''
    }
};


function testUpdateDistance() {
    let wrapper = mount(
        <DistanceCalculator
            trip={testProps.trip}
            port={testProps.port}
            URL={testProps.URL}
        />
    );
    wrapper.instance().updateDistance(117045);
    expect(wrapper.state().distance.distance).toEqual(117045);
}

test('Testing updateDistance', testUpdateDistance);

function testUpdateValue() {
    let wrapper = mount(
        <DistanceCalculator
            trip={testProps.trip}
            port={testProps.port}
            URL={testProps.URL}
        />
    );
    wrapper.instance().updateValue('origin', 'name', 'stuff');
    expect(wrapper.state().distance.origin.name).toEqual('stuff');

    wrapper.instance().updateValue('origin', 'latitude', 1234);
    expect(wrapper.state().distance.origin.latitude).toEqual(1234);

    wrapper.instance().updateValue('origin', 'longitude', 4321);
    expect(wrapper.state().distance.origin.longitude).toEqual(4321);


    wrapper.instance().updateValue('destination', 'name', 'newPlace');
    expect(wrapper.state().distance.destination.name).toEqual('newPlace');

    wrapper.instance().updateValue('destination', 'latitude', 9876);
    expect(wrapper.state().distance.destination.latitude).toEqual(9876);

    wrapper.instance().updateValue('destination', 'longitude', 6789);
    expect(wrapper.state().distance.destination.longitude).toEqual(6789);
}

test('Testing updateValue', testUpdateValue);

function testRender() {
    let wrapper = mount(
        <DistanceCalculator
            trip={testProps.trip}
            port={testProps.port}
            URL={testProps.URL}
        />
    );

    expect(
        wrapper.containsMatchingElement(
            <Card>
                <CardBody>
                    <h5>Origin:</h5>
                    <FormGroup>
                        <Row>
                            <Col md={"4"}>
                                <Input type="text" placeholder="Name"/>
                            </Col>
                            <Col md={"4"}>
                                <Input type="number" placeholder="Latitude"/>
                            </Col>
                            <Col md={"4"}>
                                <Input type="number" placeholder="Longitude"/>
                            </Col>
                        </Row>
                    </FormGroup>

                    <h5>Destination:</h5>
                    <FormGroup>
                        <Row>
                            <Col md={"4"}>
                                <Input type="text" placeholder="Name"/>
                            </Col>
                            <Col md={"4"}>
                                <Input type="number" placeholder="Latitude"/>
                            </Col>
                            <Col md={"4"}>
                                <Input type="number" placeholder="Longitude"/>
                            </Col>
                        </Row>
                        <br/>
                        <Button style={{backgroundColor: "000000"}} type="button" onClick={wrapper.instance().calcDist}> Calculate </Button>
                        <br/><br/>
                        <h5> Distance: {wrapper.state().distance.distance} {wrapper.state().distance.units} </h5>
                    </FormGroup>

                </CardBody>
            </Card>
        )
    ).toEqual(true);
}

test('Testing render method.', testRender);