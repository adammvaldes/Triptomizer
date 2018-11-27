import React, {Component} from 'react';
import {Card, CardBody, Button, col} from 'reactstrap';

class SaveButton extends Component{
    constructor(props) {
        super(props);
        this.saveTrip = this.saveTrip.bind(this);
    }


    saveTrip(){
        this.props.saveTrip();
    }

    render() {
        return (
            <Card>
                <CardBody>
                    <Button className="btn text-white" type="button" color="info"  onClick={this.saveTrip}>Save Changes</Button>
                </CardBody>
            </Card>
        )

    }




}

export default SaveButton;