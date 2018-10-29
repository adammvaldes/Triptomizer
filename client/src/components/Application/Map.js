import React, {Component} from 'react'
import {Button, Media, Container, Card, CardBody} from 'reactstrap'

class Map extends Component {
    constructor(props) {
        super(props);
        this.saveFile = this.saveFile.bind(this);
    }

    saveFile(){
        let userMap = this.props.trip.map;
        let userTitle = "Map";

        if (window.navigator.msSaveBlob) {
            let blob = new Blob([userMap], {type: 'svg'});
            window.navigator.msSaveBlob(blob, userTitle);
        }
        else{
            let link = document.createElement('a');
            let content = userMap;
            let uriScheme = ['data:','json',','].join('');
            link.href = uriScheme + content;
            link.download = userTitle;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

    }

    render() {
        if(this.props.trip.map !== '' && this.props.trip.map !== void(0)){
            const dataUri = "data:image/svg+xml;utf8," + this.props.trip.map;
            return (
                <Card>
                    <CardBody>
                    <Media>
                        <Media body>
                            <Media id="map" object src={dataUri} alt="Map of Colorado"/>
                        </Media>
                    </Media>
                    <Button href='#' style={{backgroundColor: "cea12b"}} onClick={this.saveFile} type="button" block> Save Map </Button>
                    </CardBody>
                </Card>
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