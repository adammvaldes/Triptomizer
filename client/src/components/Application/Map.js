import React, {Component} from 'react'
import { Media } from 'reactstrap'



class Map extends Component {
    constructor(props) {
        super(props);
        this.plan = this.plan.bind(this);
    }
    async plan(){
        try{
            //let serverResponse = await this.fetchResponse(this.props.trip,this.props.trip.type,8088);
            //let tffi = await serverResponse.json();
            //this.props.updateMap("stuffity");
            this.props.updateTitle("stuffity");
        }
        catch(Err){
            console.error(Err);
        }
    }

    render() {
        //this.plan();
        const dataUri = "data:image/svg+xml;utf8," + this.props.trip.map;
        return (
            <Media>
                <Media body>
                    <Media Heading>
                        This is the map of Colorado!
                    </Media>
                    <Media object src={dataUri} alt="Map of Colorado"/>
                </Media>
            </Media>
        );
        //<Container dangerouslySetInnerHTML={{__html: this.props.map }} />
        //<Media object src={hippo} alt="Test hippo of good fortune"/>
    }
}
export default Map;
//cd client
//npm run dev
//