import './enzyme.config.js'                   // (1)
import React from 'react'
import { mount , shallow} from 'enzyme'              // (2)
import {Button, Media} from "reactstrap";
import Itinerary from "../src/components/Application/Itinerary";


const testProps = {
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
    },
    config: {
        optimization:[
            {label:"none",description:"The trip is not optimized."},
            {label:"short",description:"Nearest neighbor."},
            {label:"shorter",description:"2-opt."}]
    },
    displayedAttributes : [["name", "true"], ["id", "true"]]
};


function testRender() {
    const fileWrapper = mount((
        <Itinerary
            trip={testProps.trip}
            config={testProps.config}
            displayedAttributes={testProps.displayedAttributes}
        />
    ));


    let actualButtonTexts = fileWrapper.find('Button').map((button)=>{
        return button.text();
    });

    let expectedButtonTexts = ['+', ' Attributes ', '  Reverse  ', ' Save Trip ', ' Save Map ', 'Search', 'Filter Your Search'];

    expect(actualButtonTexts).toEqual(expectedButtonTexts);
}

test('Testing Button render', testRender);
