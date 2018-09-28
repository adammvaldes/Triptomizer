import React, {Component} from 'react'
import { Media } from 'reactstrap'

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
                        <Media heading>
                            This is your trip in Colorado!
                        </Media>
                        <Media object src={dataUri} alt="Map of Colorado"/>
                    </Media>
                </Media>
            );
        }
        else{
            return (
                <Media>
                    <Media body>
                        <Media heading>
                            Plan your trip with the Spaghetti Coders!
                        </Media>
                    </Media>
                </Media>
            )
        }
    }
}
export default Map;