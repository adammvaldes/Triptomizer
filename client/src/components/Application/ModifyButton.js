import React, {Component} from 'react';
import {Card, CardBody, Button, col} from 'reactstrap';

class ModifyButton extends Component{
    constructor(props) {
        super(props);

        this.updateShowModify = this.updateShowModify.bind(this);
    }


    //TODO: Update to be able to change state back
    updateShowModify(){
        this.props.updateShowModify();
    }

    render() {
        return (
            <Card>
                <CardBody>
                    <Button className="btn text-white" type="button" color="info"  onClick={this.updateShowModify}>Modify Itinerary</Button>
                </CardBody>
            </Card>
        )
    }
}

export default ModifyButton;