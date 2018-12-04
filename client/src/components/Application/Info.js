import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Col, Row, Media} from 'reactstrap'
import EJ from '../resources/EJPic.png';

export default class Info extends Component {
  render() {
    let img = <img height="150" src={EJ} alt="EJ's picture"/>;
    return (
      <div>
        <Card>
          <CardBody>
              <h1 align="center"> The Spaghetti Coders </h1>
            <Media>
              <Media body>
                <Col xs="3">
                  {img}
                    <Media heading>
                        Edward(EJ) Lee
                    </Media>
                  <Row> 4th Year </Row> <Row> Major: Computer Science </Row> <Row> Favorite Language: C++ </Row>
                    <Row> Weakness: Cheese </Row> <Row> Smash Bros. Main: Pokemon Trainer </Row>
                </Col>
              </Media>
            </Media>
          </CardBody>
        </Card>
      </div>
    )
  }
}
//https://getavataaars.com/?accessoriesType=Prescription02&clotheColor=Black&clotheType=Hoodie&eyeType=Surprised&eyebrowType=UpDown&facialHairColor=Black&facialHairType=Blank&hairColor=Black&mouthType=Serious&skinColor=DarkBrown&topType=ShortHairTheCaesar
/*
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
 */