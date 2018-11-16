import React, {Component} from 'react';
import {Container, Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
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
                    //unitName: null,
                    //unitRadius: null,
                    optimization: "none"
                },
                places: [],
                distances: [],
                map: ''
            },
            activeTab: 'Trip Plan'
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

    }

    componentWillMount() {
        if (this.state.port === "" || this.state.URL === "") {
            get_config().then(
                config => {
                    this.setState({
                        config: config
                    })
                }
            );
        }
        else {
            get_config("type", this.state.port, this.state.URL).then(
                config => {
                    this.setState({
                        config: config
                    })
                }
            );
        }
    }

    planRequest() {
        if (this.state.URL === "" || this.state.port === "314") {
            this.updateOptions('unitName', this.state.trip.options.units);
            request(this.state.trip, "plan").then(serverResponse => {
                this.updateMap(serverResponse["map"]);
                this.updateDistances(serverResponse["distances"]);
            });
        }
        else {
            this.updateOptions('unitName', this.state.trip.options.units);
            request(this.state.trip, "plan", this.state.port, this.state.URL).then(serverResponse => {
                this.updateMap(serverResponse["map"]);
                this.updateDistances(serverResponse["distances"]);
            });
        }
    }

    clearTrip() {
        let trip = this.state.trip;
        trip.places.length = 0;
        trip.distances.length = 0;
        trip.options.units = "";
        trip.options.unitName = "";
        trip.options.unitRadius = "";
        trip.options.optimization = "none";
        trip.map = "";
        this.setState(trip);
    }

    updateTrip(field, value) {
        let trip = this.state.trip;
        trip[field] = value;
        this.setState(trip);
    }

    // updateBasedOnResponse(value) {
    //   this.setState({'trip': value});
    // }

    updateOptions(option, value) {
        let trip = this.state.trip;
        trip.options[option] = value;
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
      trip.places.push(value);
      this.setState(trip);
  }

  reverseTrip(){
      let trip = this.state.trip;
      trip.places.reverse();
      this.setState(trip);
  }

  removeLeg(value){
      if(value < 0){
          return;
      }
      let trip = this.state.trip;
      trip.places.splice(value,1);
      this.setState(trip);
  }

  addLeg(leg){
      let trip = this.state.trip;
      trip.places.push(leg);
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
      this.setState(trip);
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
            <NavItem>
                <NavLink
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
            <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId={tabID}>
                    {tabContents}
                </TabPane>
            </TabContent>
        );
    }

    render() {
        if (!this.state.config) {
            return <Container/>
        }

        let tabs = ['Trip Plan', 'Distance Calculator', 'Info', 'Options'];

        let tripPlanTab = [
            <ChooseFile trip={this.state.trip} updateTFFI={this.updateTFFI} addDestination={this.addDestination}
                        addLeg={this.addLeg} updateTrip={this.updateTrip} config={this.state.config}
            />,
            <Trip trip={this.state.trip}
                  planRequest={this.planRequest}
                  clearTrip={this.clearTrip}
                  updateTFFI={this.updateTFFI}
            />,
            <Map trip={this.state.trip}/>,
            <Itinerary trip={this.state.trip}
                       removeLeg={this.removeLeg}
                       reverseTrip={this.reverseTrip}
                       setStartLeg={this.setStartLeg}
                       addDestination={this.addDestination}
                       addLeg={this.addLeg} config={this.state.config}
            />
        ];

        let infoTab = [
            <Info/>
        ];

        let optionsTab = [
            <Options options={this.state.trip.options}
                     config={this.state.config}
                     updateDistances={this.updateDistances}
                     updateOptions={this.updateOptions}
            />
        ];

        return (
            <Container id="Application">
                <Nav tabs>
                    {tabs.map((tabToRender) => {
                        return this.renderTab(tabToRender);
                    })}
                </Nav>
                {this.renderTabContents(tripPlanTab, 'Trip Plan')}
                {this.renderTabContents(infoTab, 'Info')}
                {this.renderTabContents(optionsTab, 'Options')}
                <Interop changeServer={this.changeServer} updateNumber={this.updateNumber}/>
            </Container>
        )
    }
}

export default Application;