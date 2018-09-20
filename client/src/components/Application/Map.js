import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Container} from 'reactstrap'

class Map extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Container dangerouslySetInnerHTML={{__html: this.props.config }}/>
        );
    }
}
export default Map;