import React, {Component} from 'react'
import {Card, CardHeader, CardBody, FormGroup} from 'reactstrap'
import { ButtonGroup, Button, Form, Label, Input, FormText} from 'reactstrap'
import {request} from "../../api/api";

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
  }

  updateDefault(name){
      this.props.updateOptions('unitName',name.target.value);
      this.props.updateOptions('units', name.target.value);
  }

  updateName(name){
      this.props.updateOptions('unitName',name.target.value);
      console.log(name.target.value);
  }
  updateRadius(name){
      //const userRadius = (name.target.validity.valid) ? name.target.value : this.props.options.unitRadius;

      this.props.updateOptions('unitRadius', name.target.value);
  }


  render() {
    const buttons = this.props.config.units.map((unit) =>
      <Button
        key={'distance_button_' + unit}
        className='btn-outline-dark unit-button'
        active={this.props.options.units === unit}
        value={unit}
        onClick={this.updateDefault}
      >
        {unit.charAt(0).toUpperCase() + unit.slice(1)}
      </Button>
    );
    if(this.props.options.units === "user defined"){
        return(
            <Card>
                <CardBody>
                    <p>Select the options you wish to use.</p>
                    <ButtonGroup>
                        {buttons}
                    </ButtonGroup>
                <Form>
                    <FormGroup>
                    <Input type="text" name="UD" id="unitName" placeholder="Your Unit Name" onChange={ this.updateName } value={this.props.options.unitName} />
                    <Input type="number" placeholder="Radius of Earth through object" onChange={ this.updateRadius } />
                    </FormGroup>
                </Form>
            </CardBody>
        </Card>
        );
    }
    return(
      <Card>
        <CardBody>
          <p>Select the options you wish to use.</p>
          <ButtonGroup>
            {buttons}
          </ButtonGroup>
        </CardBody>
      </Card>
    );
  }
}

export default Options;
//pattern="[0-9]*" name="UR" id="userRadius"
//value={this.props.options.unitRadius}