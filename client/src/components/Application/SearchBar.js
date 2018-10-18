import React, {Component} from 'react';
import {Card, CardBody, FormGroup, Table} from 'reactstrap';
import {Button, Form, Input} from 'reactstrap';
import {request} from "../../api/api";

class SearchBar extends Component{

    constructor(props) {
        super(props);

        this.state = {
            searchText : "",
            searchResults : []
        };
        this.search = this.search.bind(this);
        this.handleChange  = this.handleChange.bind(this);
    }

    //reference updateOptions() in Application.js for implementation
    search(){
        let tripTFFI = {"match" : this.state.searchText, "places" : []};
        console.log("Trip TFFI match", tripTFFI.match);
        if(this.props.URL === "" || this.props.port==="314") {
            request(tripTFFI, "search").then(serverResponse => {
                tripTFFI.places = serverResponse["places"];
                //let searchResults = this.state.searchResults;
                //searchResults = tripTFFI.places;
                //this.setState(searchResults);
                this.setState({searchResults : tripTFFI.places});
                console.log("Search Results", this.state.searchResults);
                //console.log("Search Results", this.state.searchResults);
                //console.log("Trip state places from search", this.state.trip.places);
                //this.updateMap(serverResponse["map"]);
                //this.updateDistances(serverResponse["distances"]);
                //this.planRequest();
                //console.log("In this one");
                //console.log(tripTFFI.places.length);
                //console.log(this.state.trip.places[0]);
                //this.updateMap(serverResponse["map"]);
                //this.updateDistances(serverResponse["distances"]);
            });
        }
        else{
            request(tripTFFI, "search",this.props.port,this.props.URL).then(serverResponse => {
                tripTFFI.places = serverResponse["places"];
                this.setState({searchResults : tripTFFI.places});
                console.log("Search Results", this.state.searchResults);
                //console.log("Search Results", this.state.searchResults);
                //this.updateTrip('places', serverResponse["places"]);
                //this.updateMap(serverResponse["map"]);
                //this.updateDistances(serverResponse["distances"]);
                //this.planRequest();
                //console.log(this.state.trip.places[0]);
                //this.updateMap(serverResponse["map"]);
                //this.updateDistances(serverResponse["distances"]);
            });
        }
        //console.log("Search value at SearchBar call",this.state.searchText);
        //console.log("Search target value at SearchBar call",value.target.value);
        //this.props.search(value.target.value);
        //this.props.search(this.state.searchText);
        console.log("Search Results outside", this.state.searchResults);
    }

    handleChange(event) {
        this.setState({searchText: event.target.value})
    }

    renderResults(){
        let inc = 0;
        let tripGeoLocations = this.state.searchResults.map((place) => {
            inc++;
            return <td key={'place ' + inc}>{place.longitude}</td>;
        });
        return (
            <tr>
                <th scope="row">Geographical Location</th>
                {tripGeoLocations}
            </tr>
        );
    }
        /*
        return(

            <tr>
                <th scope="row">Geographical Location</th>
                {this.state.searchResults}
            </tr>
        );*/



    /*const rows = {

    }*/

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
                    <Button className="btn text-white" type="button" color="info"  onClick={this.renderResults}>Add destination to Trip</Button>
                    <div id="parent">
                        <div id="div1">
                            <Table responsive>
                                <tbody>
                                {this.renderResults()}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </CardBody>
            </Card>
        )
    }
}

export default SearchBar;