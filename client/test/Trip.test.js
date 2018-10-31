import './enzyme.config.js'                   // (1)
import React from 'react'
import { mount , shallow} from 'enzyme'              // (2)
import Trip from '../src/components/Application/Trip'
import {Button} from "reactstrap";


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

function updateTFFI(tffi) {
    testProps.trip = tffi;
}

function testUpdateDistance() {
    let wrapper = mount(
        <Trip
            trip={testProps.trip}
            port={testProps.port}
            URL={testProps.URL}
            updateTFFI={updateTFFI}
        />
    );
    wrapper.instance().updateDistance(117045);
    expect(wrapper.state().distance.distance).toEqual(117045);
}

test('Testing updateDistance', testUpdateDistance);

function testUpdateValue() {
    let wrapper = mount(
        <Trip
            trip={testProps.trip}
            port={testProps.port}
            URL={testProps.URL}
            updateTFFI={updateTFFI}
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

function testToggle(){
    let wrapper = mount(
        <Trip
            trip={testProps.trip}
            port={testProps.port}
            URL={testProps.URL}
            updateTFFI={updateTFFI}
        />
    );
    wrapper.instance().toggle();

    expect(wrapper.state().collapse).toEqual(true);

    wrapper.instance().toggle();

    expect(wrapper.state().collapse).toEqual(false);
}

test('Testing toggle', testToggle);

function testRender() {
    const tripWrapper = mount((
        <Trip
            trip={testProps.trip}
            port={testProps.port}
            URL={testProps.URL}
            updateTFFI={updateTFFI}
        />
    ));

    expect(tripWrapper.state().collapse).toEqual(false);
    //trip.props().plan();
    //let actualDistances = trip.props.distances;
    // testTrip.find('#render-btn').map((button)=>{
    //     button.simulate('click');
    // });

    let actualButtonTexts = tripWrapper.find('Button').map((button)=>{
       return button.text();
    });
    // let actualFormText = tripWrapper.find('FormText').text();
    // expect(actualFormText).toEqual('The file needs to be a JSON file, with the ".json" tag at the end of the name.');
    expect(tripWrapper.prop('URL')).toEqual("");
    let expectedButtonTexts = [' RENDER ', ' Save Trip ', ' CLEAR ', ' Calculate Distance ', ' Calculate '];
    expect(actualButtonTexts).toEqual(expectedButtonTexts)
    // expect(buttonNames).toEqual(["test", "test2"]);
}

test('Testing plan function in Trip.js', testRender);