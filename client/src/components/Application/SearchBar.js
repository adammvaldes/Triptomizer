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
            addIndex : "0",
            searchResults : [],
            foundNumber : 0,
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
        this.addAllDestinations = this.addAllDestinations.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);
        this.setFilters = this.setFilters.bind(this);
        this.setTypeFilters = this.setTypeFilters.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
    }

    search(){
        if(this.state.type.length !== 0) {
            let filter = {"name": "type", "values": this.state.type};
            this.state.filters.push(filter);
        }
        let searchTFFI;
        if(this.state.filters.length === 0){
            searchTFFI = {"version":4, "type":"search","match" : this.state.searchText, "places" : [], "limit": this.state.searchNumber};
        }
        else{
            searchTFFI = {"version":4, "type":"search","match" : this.state.searchText, "places" : [], "limit": this.state.searchNumber, "filters": this.state.filters};
        }
        if(this.props.URL === "" || this.props.port==="314") {
            request(searchTFFI, "search").then(serverResponse => {
                searchTFFI.places = serverResponse["places"];
                this.state.foundNumber = serverResponse["found"];
                this.setSearchResults(searchTFFI.places);
            });
        }
        else{
            request(searchTFFI, "search",this.props.port,this.props.URL).then(serverResponse => {
                searchTFFI.places = serverResponse["places"];
                this.state.foundNumber = serverResponse["found"];
                this.setSearchResults(searchTFFI.places);
            });
        }
        for(let i = 0; i < this.state.filters.length; i++){
            this.state.filters.pop();
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

    renderFoundNumbers(){
        if(typeof this.state.searchResults !== 'undefined' && this.state.searchResults.length !== 0){
            return(
                <div>
                    Displaying {this.state.searchResults.length} of {this.state.foundNumber} results:
                </div>
            );
        }
    }

    renderResults(){
        if(typeof this.state.searchResults !== 'undefined'){
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
    toggleFilter(){
        this.setState({ collapseFilter: !this.state.collapseFilter});
    }

    updateFilter(name, value){
        let search = this.state;
        let index = search[name].indexOf(value.filter);
        if(index > -1){
            search[name].splice(index, 1);
        }
        else{
            search[name].push(value.filter);
        }
        this.setState({search});
    }

    setTypeFilters(){
        if(this.props.config.filters!==undefined) {
            let filters = [];
            for (let i = 0; i < this.props.config.filters.length; i++) {
                let f = [];
                f.push(this.props.config.filters[i]);
                let name = f[0].name;
                filters.push(<div key={name}> {name.charAt(0).toUpperCase() + name.slice(1) + ":"} </div>);
                const values = f[0].values.map((filter) =>
                    (<FormGroup key={"Group_" + filter} check inline>
                        <Input key={"filter_" + filter} type="checkbox"
                               onChange={(e) => this.updateFilter(f[0].name, {filter})}/> {filter.replace("_", " ")}
                    </FormGroup>)
                );
                filters.push(values);
            }
            return (
                <FormGroup> {filters} </FormGroup>
            )
        }
        return <FormGroup> </FormGroup>
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
                    <div id="grandparent">
                        {this.renderFoundNumbers()}
                    </div>
                    <div id="parent">
                        <div id="div1"><Table responsive><tbody>{this.renderResults()}</tbody></Table></div>
                    </div>
                    <Input type="number" placeholder="Enter the index of the location you want to add to your trip" onChange={this.handleChange2} />
                    <Button className="btn text-white" type="button" style={{backgroundColor: "407157"}} onClick={this.addDestination}>Add destination to Trip</Button>
                    <Button className="btn text-white" type="button" style={{backgroundColor: "407157"}} onClick={this.addAllDestinations}>Add all destinations to Trip</Button>
                </Collapse>
            </div>);
    }
}

export default SearchBar;

//<input type="checkbox" checked={this.state.val1 === true} autocomplete="off"

//https://reactstrap.github.io/components/form/