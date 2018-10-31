import React, {Component} from 'react'
import {Button, Form, Label, Input, FormText, CardBody, Card} from 'reactstrap';
import { InputGroupAddon, InputGroup, InputGroupText } from 'reactstrap';
import { col } from 'reactstrap';

class Interop extends Component {
    constructor(props) {
        super(props);

        this.changeServer = this.changeServer.bind(this);
        this.updatePort = this.updatePort.bind(this);
        this.teamNumbers = this.teamNumbers.bind(this);
    }

    changeServer(){
        this.props.changeServer("black-bottle.cs.colostate.edu");
    }

    updatePort(team){
        let value = "314";
        let t = team.target.value;
        let number = t.substr(5,t.length);
        if(number < 0){

        }
        value += number;
        this.props.updateNumber(value);
    }

    teamNumbers(){
        let teams = [];
        for(let i = 0; i < 25; i++) {
            if(i != 13) {
                if(i < 10){
                    teams.push(<option key={i}> team 0{i} </option>);
                }
                else{
                    teams.push(<option key={i}> team {i} </option>);
                }
            }
        }
        return teams;
    }

    render() {
        let var0 = this.teamNumbers();
        return (
            <Card>
                <CardBody>
                    <InputGroup size="sm">
                        <InputGroupAddon addonType="prepend"><Button className="btn text-white" type="button" color="info" onClick={this.changeServer}> Change Server </Button></InputGroupAddon>
                        <Input type="select" onChange={this.updatePort}>
                            <option> team 13 </option>
                            {var0}
                        </Input>
                    </InputGroup>
                    <FormText> Select which team's server you wish to use.</FormText>
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
