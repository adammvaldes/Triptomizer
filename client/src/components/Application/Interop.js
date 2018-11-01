import React, {Component} from 'react'
import {Button, Form, Label, Input, FormText, CardBody, Card} from 'reactstrap';
import { InputGroupAddon, InputGroup, InputGroupText } from 'reactstrap';
import { col } from 'reactstrap';

class Interop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            server : "black-bottle.cs.colostate.edu",
            port : "31413"
        };
        this.changeServer = this.changeServer.bind(this);
        this.updatePort = this.updatePort.bind(this);
        this.handleServerChange = this.handleServerChange.bind(this);
        this.handlePortChange = this.handlePortChange.bind(this);
    }

    changeServer(){
        this.props.changeServer(this.state.server);
    }

    updatePort(){
            let tempPort = "314";
            if(this.state.port.length == 4){
                tempPort += "0" + this.state.port.at(3);
                this.state.port = tempPort;
            }
            this.changeServer();
            this.props.updateNumber(this.state.port);
    }

    handleServerChange(event){
        this.setState({server: event.target.value})
    }

    handlePortChange(event){
        this.setState({port: event.target.value})
    }


    render() {
        return(
            <Card>
                <CardBody>
                    Enter your server information then click the corresponding change button to change the server
                    <InputGroup>
                        <InputGroupAddon addonType="prepend"><Button className="btn text-white" type="button" style={{backgroundColor: "407157"}} onClick={this.changeServer}>Change Server</Button></InputGroupAddon>
                        <Input type="text" placeholder="Enter the URL of the server you want to use" onChange={this.handleServerChange} value={this.state.server}/>
                    </InputGroup>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend"><Button className="btn text-white" type="button" style={{backgroundColor: "407157"}} onClick={this.updatePort}>Change Port</Button></InputGroupAddon>
                        <Input type="number" placeholder="Enter the port number you want to use" onChange={this.handlePortChange} value={this.state.port}/>
                    </InputGroup>
                </CardBody>
            </Card>
        )
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
