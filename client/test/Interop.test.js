import './enzyme.config.js'                   // (1)
import React from 'react'
import { mount , shallow} from 'enzyme'              // (2)
import Interop from '../src/components/Application/Interop'
import {Button} from "reactstrap";


const testProps = {
    URL : "localhost",
    port : "31400"
};

//Function tests to be added after kml is implemented

function changeServer(server){
    testProps.URL = server;
}

function updateNumber(port){
    testProps.port = port;
}

function testChangeServer(){
    let interopWrapper = mount((
        <Interop
            changeServer={changeServer}
            updateNumber={updateNumber}
        />
    ));
    interopWrapper.instance().changeServer("black-bottle.cs.colostate.edu");
    let expectedServer = "black-bottle.cs.colostate.edu";
    expect(interopWrapper.state().server).toEqual(expectedServer);
}

test('Testing changeServer', testChangeServer);

function testUpdatePort(){
    let interopWrapper = mount((
        <Interop
            changeServer={changeServer}
            updateNumber={updateNumber}
        />
    ));
    interopWrapper.instance().updatePort("31413");
    let expectedPort = "31413";
    expect(interopWrapper.state().port).toEqual(expectedPort);
}

test('Testing updatePort', testUpdatePort);

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
    expect(actualButtonTexts).toEqual(expectedButtonTexts);
}

test('Testing render function in Interop.js', testRender);