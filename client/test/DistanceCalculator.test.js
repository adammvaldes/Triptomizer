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
        version: "4",
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

function testCalcDist() {
    let wrapper = mount(
        <DistanceCalculator
            trip={testProps.trip}
            port={testProps.port}
            URL={testProps.URL}
        />
    );

    wrapper.props().trip.options.units = "user defined";
    wrapper.props().trip.options.unitName = "bananas";
    wrapper.props().trip.options.unitRadius = 1234;
    let expectedDistance = {
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
    units : "user defined",
    unitRadius : 1234,
    distance : 0
    };

    wrapper.instance().calcDist();
    expect(wrapper.state().distance).toEqual(expectedDistance);

    wrapper.props().trip.options.units = "nautical miles";
    wrapper.props().trip.options.unitRadius = 1234;
    expectedDistance.units = "nautical miles";
    wrapper.instance().calcDist();
    expect(wrapper.state().distance).toEqual(expectedDistance);
}
test("Branch testing calcDist", testCalcDist);

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

function testRenderDistance() {
    let wrapper = mount(
        <DistanceCalculator
            trip={testProps.trip}
            port={testProps.port}
            URL={testProps.URL}
        />
    );

    wrapper.props().trip.options.units = "user defined";
    let response = wrapper.instance().renderDistance();
    expect(response).toEqual(
        <h5> Distance: {wrapper.state().distance.distance} {wrapper.props().trip.options.unitName} </h5>
    );

    wrapper.props().trip.options.units = "miles";
    response = wrapper.instance().renderDistance();
    expect(response).toEqual(
        <h5> Distance: {wrapper.state().distance.distance} {wrapper.state().distance.units} </h5>
    );
}
test("Branch testing renderDistance", testRenderDistance);

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