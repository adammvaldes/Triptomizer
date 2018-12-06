import React, {Component} from 'react'
import {Button, Media, Container, Card, CardBody} from 'reactstrap'
import emptyMap from "../resources/world_map.svg";

class Map extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let map;
        if(this.props.trip.map === '' || this.props.trip.map === void(0) || this.props.trip.map === undefined){
            map = <img src={emptyMap} alt="Empty Map"/>;
        }
        else{
            let dataUri = "data:image/svg+xml;utf8," + this.props.trip.map;
            map = <Media id="map" object src={dataUri} alt="World Map"/>;
        }
        return (
                    <Media>
                        <Media body>{map}</Media>
                    </Media>
        );
    }
}
export default Map;
//<Button href='#' style={{backgroundColor: "cea12b"}} onClick={this.saveFile} type="button" block> Save Map </Button>