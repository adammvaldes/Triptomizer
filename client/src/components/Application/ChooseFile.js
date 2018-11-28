import React, { Component } from 'react';
import {Button, Card, CardBody,  FormGroup, FormText, Input, Label, Row, Col} from 'reactstrap';
import SearchBar from "./SearchBar";
import AddByName from "./AddByName";


class ChooseFile extends Component {
    constructor(props) {
        super(props);
        this.readFile = this.readFile.bind(this);
        this.updateTitle = this.updateTitle.bind(this);
    }
    readFile(tffi){
        let file = tffi.target.files[0];

        let fReader = new FileReader();

        fReader.onload = function() {
            let obj;
            try{
                obj = JSON.parse(fReader.result);
            }
            catch(e){
                alert("Not a JSON file");
            }
            this.props.updateTFFI(obj);
        }.bind(this);
        fReader.readAsText(file);
    }

    updateTitle(title){
        this.props.updateTrip("title", title.target.value);
    }

    render() {
        return (
            <Card>
                <CardBody>
                    <h2> Plan your trip with the Spaghetti Coders!</h2>
                    <Row>
                        <Col xs="6">
                        <Label> Choose the JSON file with the trip you want to plan </Label>
                        <Input type="file" name="file" id="userFile" onChange={ this.readFile }/>
                        </Col>
                        <Col xs="6">
                        <Input type="text" placeholder={this.props.trip.title} onChange={this.updateTitle}/>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        );
    }
}

export default ChooseFile;
