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
        const trip = this.props.trip;

        let tripPlaces = [];
        let tripGeoLocations = [];
        let tripDistances = [];

        if (trip.distances !== undefined && trip.distances.length !== 0 && trip.places !== undefined) {
            tripDistances = this.calculateTotalDistance();
            //return array of all places to print in table...
            tripPlaces = trip.places.map((place) => {
                return <td key={'place ' + place.name}>{place.name}</td>;
            });

            //return array of all geo locations in table...
            tripGeoLocations = trip.places.map((place) => {
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
                        <th scope="row">Total Distance, {trip.options.unitName }</th>
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
