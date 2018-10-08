import React, {Component} from 'react'
import {Button, Form, Label, Input, FormText, CardBody, Card} from 'reactstrap';
import { InputGroupAddon, InputGroup, InputGroupText } from 'reactstrap';
import { col } from 'reactstrap';

class Interop extends Component {
    constructor(props) {
        super(props);

        this.changeServer = this.changeServer.bind(this);
        this.updatePort = this.updatePort.bind(this);
    }

    changeServer(){
        this.props.changeServer("black-bottle.cs.colostate.edu");
        //console.log(this.props.URL);
    }

    updatePort(team){
        let value = "314";
        let t = team.target.value;
        let number = t.substr(5,t.length);
        value += number;
        this.props.updateNumber(value);
    }

    render() {
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
}

export default Interop;
//https://reactstrap.github.io/components/input-group/
//https://reactstrap.github.io/components/form/
//https://alligator.io/react/fancy-forms-reactstrap/
//https://reactstrap.github.io/components/buttons/
//placeholder="13" pattern="[0-9]*" onChange={this.updateNumber}
//https://facebook.github.io/react-native/docs/height-and-width
//https://react-bootstrap.github.io/components/forms/
//https://github.com/reactstrap/reactstrap/issues/843

//<Input type="text" placeholder="13" onChange={this.updateNumber} />