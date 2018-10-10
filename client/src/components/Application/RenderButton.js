import React, {Component} from 'react';
import {Card, CardBody, Button, col} from 'reactstrap';

class RenderButton extends Component{
    constructor(props) {
        super(props);

        this.rerender = this.rerender.bind(this);
        this.updateRenderButton = this.updateRenderButton.bind(this);
    }

    updateRenderButton(){
        this.props.updateRenderButton();
    }

    //TODO: Implement rerender() method, look to Trip.js for using requests?
    rerender(){

    }

    //TODO: Sets state equivalent to having chose the load option as in Trip.js

    render() {
        return (
            <Card>
                <CardBody>
                    <Button className="btn text-white" type="button" color="info"  onClick={this.rerender}>Render Map</Button>
                </CardBody>
            </Card>
        )

    }
}

export default RenderButton;