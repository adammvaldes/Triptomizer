import React, {Component} from 'react';
import {Card, CardBody, FormGroup} from 'reactstrap';
import {Button, Form, Input} from 'reactstrap';

//This button will set the specified leg to the starting leg then put the previous starting leg one step lower into the trip
class SetStartLegButton extends Component{

    constructor(props) {
        super(props);

        this.state = {
            textField : ""
        };

        this.setStartLeg = this.setStartLeg.bind(this);
        this.handleChange  = this.handleChange.bind(this);
    }

    //reference updateOptions() in Application.js for implementation
    setStartLeg(leg){
        this.props.setStartLeg(leg);
    }

    handleChange(event) {
        this.setState({textField: event.target.value})
    }

    render() {
        return (
            <Card>
                <CardBody>
                    <Button className="btn text-white" type="button" color="info"  onClick={this.setStartLeg}>Set Start Leg</Button>
                    <Form>
                        <FormGroup>
                            <Input type="number" placeholder="Enter leg number to switch with start" onChange={this.handleChange} />
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        )
    }
}

export default SetStartLegButton;