import React, {Component} from 'react'
import {Card, CardHeader, CardBody, FormGroup, InputGroup, InputGroupAddon} from 'reactstrap'
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
    this.changeServer = this.changeServer.bind(this);
    this.updatePort = this.updatePort.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderInterOpt = this.renderInterOpt.bind(this);
  }

  updateDefault(name){
      this.props.updateOptions('unitName',name.target.value);
      this.props.updateOptions('units', name.target.value);
  }

  updateName(name){
      this.props.updateOptions('unitName',name.target.value);
      //console.log(name.target.value);
  }
  updateRadius(name){
      //const userRadius = (name.target.validity.valid) ? name.target.value : this.props.options.unitRadius;

      this.props.updateOptions('unitRadius', name.target.value);
  }


  changeServer(){
      this.props.changeServer("black-bottle.cs.colostate.edu");
      //console.log("Change server in options", this.props.URL);
  }

  updatePort(team){
      let value = "314";
      let t = team.target.value;
      let number = t.substr(5,t.length);
      value += number;
      this.props.updateNumber(value);
  }

  renderInterOpt(){
      return (
          <Card>
              <CardBody>
                  <InputGroup size="sm">
                      <InputGroupAddon addonType="prepend"><Button className="btn text-white" type="button" color="info" onClick={this.changeServer}> Change Server </Button></InputGroupAddon>
                      <Input type="select" onChange={this.updatePort}>
                          <option> team 13 </option>
                          <option> team 1 </option>
                          <option> team 2 </option>
                          <option> team 3 </option>
                          <option> team 4 </option>
                          <option> team 5 </option>
                          <option> team 6 </option>
                          <option> team 7 </option>
                          <option> team 8 </option>
                          <option> team 9 </option>
                          <option> team 10 </option>
                          <option> team 11 </option>
                          <option> team 12 </option>
                          <option> team 14 </option>
                          <option> team 15 </option>
                          <option> team 16 </option>
                          <option> team 17 </option>
                          <option> team 18 </option>
                          <option> team 19 </option>
                          <option> team 20 </option>
                          <option> team 21 </option>
                          <option> team 22 </option>
                          <option> team 23 </option>
                          <option> team 24 </option>
                      </Input>
                  </InputGroup>
                  <FormText>
                      Select which team's server you wish to use.
                  </FormText>
              </CardBody>
          </Card>
      );
  }

  //TODO:Re-add {this.renderInterOpt()}
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
                    {this.renderInterOpt()}
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
            {this.renderInterOpt()}
        </CardBody>
      </Card>
    );
  }
}

export default Options;
//pattern="[0-9]*" name="UR" id="userRadius"
//value={this.props.options.unitRadius}