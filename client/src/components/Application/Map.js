import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Container} from 'reactstrap'

class Map extends Component {
    constructor(props) {
        super(props);
    }
    async trip(){
        try{
            let serverResponse = await this.fetchResponse();
            let tffi = await serverResponse.json();
            this.props.updateMap(tffi.map);
        }
        catch(Err){
            console.error(Err);
        }
    }
    render() {
        return (
            <Container dangerouslySetInnerHTML={{__html: this.props.config }}/>

        );
    }
}

export default Map;