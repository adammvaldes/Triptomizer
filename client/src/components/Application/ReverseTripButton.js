import React, {Component} from 'react';
import {Card, CardBody} from 'reactstrap';
import {Button} from 'reactstrap';

class ReverseTripButton extends Component{

    constructor(props) {
        super(props);
        this.reverseTrip = this.reverseTrip.bind(this);
    }

    reverseTrip(){
        this.props.reverseTrip();
    }

    render() {
        return (
            <Card>
                <CardBody>
                    <Button className="btn text-white" type="button" color="info"  onClick={this.reverseTrip}>Reverse Trip Order</Button>
                </CardBody>
            </Card>
        )
    }
}

export default ReverseTripButton;