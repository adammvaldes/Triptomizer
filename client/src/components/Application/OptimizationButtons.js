import React, {Component} from 'react';
import {Card, CardBody, Button, col} from 'reactstrap';
import { ButtonGroup, Form, Label, Input, FormText} from 'reactstrap'

class OptimizationButtons extends Component {
    constructor(props) {
        super(props);
        this.updateOptimization = this.updateOptimization.bind(this)
    }

    updateOptimization(name){
        // console.log(name.target.value);
        this.props.updateOptions('optimization',name.target.value);
    }

    render() {
        const optimizationButtons = this.props.config.optimization.map((option) =>
            <Button
                key={'Optimization button_' + option.label }
                className="btn text-white optimization"
                type="button"
                active={this.props.config.optimization === option.lable}
                //color={"primary"}
                style={{backgroundColor: "000000"}}
                value={option.label}
                onClick={this.updateOptimization}
            >
                {option.label}
            </Button>
        );
        return(
            <Card>
                <CardBody>
                    <p>Choose the level of optimization for your trip.</p>
                    <ButtonGroup>
                        {optimizationButtons}
                    </ButtonGroup>

                </CardBody>
            </Card>
        );
    }
}


export default OptimizationButtons;