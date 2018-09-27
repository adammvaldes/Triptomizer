import React, { Component } from 'react';
import {Container, Media, Table} from 'reactstrap'


class Itinerary extends Component {
    constructor(props) {
        super(props);
    }

    calculateTotalDistance() { //calculates cumulative distance between towns
        let sum = 0;
        return this.props.trip.distances.map((distance)=> {
            sum += distance;
            return <td key={'distance ' + sum}>{sum}</td>
        });

    }

    render() {

        let tripPlaces = [];
        let tripGeoLocations = [];
        let tripDistances = [];
        if(this.props.trip.distances == undefined){
            return <Container></Container>;
        }
        if (this.props.trip.places != void(0) && this.props.trip.distances.length != 0) {
            tripDistances = this.calculateTotalDistance();
            //return array of all places to print in table...
            tripPlaces = this.props.trip.places.map((place) => {
                return <td key={'place ' + place.name}>{place.name}</td>;
            });

            //return array of all geo locations in table...
            tripGeoLocations = this.props.trip.places.map((place) => {
                return <td key={'geo ' + place.latitude}>{place.latitude}, {place.longitude}</td>
            });

            return (
                <Table responsive>
                    <tbody>
                    <tr>
                        <th scope="row">Place</th>
                        {tripPlaces}
                        {tripPlaces[0]}
                    </tr>
                    <tr>
                        <th scope="row">Geographical Location</th>
                        {tripGeoLocations}
                        {tripGeoLocations[0]}
                    </tr>
                    <tr>
                        <th scope="row">Total Distance</th>
                        <td>0</td>
                        {tripDistances}
                        </tr>
                    </tbody>
                </Table>
                );
        }

        return <Container></Container>;

    }
}

export default Itinerary;
