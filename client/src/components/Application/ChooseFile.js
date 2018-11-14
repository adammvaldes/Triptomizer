import React, { Component } from 'react';
import {Button, Card, CardBody,  FormGroup, FormText, Input, Label} from 'reactstrap';
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
                    <Label> Choose the file with trip you want to plan: </Label>
                    <Input type="file" name="file" id="userFile" onChange={ this.readFile } />
                    <FormText>
                        The file needs to be a JSON file, with the ".json" tag at the end of the name.
                    </FormText>
                    <h2> Or plan your trip from scratch below! </h2>
                    <p> Enter your trip title below! </p>
                    <Input type="text" placeholder={this.props.trip.title} onChange={this.updateTitle}/>
                    <SearchBar addDestination={this.props.addDestination} config={this.props.config} planRequest={this.props.planRequest}/>
                    <AddByName addLeg={this.props.addLeg}/>
                </CardBody>
            </Card>
        );
    }
}

export default ChooseFile;
