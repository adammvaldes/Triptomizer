import React, {Component} from 'react';
import {Container, Card, CardBody, Button, col} from 'reactstrap';
import { ButtonGroup, Form, Label, Input, FormText} from 'reactstrap'

class OptimizationButtons extends Component {
    constructor(props) {
        super(props);
        this.updateOptimization = this.updateOptimization.bind(this)
    }

    updateOptimization(name){
        this.props.updateOptions('optimization',name.target.value);
    }

    render() {
        const optimizationButtons = this.props.config.optimization.map((option) =>
            <Button
                key={'Optimization button_' + option.label }
                className="btn-outline-dark optimization"
                type="button"
                active={this.props.options.optimization === option.label}
                value={option.label}
                onClick={this.updateOptimization}
            >
                {option.label}
            </Button>
        );
        return(
            <div>
               <p>Choose the level of optimization for your trip.</p>
               <ButtonGroup>
                  {optimizationButtons}
               </ButtonGroup>
            </div>
        );
    }
}

export default OptimizationButtons;
