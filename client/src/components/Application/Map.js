import React, {Component} from 'react'
import { Media } from 'reactstrap'

import { request } from '../../api/api';

class Map extends Component {
    constructor(props) {
        super(props);
        this.plan = this.plan.bind(this);
    }
    plan(){
        request(this.props.trip,"plan").then( serverResponse => {
            this.props.updateMap(serverResponse["map"])
        });

    }

    componentDidMount() {
        //this.plan();
    }
    render() {
        const dataUri = "data:image/svg+xml;utf8," + this.props.trip.map;
        return (
            <Media>
                <Media body>
                    <Media heading>
                        This is the map of Colorado!
                    </Media>
                    <Media object src={dataUri} alt="Map of Colorado"/>
                </Media>
            </Media>
        );
        //<Container dangerouslySetInnerHTML={{__html: this.props.map }} />
        //<Media object src={hippo} alt="Test hippo of good fortune"/>
        //ctrl-shift-i
    }
}
export default Map;
//cd client
//npm run dev
//