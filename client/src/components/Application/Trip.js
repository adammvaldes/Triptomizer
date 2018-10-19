import React, {Component} from 'react'
import { Button, Form, Label, Input, FormText, FormGroup } from 'reactstrap'

class Trip extends Component {
    constructor(props) {
        super(props);
        this.plan = this.plan.bind(this);
        this.readFile = this.readFile.bind(this);
        this.saveFile = this.saveFile.bind(this);
        this.state={
            user: "Dave Matthews, ruler of the universe"
        };
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
        //console.log(this.props.trip);

    }
    saveFile(){
        let userVersion = this.props.trip.version;
        let userType = this.props.trip.type;
        let userTitle = this.props.trip.title;
        let userPlaces = this.props.trip.places;
        let userDistances = this.props.trip.distances;
        let userOptions = this.props.trip.options;
        //let userMap = this.props.trip.map;

        let userObject = {version: userVersion, type: userType, title: userTitle, options: userOptions, places:userPlaces, distances:userDistances};
        let json = JSON.stringify(userObject);

        userTitle += '.json';

        if (window.navigator.msSaveBlob) {
            let blob = new Blob([json], {type: 'json'});
            window.navigator.msSaveBlob(blob, userTitle);
        }
        else{
            let link = document.createElement('a');
            let content = json;
            let uriScheme = ['data:','json',','].join('');
            link.href = uriScheme + content;
            link.download = userTitle;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

    }

    render() {
        return (
            <FormGroup>
                <Label> Choose the file with trip you want to plan: </Label>
                <Input type="file" name="file" id="userFile" onChange={ this.readFile } />
                <FormText>
                    The file needs to be a JSON file, with the ".json" tag at the end of the name.
                </FormText>
                <Button className="btn text-white" onClick={this.plan} type="button" style={{backgroundColor: "000000"}}> RENDER </Button>
                <Button id="save_Button" onClick={this.saveFile} style={{backgroundColor: "000000"}} > Save Trip </Button>
                <Button className="btn text-white" onClick={this.props.clearTrip} type="button" style={{backgroundColor: "000000"}}> CLEAR </Button>
            </FormGroup>
        );
    }
}

export default Trip;

//https://chuvash.eu/2016/05/15/create-and-download-a-file-in-javascript/