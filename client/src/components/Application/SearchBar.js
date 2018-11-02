import React, {Component} from 'react';
import {Card, CardBody, FormGroup, Table, Collapse} from 'reactstrap';
import {Button, Form, Input} from 'reactstrap';
import {request} from "../../api/api";

class SearchBar extends Component{

    constructor(props) {
        super(props);

        this.state = {
            searchText : "",
            addIndex : "0",
            searchResults : [],
            collapse : false
        };
        this.search = this.search.bind(this);
        this.setSearchResults = this.setSearchResults.bind(this);
        this.handleChange  = this.handleChange.bind(this);
        this.handleChange2  = this.handleChange2.bind(this);
        this.addDestination = this.addDestination.bind(this);
        this.addAllDestinations = this.addAllDestinations.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    search(){
        let tripTFFI = {"version":3, "type":"search","match" : this.state.searchText, "places" : []};
        if(this.props.URL === "" || this.props.port==="314") {
            request(tripTFFI, "search").then(serverResponse => {
                tripTFFI.places = serverResponse["places"];
                this.setSearchResults(tripTFFI.places);
            });
        }
        else{
            request(tripTFFI, "search",this.props.port,this.props.URL).then(serverResponse => {
                tripTFFI.places = serverResponse["places"];
                this.setSearchResults(tripTFFI.places);
            });
        }
    }

    setSearchResults(value){
        this.setState({
            searchResults : value
        });
    }


    handleChange(event) {
        this.setState({searchText: event.target.value})
    }

    handleChange2(event) {
        this.setState({addIndex: event.target.value})
    }

    renderResults(){
        let inc = 0;
        let searchResultNames = this.state.searchResults.map((place) => {
            inc++;
            return <td key={'place ' + inc}>{inc-1}:<p></p>{place.name}</td>;
        });
        if(this.state.searchResults.length > 0){
            return (
                <tr>
                    <th scope="row">Location Name</th>
                    {searchResultNames}
                </tr>
            );
        }
    }

    addDestination(){
        if(this.state.addIndex < 0 || this.state.addIndex > 30){
            return;
        }
        this.props.addDestination(this.state.searchResults[this.state.addIndex]);
    }

    addAllDestinations(){
        let tempAddIndex = this.state.addIndex;
        while(this.state.addIndex < this.state.searchResults.length){
            this.addDestination();
            this.state.addIndex++;
        }
        this.setState({addIndex: tempAddIndex})
    }

    toggle(){
        this.setState({ collapse: !this.state.collapse});
    }

    render(){
        return (
            <div>
                <Button onClick={this.toggle} type="button" style={{backgroundColor: "000000"}} >Search for locations</Button>
                <Collapse isOpen={this.state.collapse}>
                    <Form>
                        <FormGroup>
                            <Input type="text" placeholder="Search for a destination to add to your trip" onChange={this.handleChange} />
                        </FormGroup>
                    </Form>
                    <Button className="btn text-white" type="button" style={{backgroundColor: "407157"}} onClick={this.search}>Search</Button>
                    <div id="parent">
                        <div id="div1">
                            <Table responsive><tbody>{this.renderResults()}</tbody></Table>
                        </div>
                    </div>
                    <Input type="number" placeholder="Enter the index of the location you want to add to your trip" onChange={this.handleChange2} />
                    <Button className="btn text-white" type="button" style={{backgroundColor: "407157"}} onClick={this.addDestination}>Add destination to Trip</Button>
                    <Button className="btn text-white" type="button" style={{backgroundColor: "407157"}} onClick={this.addAllDestinations}>Add all destinations to Trip</Button>
                </Collapse>
            </div>);
    }
}

export default SearchBar;