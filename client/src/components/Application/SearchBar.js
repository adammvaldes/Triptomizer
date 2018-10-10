import React, {Component} from 'react';
import {Card, CardBody, FormGroup} from 'reactstrap';
import {Button, Form, Input} from 'reactstrap';

class SearchBar extends Component{

    constructor(props) {
        super(props);

        this.state = {
            searchText : ""
        };

        this.search = this.search.bind(this);
        this.handleChange  = this.handleChange.bind(this);
    }

    //reference updateOptions() in Application.js for implementation
    search(value){
        this.props.search(value);
    }

    handleChange(event) {
        this.setState({searchText: event.target.value})
    }

    //TODO: Create Search functions
    render() {
        return (
            <Card>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Input type="text" placeholder="Search for a destination to add to your trip" onChange={this.handleChange} />
                        </FormGroup>
                    </Form>
                    <Button className="btn text-white" type="button" color="info"  onClick={this.search}>Search</Button>
                    <Button className="btn text-white" type="button" color="info"  onClick={this.search}>Add destination to Trip</Button>
                </CardBody>
            </Card>
        )
    }
}

export default SearchBar;