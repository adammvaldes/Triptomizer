import React, {Component} from 'react';
import {Card, CardBody, FormGroup} from 'reactstrap';
import {Button, Form, Input} from 'reactstrap';

class RemoveLegButton extends Component{

    constructor(props) {
        super(props);

        this.state = {
            textField : ""
        };

        this.removeLeg = this.removeLeg.bind(this);
        this.handleChange  = this.handleChange.bind(this);
    }

    removeLeg(value){
        //TODO: Remove the leg
    }

    handleChange(event) {
        this.setState({textField: event.target.value})
    }

    render() {
        return (
            <Card>
                <CardBody>
                    <Button className="btn text-white" type="button" color="info"  onClick={this.removeLeg}>Remove Leg</Button>
                    <Form>
                        <FormGroup>
                            <Input type="number" placeholder="Number of leg to remove" onChange={ this.handleChange} />
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        )
    }
}

export default RemoveLegButton;