import './enzyme.config.js'                   // (1)
import React from 'react'
import { mount , shallow} from 'enzyme'              // (2)
import {Button, Collapse, Container, Form, FormGroup, Input, Modal, ModalBody, ModalHeader} from "reactstrap";
import AddByName from "../src/components/Application/AddByName";

function testOnIDChange() {
    let wrapper = mount(<AddByName/>);
    wrapper.setProps({modal : true});
    wrapper.find('#id').hostNodes().simulate('change', {
            target: {value: 'testing destination ID'}
    });
    expect(wrapper.state().id).toEqual('testing destination ID');
}

test('Testing onIDChange',testOnIDChange);

function testOnNameChange() {
    let wrapper = mount(<AddByName/>);
    wrapper.setProps({modal : true});
    wrapper.find('#name').hostNodes().simulate('change', {
        target: {value: 'testing destination Name'}
    });
    expect(wrapper.state().name).toEqual('testing destination Name');
}

test('Testing onNameChange',testOnNameChange);

function testOnLatitudeChange() {
    let wrapper = mount(<AddByName/>);
    wrapper.setProps({modal : true});
    wrapper.find('#latitude').hostNodes().simulate('change', {
        target: {value: 'testing destination Latitude'}
    });
    expect(wrapper.state().latitude).toEqual('testing destination Latitude');
}

test('Testing onLatitudeChange',testOnLatitudeChange);

function testOnLongitudeChange() {
    let wrapper = mount(<AddByName/>);
    wrapper.setProps({modal : true});
    wrapper.find('#longitude').hostNodes().simulate('change', {
        target: {value: 'testing destination Longitude'}
    });
    expect(wrapper.state().longitude).toEqual('testing destination Longitude');
}

test('Testing onLongitudeChange',testOnLongitudeChange);

function testRender() {
    let wrapper = mount(<AddByName/>);

    wrapper.setProps({modal : true});

    expect(wrapper.instance().props.modal).toEqual(true);

    expect(wrapper.containsMatchingElement(

        <Modal isOpen={wrapper.instance().props.modal} toggle={wrapper.instance().props.toggleModal}>
            <ModalHeader toggle={wrapper.instance().toggleModal}>Add your own location</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <p>Add a destination to your trip by name and location.</p>
                        <Input type="number" placeholder="" id="id" placeholder="Enter destination ID"
                               onChange={wrapper.instance().onIDChange}/>
                        <Input type="text" placeholder="" id="name" placeholder="Enter destination name"
                               onChange={wrapper.instance().onNameChange}/>
                        <Input type="number" placeholder="" id="latitude" placeholder="Enter destination latitude"
                               onChange={wrapper.instance().onLatitudeChange}/>
                        <Input type="number" placeholder="" id="longitude" placeholder="Enter destination longitude"
                               onChange={wrapper.instance().onLongitudeChange}/>
                    </FormGroup>
                    <Button id="add button" style={{backgroundColor: "#407157"}}
                            onClick={wrapper.instance().addToTrip}>Add to trip</Button>
                </Form>
            </ModalBody>
        </Modal>
    )).toBeTruthy();
}

test('Testing render', testRender);