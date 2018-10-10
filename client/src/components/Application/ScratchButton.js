import React, {Component} from 'react';
import {Card, CardBody, Button, col} from 'reactstrap';

class ScratchButton extends Component{
    constructor(props) {
        super(props);

        this.updateScratchButton = this.updateScratchButton.bind(this);
    }


    updateScratchButton(){
        this.props.updateScratchButton();

    }

    render() {
        return (
            <Card>
                <CardBody>
                    <Button className="btn text-white" type="button" color="info"  onClick={this.updateScratchButton}>Create a Trip From Scratch</Button>
                </CardBody>
            </Card>
        )
    }
}

export default ScratchButton;