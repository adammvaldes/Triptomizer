import React, {Component} from 'react'
import { Card, CardBody } from 'reactstrap'
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
        request(this.props.trip,"plan").then( serverResponse => {
            this.props.updateMap(serverResponse["map"])
            //this.props.updateDistance(serverResponse["distance"])
        });
    }

    readFile(tffi){
        let file = tffi.target.files[0];
        //FileReader.readAsText(TFFI);
        console.log("stuffity's");
        //console.log(file);
        //console.log(tffi);
        //let file = tffi;//.target.files[0];
        let fReader = new FileReader();

        //let f = fReader.readAsText(tffi);
        //console.log(f);

        fReader.onload = function() {
            let obj;
            try{
                obj = JSON.parse(fReader.result);
            }
            catch(e){
                alert("Not a JSON file");
            }
            this.props.updateStuff(obj);
        }.bind(this);
        fReader.readAsText(file);
    }

    componentDidMount() {
        //this.plan();
    }
    render() {

        return (
            <Form>
                <Label> Choose the file with trip you want to plan: </Label>
                <Input type="file" name="file" id="userFile" onChange={ this.readFile/*(TFFI) => this.readFile(TFFI.target.files[0])*/ } />
                <FormText>
                    Stuffity stuff stuff.
                </FormText>
                <Button className="btn text-white" onClick={this.plan} type="button" style={{backgroundColor: "000000"}}> PLAN </Button>
            </Form>
        );
        //ctrl-shift-i
        //https://reactstrap.github.io/components/form/
        //https://medium.com/front-end-hacking/file-input-with-react-js-and-typescript-64dcea4b0a86
    }
}

export default Trip;

//let x = JSON.stringify(this.props.trip);
/*<Card>
                <CardBody>
                    <form onSubmit={this.plan}>
                    <p>Choose you file with the trip you want to map.</p>
                    <p>
                    <ButtonGroup>
                        <button className='btn-outline-dark unit-button' onClick={this.plan()} type="button">Choose file</button>
                    </ButtonGroup>
                        No file chosen
                    </p>
                    </form>
                    <p>Hit "PLAN" to plan your trip!</p>
                    <ButtonGroup>
                        <button className="btn" onClick={this.plan} type="button">PLAN</button>
                    </ButtonGroup>
                </CardBody>
            </Card>*/