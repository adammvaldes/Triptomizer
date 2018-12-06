import React, {Component} from 'react'
import {Card, CardHeader, CardBody, FormGroup, Collapse, Col, Row} from 'reactstrap'
import { ButtonGroup, Button, Form, Label, Input, FormText} from 'reactstrap'
import {request} from "../../api/api";
import OptimizationButtons from "./OptimizationButtons";

/* Options allows the user to change the parameters for planning
 * and rendering the trip map and itinerary.
 * The options reside in the parent object so they may be shared with the Trip object.
 * Allows the user to set the options used by the application via a set of buttons.
 */
class Options extends Component{
    constructor(props) {
        super(props);

        this.updateName = this.updateName.bind(this);
        this.updateRadius = this.updateRadius.bind(this);
        this.updateDefault = this.updateDefault.bind(this);
        this.updateOptimization = this.updateOptimization.bind(this);
    }

    updateDefault(name){
        this.props.updateOptions('units', name.target.value);
    }

    updateName(name){
        this.props.updateOptions('unitName',name.target.value);
    }
    updateRadius(name){
        this.props.updateOptions('unitRadius', name.target.value);
    }

    updateOptimization(name){
        this.props.updateOptions('optimization',name.target.value);
    }

    render() {
        const buttons = this.props.config.units.map((unit) =>
            <Button
                key={'distance_button_' + unit}
                className='btn-outline-dark unit-button'
                active={this.props.options.units === unit}
                value={unit}
                onClick={this.updateDefault}>
                {unit.charAt(0).toUpperCase() + unit.slice(1)}
            </Button>
        );
        if(this.props.options.units === "user defined"){
            return(
                <Card>
                    <CardBody>
                            <Form>
                                <Col xs="12" sm="4">
                                <p>Select the units you wish to use.</p>
                                <ButtonGroup>
                                    {buttons}
                                </ButtonGroup>
                                <FormGroup>
                                    <Input type="text" name="UD" id="unitName" placeholder="Your Unit Name" onChange={ this.updateName } value={this.props.options.unitName} />
                                    <Input type="number" placeholder="Radius of Earth through object" onChange={ this.updateRadius } />
                                </FormGroup>
                                </Col>
                            </Form>
                            <Form>
                                <Col xs="12" sm="4">
                                <OptimizationButtons options={this.props.options}
                                                     config={this.props.config}
                                                     updateOptions={this.props.updateOptions}/>
                                </Col>
                            </Form>
                    </CardBody>
                </Card>
            );
        }
        return(
            <Card>
                <CardBody>
                    <Form>
                        <Col xs="12" sm="4">
                        <p>Select the units you wish to use.</p>
                        <ButtonGroup>
                            {buttons}
                        </ButtonGroup>
                        </Col>
                    </Form>
                    <Form>
                        <Col xs="12" sm="4">
                        <OptimizationButtons options={this.props.options}
                                             config={this.props.config}
                                             updateOptions={this.props.updateOptions}/>
                        </Col>
                    </Form>
                </CardBody>
            </Card>
        );

    }
}

export default Options;