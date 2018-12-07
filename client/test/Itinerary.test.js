import './enzyme.config.js'                   // (1)
import React from 'react'
import { mount , shallow} from 'enzyme'              // (2)
import Application from "../src/components/Application/Application";
import Itinerary from '../src/components/Application/Itinerary'
import {Button} from "reactstrap";

let testTrip = {
    type: "trip",
    version: "3",
    title: "Itinerary Test Trip",
    options : {
        units: "miles",
        optimization: "none"
    },
    places: [{id: 'csrk',
        name: 'Castle Rock',
        latitude: 40,
        longitude: -106
    }, {id: 'blrd',
        name: 'Boulder',
        latitude: 45,
        longitude: -101}, {id: 'dn',
        name: 'Denver',
        latitude: 42,
        longitude: -103}],
    distances: [20, 15, 24, 31],
    map: 'test'
};

let actualPlace1 = {
    id: 'csrk',
    name: 'Castle Rock',
    latitude: 40,
    longitude: -106
};
let actualPlace2 = {
    id: 'blrd',
    name: 'Boulder',
    latitude: 45,
    longitude: -101
};
let actualPlace3 = {
    id: 'dn',
    name: 'Denver',
    latitude: 42,
    longitude: -103
};

let testState = {
    config: null,
    port: "",
    URL: "",
    trip: {
        type: "trip",
        version: "3",
        title: "Itinerary Test Trip",
        options : {
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

function testRender() {

    let wrapper = mount((
        <Application/>
    ));
    wrapper.setState({'trip' : testTrip});

    let actualButtonTexts = wrapper.find('Card').map((input)=>{
        return input.text();
    });

    console.log(actualButtonTexts);
    let expectedButtonTexts = [];
    expect(actualButtonTexts).toEqual(expectedButtonTexts)
}

test('Testing render function in Itinerary.js', testRender);