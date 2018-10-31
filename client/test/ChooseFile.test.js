import './enzyme.config.js'                   // (1)
import React from 'react'
import { mount , shallow} from 'enzyme'              // (2)
import ChooseFile from '../src/components/Application/ChooseFile'
import {Button} from "reactstrap";


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
        map: ''
    }
};

function updateTFFI(tffi) {
    testProps.trip = tffi;
}


function testRender() {
    const fileWrapper = mount((
        <ChooseFile
            trip={testProps.trip}
            updateTFFI={updateTFFI}
        />
    ));

    let actualButtonTexts = fileWrapper.find('Button').map((button)=>{
        return button.text();
    });

    let expectedButtonTexts = ['Search for locations', 'Search', 'Add destination to Trip',' Add your own location ', 'Add to trip'];
    expect(actualButtonTexts).toEqual(expectedButtonTexts)
}

test('Testing plan function in Trip.js', testRender);