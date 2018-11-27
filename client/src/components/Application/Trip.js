import React, {Component} from 'react'
import {Button, ButtonGroup, Form, Label, Input, FormText, FormGroup, Card, CardBody, Collapse} from 'reactstrap'
import SearchBar from "./SearchBar";
import AddByName from "./AddByName";
import {request} from "../../api/api";

class Trip extends Component {
    constructor(props) {
        super(props);
        this.plan = this.plan.bind(this);
        this.saveFile = this.saveFile.bind(this);
        this.toggle = this.toggle.bind(this);

        this.state={
            user : "Dave Matthews, ruler of the universe",
            collapse : false,
        };
    }
    plan(){
        this.props.planRequest();
    }
    saveFile(){
        let userVersion = this.props.trip.version;
        let userType = this.props.trip.type;
        let userTitle = this.props.trip.title;
        let userPlaces = this.props.trip.places;
        let userDistances = this.props.trip.distances;
        let userOptions = this.props.trip.options;

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

    toggle(){
        this.setState({ collapse: !this.state.collapse});
    }

    render() {
        return (
            <Card>
                <CardBody>
                    <Button style={{backgroundColor: "407157"}} onClick={this.plan} type="button" block> PLAN </Button>
                    <Button style={{backgroundColor: "cea12b"}} onClick={this.saveFile} type="button" block> Save Trip </Button>
                    <Button style={{backgroundColor: "cea12b"}} onClick={this.props.clearTrip} type="button" block> CLEAR </Button>
                </CardBody>
            </Card>
        );
    }
}

export default Trip;

//https://chuvash.eu/2016/05/15/create-and-download-a-file-in-javascript/
//href='#'
//https://stackoverflow.com/questions/2236747/use-of-the-javascript-bind-method