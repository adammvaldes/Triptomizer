import React, {Component} from 'react';
import {Card, CardBody, FormGroup, Table, Collapse, InputGroup, Label, Container, Row, Col} from 'reactstrap';
import {Button, Form, Input} from 'reactstrap';
import {request} from "../../api/api";
import Info from "./Info";

class SearchBar extends Component{

    constructor(props) {
        super(props);

        this.state = {
            searchText : "",
            addIndex : "",
            searchResults : [],
            searchNumber : 0,
            filters : [],
            type : [],
            collapse : false,
            collapseFilter : false
        };
        this.search = this.search.bind(this);
        this.setSearchResults = this.setSearchResults.bind(this);
        this.handleChange  = this.handleChange.bind(this);
        this.handleChange2  = this.handleChange2.bind(this);
        this.updateSearchNumber = this.updateSearchNumber.bind(this);
        this.addDestination = this.addDestination.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);
        this.setFilters = this.setFilters.bind(this);
        this.setTypeFilters = this.setTypeFilters.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
    }

    search(){
        if(this.state.type !== null) {
            let filter = {"name": "type", "values": this.state.type};
            this.state.filters.push(filter);
        }
        let searchTFFI = {"version":4, "type":"search","match" : this.state.searchText, "places" : [], "limit": this.state.searchNumber, "filters": this.state.filters};
        if(this.props.URL === "" || this.props.port==="314") {
            request(searchTFFI, "search").then(serverResponse => {
                searchTFFI.places = serverResponse["places"];
                this.setSearchResults(searchTFFI.places);
            });
        }
        else{
            request(searchTFFI, "search",this.props.port,this.props.URL).then(serverResponse => {
                searchTFFI.places = serverResponse["places"];
                this.setSearchResults(searchTFFI.places);
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
    updateSearchNumber(number) {
        this.setState({searchNumber : number.target.value})
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

    toggle(){
        this.setState({ collapse: !this.state.collapse});
    }
    toggleFilter(){
        this.setState({ collapseFilter: !this.state.collapseFilter});
    }

    updateFilter(name, value){
        let search = this.state;
        let index = search[name].indexOf(value);
        if(index > -1){
            search[name].splice(index, 1);
        }
        else{
            search[name].push(value);
        }
        this.setState({search});
    }

    setTypeFilters(){
        return(
            <FormGroup>
                <FormGroup check inline>
                        <Input type="checkbox" onChange={(e) => this.updateFilter("type","small_airport")}/> small-sized airport
                </FormGroup>
                <FormGroup check inline>
                        <Input type="checkbox" onChange={(e) => this.updateFilter("type","medium_airport")}/> medium-sized airport
                </FormGroup>
                <FormGroup check inline>
                    <Input type="checkbox" onChange={(e) => this.updateFilter("type","large_airport")}/> large-sized airport
                </FormGroup>
                <FormGroup check inline>
                    <Input type="checkbox" onChange={(e) => this.updateFilter("type","heliport")}/> heliport
                </FormGroup>
                <FormGroup check inline>
                    <Input type="checkbox" onChange={(e) => this.updateFilter("type","balloon_port")}/> balloon port
                </FormGroup>
                <FormGroup check inline>
                    <Input type="checkbox" onChange={(e) => this.updateFilter("type","seaplane_base")}/> seaplane base
                </FormGroup>
            </FormGroup>
        );
    }

    setFilters(){
        return (
            <div>
                {this.setTypeFilters()}
            </div>
        );
    }

    render(){
        return (
            <div>
                <Button onClick={this.toggle} type="button" style={{backgroundColor: "000000"}} >Search for locations</Button>
                <Collapse isOpen={this.state.collapse}>
                    <Form>
                        <InputGroup>
                            <Input type="text" placeholder="Search for a destination to add to your trip" onChange={this.handleChange} />
                            <Input type="number" placeholder="Number of search results" onChange={this.updateSearchNumber} />
                        </InputGroup>
                        <Container>
                            <Button onClick={this.toggleFilter} type="button" style={{backgroundColor: "cea12b"}} >Filter Your Search</Button>
                            <Collapse isOpen={this.state.collapseFilter}>
                                {this.setFilters()}
                            </Collapse>
                        </Container>
                    </Form>
                    <Button className="btn text-white" type="button" style={{backgroundColor: "407157"}} onClick={this.search}>Search</Button>
                    <div id="parent">
                        <div id="div1"><Table responsive><tbody>{this.renderResults()}</tbody></Table></div>
                    </div>
                    <Input type="number" placeholder="Enter the index of the location you want to add to your trip" onChange={this.handleChange2} />
                    <Button className="btn text-white" type="button" style={{backgroundColor: "407157"}} onClick={this.addDestination}>Add destination to Trip</Button>
                </Collapse>
            </div>);
    }
}

export default SearchBar;

//<input type="checkbox" checked={this.state.val1 === true} autocomplete="off" /

//https://reactstrap.github.io/components/form/