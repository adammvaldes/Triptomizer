import React, {Component} from 'react'
import { Button, Form, Label, Input, FormText } from 'reactstrap'

class Trip extends Component {
    constructor(props) {
        super(props);
        this.plan = this.plan.bind(this);
        this.readFile = this.readFile.bind(this);
        this.clearTrip = this.clearTrip.bind(this);
    }
    plan(){
        this.props.planRequest();
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

    clearTrip(){
        this.props.clearTrip();
        this.props.planRequest();
    }

    render() {
        return (
            <Form>
                <Label> Choose the file with trip you want to plan: </Label>
                <Input type="file" name="file" id="userFile" onChange={ this.readFile } />
                <FormText>
                    The file needs to be a JSON file, with the ".json" tag at the end of the name.
                </FormText>
                <Button className="btn text-white" onClick={this.plan} type="button" style={{backgroundColor: "000000"}}> RENDER </Button>
                <Button className="btn text-white" onClick={this.clearTrip} type="button" style={{backgroundColor: "000000"}}> CLEAR </Button>
            </Form>
        );
    }
}

export default Trip;
