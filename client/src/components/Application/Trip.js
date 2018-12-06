import React, {Component} from 'react'
import {Button, Row, Col, Card, CardBody, ButtonGroup} from 'reactstrap'
import {request} from "../../api/api";

class Trip extends Component {
    constructor(props) {
        super(props);
        this.plan = this.plan.bind(this);
        this.toggle = this.toggle.bind(this);

        this.state={
            user : "Dave Matthews, ruler of the universe",
            collapse : false,
        };
    }
    plan(){
        this.props.planRequest();
    }

    toggle(){
        this.setState({ collapse: !this.state.collapse});
    }

    render() {
        return (
            <div>
                    <Row className="justify-content-center">
                        <ButtonGroup>
                            <Button style={{backgroundColor: "407157"}} onClick={this.plan} type="button" size="lg"> PLAN </Button>
                            <Button style={{backgroundColor: "cea12b"}} onClick={this.props.clearTrip} type="button" size="lg"> CLEAR </Button>
                        </ButtonGroup>
                    </Row>
            </div>
        );
    }
}

export default Trip;

//<Button style={{backgroundColor: "cea12b"}} onClick={this.saveFile} type="button" block> Save Trip </Button>
//https://chuvash.eu/2016/05/15/create-and-download-a-file-in-javascript/
//href='#'
//https://stackoverflow.com/questions/2236747/use-of-the-javascript-bind-method