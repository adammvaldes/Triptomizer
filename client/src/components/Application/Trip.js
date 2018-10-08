import React, {Component} from 'react'
import { Button, Form, Label, Input, FormText } from 'reactstrap'
//import ReactFileReader from 'react-file-reader';

import { request } from '../../api/api';

class Trip extends Component {
    constructor(props) {
        super(props);
        this.plan = this.plan.bind(this);
        this.readFile = this.readFile.bind(this);
    }
    plan(){
        if(this.props.URL === "" || this.props.port==="314") {
            this.props.updateOptions('unitName', this.props.trip.options.units);
            request(this.props.trip, "plan").then(serverResponse => {
                this.props.updateMap(serverResponse["map"]);
                this.props.updateDistances(serverResponse["distances"]);
            });
        }
        else{
            this.props.updateOptions('unitName', this.props.trip.options.units);
            request(this.props.trip, "plan",this.props.port,this.props.URL).then(serverResponse => {
                this.props.updateMap(serverResponse["map"]);
                this.props.updateDistances(serverResponse["distances"]);
            });
        }
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

    render() {

        return (
            <Form>
                <Label> Choose the file with trip you want to plan: </Label>
                <Input type="file" name="file" id="userFile" onChange={ this.readFile } />
                <FormText>
                    The file needs to be a JSON file, with the ".json" tag at the end of the name.
                </FormText>
                <Button className="btn text-white" onClick={this.plan} type="button" style={{backgroundColor: "000000"}}> PLAN </Button>
            </Form>
        );
    }
}

export default Trip;
