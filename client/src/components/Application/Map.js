import React, {Component} from 'react'
import {Button, Media, Container, Card, CardBody} from 'reactstrap'

class Map extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.trip.map !== '' && this.props.trip.map !== void(0)){
            const dataUri = "data:image/svg+xml;utf8," + this.props.trip.map;
            return (
                        <Media>
                            <Media body>
                                <Media id="map" object src={dataUri} alt="Map of Colorado"/>
                            </Media>
                        </Media>
            );
        }
        else{
            return (
                <Media></Media>
            )
        }
    }
}
export default Map;
//<Button href='#' style={{backgroundColor: "cea12b"}} onClick={this.saveFile} type="button" block> Save Map </Button>