import React, { Component } from 'react';
import { Media } from 'reactstrap'
import Map from "./Map";


class Itinerary extends Component {
    constructor(props) {
        super(props);
    }

render(){
        return (
            /*<Container>
                <h1>Trip Itinerary.</h1>
                <p>asdf</p>
            </Container>*/
            <Media>
                <Media body>
                    <Media Heading>
                        This is Trip Itinerary
                    </Media>
                </Media>
            </Media>
        );
    }

}

export default Itinerary;
