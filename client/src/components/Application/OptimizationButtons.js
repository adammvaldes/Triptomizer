import React, {Component} from 'react';
import {Card, CardBody, Button, col} from 'reactstrap';

class OptimizationButtons extends Component {
    constructor(props) {
        super(props);
        this.updateOptimization = this.updateOptimization.bind(this)
    }


    updateOptimization(name){
        console.log(name.target.value);
        this.props.updateOptions('optimization',name.target.value);

    }
    //const opt: 'asdf','asdf';
    render() {
        /*const buttons = this.props.config.optimizationList.map((option) =>
            <Button
                key={'Optimization button_' + option}
                className="btn text-white optimization"
                type="button"
                color="info"
                active={this.props.option.opt === option}
                value={option}
                onClick={this.updateOptimization}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
            </Button>
        );*/
        return(
            <Card>
                <CardBody>
                    <p>Choose the level of optimization for your trip:</p>
                    <Button className="btn text-white" type="button" color="info"  value={"None"} onClick={this.updateOptimization}>None</Button>
                    <Button className="btn text-white" type="button" color="info"  value={"Short"} onClick={this.updateOptimization}>Short</Button>
                </CardBody>
            </Card>
        );
    }
}


export default OptimizationButtons;