import './enzyme.config.js'                   // (1)
import React from 'react'
import { mount , shallow} from 'enzyme'              // (2)
import Interop from '../src/components/Application/Interop'
import {Button} from "reactstrap";


const testProps = {
    server : "black-bottle.cs.colostate.edu",
    port : "31413"
};

//Function tests to be added after kml is implemented

function changeServer(){

}

function updateNumber(){

}

/*function testChangeServer(value) {
    testProps.server = "black-bottle.cs.colostate.edu";
    expect(2).toEqual(2);
}

test('Testing changeServer', testChangeServer);

function testUpdateNumber() {
    let interopWrapper = mount((
        <Interop
            port={testProps.port}
            changeServer={changeServer}
            updateNumber={updateNumber}
        />
    ));
    interopWrapper.instance().updatePort();
    //let temp = interopWrapper.state().port);
    //console.log("Temp:", temp);
    expect(interopWrapper.state().port).toEqual("31413");
    //console.log(interopWrapper.state().port);
    //console.log(testProps.port);
    let temp2 = 1;
    //expect(2).toEqual(3);
}

test('Testing updateNumber', testUpdateNumber);*/

function testRender() {
    let interopWrapper = mount((
        <Interop
            changeServer={changeServer}
            updateNumber={updateNumber}
        />
    ));

    let actualButtonTexts = interopWrapper.find('Button').map((button)=>{
        return button.text();
    });

    let expectedButtonTexts = ['Change Port', 'Change Server'];
    expect(actualButtonTexts).toEqual(expectedButtonTexts)
}

test('Testing render function in Interop.js', testRender);