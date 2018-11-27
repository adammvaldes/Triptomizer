import './enzyme.config.js'                   // (1)
import React from 'react'
import { mount , shallow} from 'enzyme'              // (2)
import {Button, Media} from "reactstrap";
import Map from "../src/components/Application/Map";


const testProps = {
    config: null,
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
        map: '<svg width="1920" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><g></g></svg>'
    }
};


function testRender() {
    let mapWrapper = mount((<Map trip={testProps.trip}/>));

    /*let actualButtonText = mapWrapper.find('Button').map((button)=>{
        return button.text();
    });

    let expectedButtonText = [' Save Map '];
    expect(actualButtonText).toEqual(expectedButtonText);*/

    let wrapper = mapWrapper.find('#map').first();
    let actualMap = wrapper.html();

    let expectedMap = '<img id="map" src="data:image/svg+xml;utf8,<svg width=&quot;1920&quot; height=&quot;20&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; xmlns:svg=&quot;http://www.w3.org/2000/svg&quot;><g></g></svg>" alt="Map of Colorado" class="media-object">';
    expect(actualMap).toEqual(expectedMap);

    testProps.trip.map = '';
    mapWrapper = mount((<Map trip={testProps.trip}/>));

    /*actualButtonText = mapWrapper.find('Button').map((button)=>{
        return button.text();
    });

    expectedButtonText = [];
    expect(actualButtonText).toEqual(expectedButtonText);*/

    expect(mapWrapper.containsMatchingElement(
        <Media></Media>
    )).toEqual(true);
}

test('Testing Map render', testRender);
