import React, {Component} from 'react'
import {Card, CardHeader, CardBody, FormGroup} from 'reactstrap'
import { ButtonGroup, Button, Form, Label, Input, FormText} from 'reactstrap'
import {request} from "../../api/api";

/* Options allows the user to change the parameters for planning
 * and rendering the trip map and itinerary.
 * The options reside in the parent object so they may be shared with the Trip object.
 * Allows the user to set the options used by the application via a set of buttons.
 */

class SearchForm extends Component{
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    render() {

        return (
            <div>
            <Card>
            <CardBody>
            <p className="lead">"Want to travel far and wide?"</p>
            <ol >
            <li>
            Choose options for trip planning, information to display about locations,
            and how the trip map and itinerary should be saved.</li>
        <li>
        Choose your destinations by loading existing sets of destinations or
        find more in an extensive database of locations worldwide.</li>
        <li>
        Plan the trip with the options you selected.
            Review and revise the trip origin and order.
            Save the trip map and itinerary for future reference.</li>
        </ol>
        </CardBody>
        </Card>
        </div>
        )
    }


    /*return(
        <Card>
            <CardBody>
                <p>Type your search.</p>
            </CardBody>
        </Card>*/



}
