import React, {Component} from 'react'
import {Card, CardHeader, CardBody, FormGroup} from 'reactstrap'
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

    this.state = {showOptions : true};
    this.updateName = this.updateName.bind(this);
    this.updateRadius = this.updateRadius.bind(this);
    this.updateDefault = this.updateDefault.bind(this);
    this.updateOptimization = this.updateOptimization.bind(this);
    this.hideOptions = this.hideOptions.bind(this);
    this.showOptions = this.showOptions.bind(this);
  }

  updateDefault(name){
      this.props.updateOptions('unitName',name.target.value);
      this.props.updateOptions('units', name.target.value);
  }

  updateName(name){
      this.props.updateOptions('unitName',name.target.value);
  }
  updateRadius(name){
      //const userRadius = (name.target.validity.valid) ? name.target.value : this.props.options.unitRadius;

      this.props.updateOptions('unitRadius', name.target.value);
  }

  updateOptimization(name){
      this.props.updateOptions('optimization',name.target.value);
  }

  showOptions(){
      this.state.showOptions = true;
      this.props.planRequest();
  }

  hideOptions(){
     this.state.showOptions = false;
     this.props.planRequest();
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
    if(this.state.showOptions == true) {
        if(this.props.options.units === "user defined"){
            return(
                <Card>
                    <CardBody>
                        <Form>
                            <p>Select the units you wish to use.</p>
                            <ButtonGroup>
                                {buttons}
                            </ButtonGroup>
                            <FormGroup>
                                <Input type="text" name="UD" id="unitName" placeholder="Your Unit Name" onChange={ this.updateName } value={this.props.options.unitName} />
                                <Input type="number" placeholder="Radius of Earth through object" onChange={ this.updateRadius } />
                            </FormGroup>
                            <OptimizationButtons options={this.props.options}
                                                 config={this.props.config}
                                                 updateOptions={this.props.updateOptions}/>
                        </Form>
                        <Button onClick={this.hideOptions} color={'info'}> Hide Options </Button>
                    </CardBody>
                </Card>
            );
        }
        return(
            <Card>
                <CardBody>
                    <Form>
                        <p>Select the units you wish to use.</p>
                        <ButtonGroup>
                            {buttons}
                        </ButtonGroup>
                        <FormGroup/>
                        <OptimizationButtons options={this.props.options}
                                             config={this.props.config}
                                             updateOptions={this.props.updateOptions}/>
                    </Form>
                    <Button onClick={this.hideOptions} color={'info'}> Hide Options </Button>
                </CardBody>
            </Card>
        );
    }
    else {
        return(
            <Card>
                <CardBody>
                    <Button onClick={this.showOptions} color={'info'}>Show Options</Button>
                </CardBody>
            </Card>
        );
    }

  }
}

export default Options;
//pattern="[0-9]*" name="UR" id="userRadius"
//value={this.props.options.unitRadius}