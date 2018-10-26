import './enzyme.config.js'                   // (1)
import React from 'react'
import { mount , shallow} from 'enzyme'              // (2)
import Trip from '../src/components/Application/Trip'
import {Button} from "reactstrap";
import Application from "../src/components/Application/Application";


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
function testPlan() {
    const tripWrapper = mount((
        <Trip
            trip={testProps.trip}
            port={testProps.port}
            URL={testProps.URL}
            updateTFFI={updateTFFI}
        />
    ));
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
    let expectedButtonTexts = [' RENDER ', ' Save Trip ', ' CLEAR '];
    expect(actualButtonTexts).toEqual(expectedButtonTexts)
    // expect(buttonNames).toEqual(["test", "test2"]);
}

test('Testing plan function in Trip.js', testPlan);