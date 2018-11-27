import React, {Component} from 'react'
import {Card, CardHeader, CardBody, FormGroup, Modal, ModalHeader, ModalBody} from 'reactstrap'
import {ButtonGroup, Button, Form, Label, Input, FormText} from 'reactstrap'

class AddByName extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            name: "",
            latitude: "",
            longitude: "",
        };

        this.onIDChange = this.onIDChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onLatitudeChange = this.onLatitudeChange.bind(this);
        this.onLongitudeChange = this.onLongitudeChange.bind(this);
        this.addToTrip = this.addToTrip.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    onIDChange(form) {
        this.setState({id: form.target.value});
    }

    onNameChange(form) {
        this.setState({name: form.target.value});
    }

    onLatitudeChange(form) {
        this.setState({latitude: form.target.value});
    }

    onLongitudeChange(form) {
        this.setState({longitude: form.target.value});
    }

    addToTrip() {
        this.props.addLeg(this.state);
        this.toggleModal();
    }

    toggleModal() {
        this.props.toggleModal();
    }

    render() {
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Add your own location</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <p>Add a destination to your trip by name and location.</p>
                            <Input type="number" placeholder="" id="id" placeholder="Enter destination ID"
                                   onChange={this.onIDChange}/>
                            <Input type="text" placeholder="" id="name" placeholder="Enter destination name"
                                   onChange={this.onNameChange}/>
                            <Input type="number" placeholder="" id="latitude" placeholder="Enter destination latitude"
                                   onChange={this.onLatitudeChange}/>
                            <Input type="number" placeholder="" id="longitude" placeholder="Enter destination longitude"
                                   onChange={this.onLongitudeChange}/>
                        </FormGroup>
                        <Button id="add button" style={{backgroundColor: "#407157"}} onClick={this.addToTrip}>Add to trip</Button>
                    </Form>
                </ModalBody>
            </Modal>
        );
    }
}

export default AddByName;