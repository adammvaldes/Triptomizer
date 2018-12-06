import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Col, Row, Media} from 'reactstrap'
import EJ from '../resources/EJPic.png';
import Vlad from '../resources/Vlad.png';
import Adam from '../resources/AdamPic.png';
export default class Info extends Component {
  render() {
    let imgEJ = <img height="150" src={EJ} alt="EJ's picture"/>;
    let imgVlad = <img height={"150"} src={Vlad} alt={"Vlad's picture"}/>;
    let imgAdam = <img height={"150"} src={Adam} alt={"Adam's picture"}/>;
    return (
        <Card>
          <CardBody>
              <h1 align="center"> The Spaghetti Coders </h1>
            <Media>
              <Media body>
                  <Row>
                      <Col xs="3">
                          {imgEJ}
                          <Media heading>
                              Edward(EJ) Lee
                          </Media>
                      </Col>
                      <Col xs={"3"}>
                          {imgVlad}
                          <Media heading>
                              Vlad Stepanuga
                          </Media>
                      </Col>
                      <Col xs={"3"}>
                          {imgAdam}
                          <Media heading>
                              Adam Valdes
                          </Media>
                      </Col>
                  </Row>
                  <Row>
                      <Col xs={"3"}>
                          4th Year <br/>
                          Major: Computer Science <br/>
                          Favorite Language: C++ <br/>
                          Weakness: Cheese <br/>
                          Smash Bros Main: Pokemon Trainer <br/>
                      </Col>
                      <Col xs={"3"}>
                          3rd Year <br/>
                          Major: Computer Science <br/>
                          Favorite Language: C# <br/>
                          Weakness: Good TV Shows <br/>
                          Favorite Tank:
                          <a href={"https://pp.userapi.com/c836322/v836322938/50ad4/cEAClbspE5M.jpg"}>
                               Batignolles-Chatillon Char 25T
                          </a>
                      </Col>
                      <Col xs={"3"}>
                          Transfer Student <br/>
                          Major: Computer Science <br/>
                          Favorite Language: C++ <br/>
                          Weakness: Sunlight <br/>
                          Smash Bros Main: Luigi <br/>
                      </Col>
                  </Row>
              </Media>
            </Media>
          </CardBody>
        </Card>
    )
  }
}
//https://getavataaars.com/?accessoriesType=Prescription02&clotheColor=Black&clotheType=Hoodie&eyeType=Surprised&eyebrowType=UpDown&facialHairColor=Black&facialHairType=Blank&hairColor=Black&mouthType=Serious&skinColor=DarkBrown&topType=ShortHairTheCaesar