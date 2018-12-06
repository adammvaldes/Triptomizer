import React, {Component} from 'react';
import {Container, Nav, NavItem, NavLink, TabContent, TabPane, Card} from 'reactstrap';
import Info from './Info';
import Options from './Options';
import Interop from "./Interop";
import {get_config, request} from '../../api/api';
import Map from "./Map";
import Itinerary from "./Itinerary";
import Trip from "./Trip";
import SearchBar from "./SearchBar";
import OptimizationButtons from "./OptimizationButtons";
import AddByName from "./AddByName";
import ChooseFile from "./ChooseFile";
import classnames from 'classnames';
import DistanceCalculator from "./DistanceCalculator";

/* Renders the application.
 * Holds the destinations and options state shared with the trip.
 */
class Application extends Component {
    constructor(props) {
        super(props);

        this.state = {
            config: null,
            port: "",
            URL: "",
            trip: {
                type: "trip",
                version: "4",
                title: "Your Trip's Title",
                options: {
                    units: "miles",
                    unitName: undefined || '',
                    //unitRadius: null,
                    optimization: "none"
                },
                places: [],
                distances: [],
                map: ''
            },
            activeTab: 'Trip Plan',
            displayedAttributes : []
        };
        this.planRequest = this.planRequest.bind(this);
        this.clearTrip = this.clearTrip.bind(this);
        this.updateTrip = this.updateTrip.bind(this);
        this.updateOptions = this.updateOptions.bind(this);
        this.updateMap = this.updateMap.bind(this);
        this.updateTFFI = this.updateTFFI.bind(this);
        this.updateDistances = this.updateDistances.bind(this);

        this.updateNumber = this.updateNumber.bind(this);
        this.changeServer = this.changeServer.bind(this);

        this.addDestination = this.addDestination.bind(this);
        this.reverseTrip = this.reverseTrip.bind(this);
        this.removeLeg = this.removeLeg.bind(this);
        this.addLeg = this.addLeg.bind(this);
        this.setStartLeg = this.setStartLeg.bind(this);

        this.toggleTab = this.toggleTab.bind(this);
        this.saveMap = this.saveMap.bind(this);
        this.saveTrip = this.saveTrip.bind(this);
        this.setDisplayedAttributes = this.setDisplayedAttributes.bind(this);
        this.updateTable = this.updateTable.bind(this);

    }

    componentWillMount() {
        if (this.state.port === "" || this.state.URL === "") {
            get_config().then(
                config => {
                    this.setState({ config: config });
                    this.setDisplayedAttributes();
                }
            );
        }
        else {
            get_config("type", this.state.port, this.state.URL).then(
                config => {
                    this.setState({ config: config });
                    this.setDisplayedAttributes();
                }
            );
        }
    }
    setDisplayedAttributes() {
        let attributes = [];
        for(let i = 0; i < this.state.config.attributes.length; i++){
            if(this.state.config.attributes[i] === "name" ||
                this.state.config.attributes[i] === "latitude" || this.state.config.attributes[i] === "longitude"){
                attributes.push([this.state.config.attributes[i], "true"]);
            }
            else{attributes.push([this.state.config.attributes[i], "false"]);}
        }
        this.setState({ displayedAttributes : attributes });
    }

    updateTable(attributes){
        this.setState({ displayedAttributes : attributes });
    }

    planRequest() {
        //checks if trip size will take >25 seconds to calculate on current optimization(1600 for short(nearest neighbor), 90 for shorter(2-opt)
        if((this.state.trip.options.optimization === "short" && this.state.trip.places.length > 1600) || (this.state.trip.options.optimization === "shorter" && this.state.trip.places.length > 900)){
            return(
                alert("Your trip of length " + this.state.trip.places.length + " was too large for the " + this.state.trip.options.optimization + " optimization"));
        }
        if (this.state.URL === "" || this.state.port === "314") {
            this.updateOptions('unitName', this.state.trip.options.units);
            request(this.state.trip, "plan").then(serverResponse => {
                this.updateMap(serverResponse["map"]);
                this.updateDistances(serverResponse["distances"]);
                this.updatePlaces(serverResponse["places"]);
            });
        }
        else {
            this.updateOptions('unitName', this.state.trip.options.units);
            request(this.state.trip, "plan", this.state.port, this.state.URL).then(serverResponse => {
                this.updateMap(serverResponse["map"]);
                this.updateDistances(serverResponse["distances"]);
                this.updatePlaces(serverResponse["places"]);
            });
        }
    }

    clearTrip() {
        let trip = this.state.trip;
        trip.places.length = 0;
        trip.distances.length = 0;
        trip.options.units = "miles";
        trip.options.unitName = "";
        trip.options.unitRadius = "3959";
        trip.options.optimization = "none";
        trip.map = "";
        this.setState(trip);
    }

    updateTrip(field, value) {
        let trip = this.state.trip;
        trip[field] = value;
        this.setState(trip);
    }

    updateOptions(option, value) {
        let trip = this.state.trip;
        trip.options[option] = value;
        this.setState(trip);
    }

    updatePlaces(value){
        let trip = this.state.trip;
        trip.places = value;
        this.setState(trip);
    }
    //Functions to update the state in the Trip Class
    updateMap(value) {
        let trip = this.state.trip;
        trip.map = value;
        this.setState(trip);
    }

    updateDistances(value) {
        let trip = this.state.trip;
        trip.distances = value;
        this.setState(trip);
    }

    updateTFFI(value) {
        if(value.distances === undefined){
            value.distances = [];
        }
        if(value.options === undefined){
            value.options = {
                units: "miles",
                optimization: "none"
            };
        }
        if(value.options.units === undefined){
            value.options.units = "miles";
        }
        if(value.options.optimization === undefined){
            value.options.optimization = "none";
        }
        this.setState({'trip': value});
    }

    //Function to update the server for Interoperation of teams
    updateNumber(value) {
        this.setState({
            port: value
        });
        this.componentWillMount();
    }

    changeServer(value) {
        this.setState({
            URL: value
        });
        this.componentWillMount();
    }

  addDestination(value){
      let trip = this.state.trip;
      if(trip.places[trip.places.length-1] !== value){
          trip.places.push(value);
          trip.distances = [];
          this.setState(trip);
      }
  }

  reverseTrip(){
      let trip = this.state.trip;
      trip.places.reverse();
      trip.distances = [];
      this.setState(trip);
  }

  removeLeg(value){
      if(value < 0){
          return;
      }
      let trip = this.state.trip;
      trip.places.splice(value,1);
      trip.distances = [];
      this.setState(trip);
  }

  addLeg(leg){
      let trip = this.state.trip;
      trip.places.push(leg);
      trip.distances = [];
      this.setState(trip);
  }
  setStartLeg(value){
      if(value <= 0 || value >= this.state.trip.places.length){
          return;
      }
      let trip = this.state.trip;
      let temp = trip.places[value];
      trip.places.splice(value, 1);
      trip.places.splice(0, 0, temp);
      trip.distances = [];
      this.setState(trip);
  }

    saveMap(){
        let userMap = this.state.trip.map;
        let userTitle = "Map";
        userTitle += ".svg";

        if (window.navigator.msSaveBlob) {
            let blob = new Blob([userMap], {type: 'svg'});
            window.navigator.msSaveBlob(blob, userTitle);
        }
        else{
            let link = document.createElement('a');
            let content = userMap;
            let uriScheme = ['data:','svg',','].join('');
            link.href = uriScheme + content;
            link.download = userTitle;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
    saveTrip(){
        let userVersion = this.state.trip.version;
        let userType = this.state.trip.type;
        let userTitle = this.state.trip.title;
        let userPlaces = this.state.trip.places;
        let userDistances = this.state.trip.distances;
        let userOptions = this.state.trip.options;

        let userObject = {version: userVersion, type: userType, title: userTitle, options: userOptions, places:userPlaces, distances:userDistances};
        let json = JSON.stringify(userObject);

        userTitle += '.json';

        if (window.navigator.msSaveBlob) {
            let blob = new Blob([json], {type: 'json'});
            window.navigator.msSaveBlob(blob, userTitle);
        }
        else{
            let link = document.createElement('a');
            let content = json;
            let uriScheme = ['data:','json',','].join('');
            link.href = uriScheme + content;
            link.download = userTitle;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    toggleTab(tabID) {
        if (this.state.activeTab !== tabID) {
            this.setState({
                activeTab: tabID
            });
        }
    }

    renderTab(tabID) {
        return (
            <NavItem key={tabID}>
                <NavLink key={tabID}
                    className={classnames({active: this.state.activeTab === tabID})}
                    onClick={() => {
                        this.toggleTab(tabID);
                    }}
                >
                    {tabID}
                </NavLink>
            </NavItem>
        );
    }

    renderTabContents(tabContents, tabID) {
        return (
            <TabContent key={tabID} activeTab={this.state.activeTab}>
                <TabPane key={tabID} tabId={tabID}>
                    {tabContents}
                </TabPane>
            </TabContent>
        );
    }

    render() {
        if (!this.state.config) {
            return <Container/>
        }

        let tabs = ['Trip Plan', 'Options', 'Distance Calculator', 'About Us'];

        let tripPlanTab = [
            <ChooseFile key="cfkey" trip={this.state.trip} updateTFFI={this.updateTFFI} addDestination={this.addDestination}
                        updateTrip={this.updateTrip} config={this.state.config}
            />,
            <Trip key="tkey" trip={this.state.trip}
                  planRequest={this.planRequest}
                  clearTrip={this.clearTrip}
                  updateTFFI={this.updateTFFI}
            />,
            <Map key="mkey" trip={this.state.trip}/>,
            <Itinerary key="itinkey" trip={this.state.trip}
                       removeLeg={this.removeLeg}
                       reverseTrip={this.reverseTrip}
                       setStartLeg={this.setStartLeg}
                       addDestination={this.addDestination}
                       addLeg={this.addLeg} config={this.state.config}
                       saveMap={this.saveMap} saveTrip={this.saveTrip}
                       updateTable={this.updateTable} displayedAttributes={this.state.displayedAttributes}
            />
        ];

        let optionsTab = [
            <Options key="okey" options={this.state.trip.options}
                     config={this.state.config}
                     updateDistances={this.updateDistances}
                     updateOptions={this.updateOptions}
            />,<Interop key="intkey" changeServer={this.changeServer} updateNumber={this.updateNumber}/>
        ];

        let distanceCalculatorTab = [
            <DistanceCalculator key="dkey" trip={this.state.trip} URL={this.state.URL} port={this.state.port} options={this.state.trip.options}/>
        ];

        let infoTab = [
            <Info key="infkey"/>
        ];

        return (
            <Container id="Application">
                <Nav tabs key="2">
                    {tabs.map((tabToRender) => {
                        return this.renderTab(tabToRender);
                    })}
                </Nav>
                {this.renderTabContents(tripPlanTab, 'Trip Plan')}
                {this.renderTabContents(optionsTab, 'Options')}
                {this.renderTabContents(distanceCalculatorTab, 'Distance Calculator')}
                {this.renderTabContents(infoTab, 'About Us')}
            </Container>
        )
    }
}

export default Application;