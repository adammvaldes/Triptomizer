import React, { Component } from 'react';
import { Media } from 'reactstrap'

class Itinerary extends Component {
    constructor(props) {
        super(props);
    }

render(){
        return (
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
