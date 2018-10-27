import './enzyme.config.js'                   // (1)
import React from 'react'
import { mount , shallow} from 'enzyme'              // (2)
import {Button, Container} from "reactstrap";
import Application from "../src/components/Application/Application";
import Info from "../src/components/Application/Info";
import Interop from "../src/components/Application/Interop";
import ChooseFile from "../src/components/Application/ChooseFile";
import Options from "../src/components/Application/Options";
import OptimizationButtons from "../src/components/Application/OptimizationButtons";
import Trip from "../src/components/Application/Trip";
import Itinerary from "../src/components/Application/Itinerary";
import Map from "../src/components/Application/Map";


function testUpdateTrip() {
    let wrapper = mount((<Application/>));
    wrapper.instance().updateTrip("type", "successful test");

    expect(wrapper.state().trip.type).toEqual("successful test");
}
test("Testing updateTrip()", testUpdateTrip);

let testTrip = {
    type: "trip",
    version: "3",
    title: "Blank",
    options : {
        units: "miles",
        optimization: "short"
    },
    places: [],
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
        title: "Blank",
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


// function testupdateBasedOnResponse() {
//     let wrapper = mount((<Application/>));
//     wrapper.instance().updateBasedOnResponse(testTrip);
//
//     expect(wrapper.state('trip')).toEqual(testTrip);
// }
// test("Testing updateBasedOnResponse", testupdateBasedOnResponse);

function testUpdateOptions() {
    let wrapper = mount(<Application/>);
    wrapper.instance().updateOptions('optimization', 'test optimization');

    expect(wrapper.state().trip.options.optimization).toEqual('test optimization');
}

test("Testing updateOptions", testUpdateOptions);

function testUpdateMap() {
    let wrapper = mount(<Application/>);
    wrapper.instance().updateMap('This is just a test marker for an svg map setting state.');

    expect(wrapper.state().trip.map).toEqual('This is just a test marker for an svg map setting state.');
}

test("Testing updateMap", testUpdateMap);

function testUpdateDistances() {
    let wrapper = mount(<Application/>);
    wrapper.instance().updateDistances([40, 30, 20, 10]);

    let actualDistances = [40,30,20,10];
    expect(wrapper.state().trip.distances).toEqual(actualDistances);
}

test("Testing updateDistances", testUpdateDistances);

function testUpdateTFFI() {
    let wrapper = mount((<Application/>));
    wrapper.instance().updateTFFI(testTrip);

    expect(wrapper.state('trip')).toEqual(testTrip);
}

test('Testing updateTFFI', testUpdateTFFI);

function testUpdateNumber() {
    let wrapper = mount((<Application/>));
    wrapper.instance().updateNumber('8088');

    expect(wrapper.state('port')).toEqual('8088');
}

test('Testing updateNumber', testUpdateNumber);

function testChangeServer() {
    let wrapper = mount((<Application/>));
    let actualServerURL = 'black-bottle.cs.colostate.edu:31400';
    wrapper.instance().changeServer('black-bottle.cs.colostate.edu:31400');

    expect(wrapper.state('URL')).toEqual(actualServerURL);
}

test('Testing changeServer', testChangeServer);

function testAddDestination() {
    let wrapper = mount((<Application/>));

    let actualPlaces = [];
    actualPlaces.push(actualPlace1);
    actualPlaces.push(actualPlace2);
    actualPlaces.push(actualPlace3);

    try {
        wrapper.instance().addDestination(actualPlace1).catch();
    } catch(exception){

    }

    try {
        wrapper.instance().addDestination(actualPlace2).catch();
    } catch(exception){

    }

    try {
        wrapper.instance().addDestination(actualPlace3).catch();
    } catch(exception){}

    expect(wrapper.state().trip.places).toEqual(actualPlaces);
}

test('Testing addDestination', testAddDestination);

function testReverseTrip() {
    let wrapper = mount(<Application/>);
    wrapper.instance().addDestination(actualPlace1);
    wrapper.instance().addDestination(actualPlace2);
    wrapper.instance().addDestination(actualPlace3);
    wrapper.instance().reverseTrip();

    let expectedReverseTrip = [actualPlace3, actualPlace2, actualPlace1];

    expect(wrapper.state().trip.places).toEqual(expectedReverseTrip);
}

test('Testing reverseTrip', testReverseTrip);

function testRemoveLeg() {
    let wrapper = mount(<Application/>);
    wrapper.instance().addDestination(actualPlace1);
    wrapper.instance().addDestination(actualPlace2);
    wrapper.instance().addDestination(actualPlace3);

    wrapper.instance().removeLeg(-1); //out of bounds
    wrapper.instance().removeLeg(4); //out of bounds
    wrapper.instance().removeLeg(1);

    let expectedPlaces = [actualPlace1, actualPlace3];
    expect(wrapper.state().trip.places).toEqual(expectedPlaces);
}

test('Testing removeLeg', testRemoveLeg);

function testAddLeg() {
    let wrapper = mount((<Application/>));

    let actualPlaces = [];
    actualPlaces.push(actualPlace1);
    actualPlaces.push(actualPlace2);
    actualPlaces.push(actualPlace3);

    try {
        wrapper.instance().addLeg(actualPlace1).catch();
    } catch(exception){

    }

    try {
        wrapper.instance().addLeg(actualPlace2).catch();
    } catch(exception){

    }

    try {
        wrapper.instance().addLeg(actualPlace3).catch();
    } catch(exception){}

    expect(wrapper.state().trip.places).toEqual(actualPlaces);
}

test('Testing addLeg', testAddLeg);

function testSetStartLeg() {
    let wrapper = mount(<Application/>);

    let expectedPlaces = [actualPlace2, actualPlace1, actualPlace3];

    wrapper.instance().addDestination(actualPlace1);
    wrapper.instance().addDestination(actualPlace2);
    wrapper.instance().addDestination(actualPlace3);

    wrapper.instance().setStartLeg(-1); //out of bounds
    wrapper.instance().setStartLeg(3); //out of bounds
    wrapper.instance().setStartLeg(1);

    expect(wrapper.state().trip.places).toEqual(expectedPlaces);
}

test('Testing setStartLeg', testSetStartLeg);

function testRender() {
    let wrapper = mount(<Application/>);

    //Test conditional when config is null
    wrapper.setState({'config': null});
    expect(wrapper.find('Container').text()).toEqual('');

    //Test when config is not null
    //Mock config
    let mockConfig = {
        "version":3,
        "type":"config",
        "units":["miles","kilometers","nautical miles","user defined"],
        "optimization":[
            {"label":"none","description":"The trip is not optimized."},
            {"label":"short","description":"Nearest neighbor."}
        ]
    };
    wrapper.setState({'config': mockConfig});

    expect(
        wrapper.containsAllMatchingElements(
            [
                <Info/>,
                <Interop changeServer={wrapper.instance().changeServer} updateNumber={wrapper.instance().updateNumber}/>,
                <ChooseFile trip={wrapper.state().trip} updateTFFI={wrapper.instance().updateTFFI}/>,
                <Options options={wrapper.state().trip.options}
                         config={wrapper.state().config}
                         updateOptions={wrapper.instance().updateOptions}
                         updateDistances={wrapper.instance().updateDistances}/>,
                <OptimizationButtons updateOptions={wrapper.instance().updateOptions} config={wrapper.state().config}/>,
                <Trip trip={wrapper.state().trip}
                      planRequest={wrapper.instance().planRequest}
                      clearTrip={wrapper.instance().clearTrip}
                      updateTFFI={wrapper.instance().updateTFFI}/>,
                <Itinerary trip={wrapper.state().trip}
                           planRequest={wrapper.instance().planRequest}
                           removeLeg={wrapper.instance().removeLeg}
                           reverseTrip={wrapper.instance().reverseTrip}
                           setStartLeg={wrapper.instance().setStartLeg}
                           addDestination={wrapper.instance().addDestination}
                           addLeg={wrapper.instance().addLeg}/>,
                <Map trip={wrapper.state().trip} />
            ]
        )
    ).toBeTruthy();
}

test('Testing render', testRender);