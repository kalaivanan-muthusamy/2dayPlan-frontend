import React from "react";
import { Container, Row, Col } from "shards-react";
import logo from '../images/logo.png'
import Footer from '../components/common/Footer'
import FrontTitle from "../components/common/FrontTitle";

class Feedback extends React.Component {

  render() {

    return (
      <React.Fragment>
        <header>
          <Container>
            <Row>
              <Col>
                <div className='brand'>
                  {<img
                    id="main-logo"
                    className="d-inline-block align-top mr-2"
                    style={{ maxWidth: "180px" }}
                    src={logo}
                    alt="2dayPlan"
                  />}
                </div>
              </Col>
            </Row>
          </Container>
        </header>
        <main>
          <FrontTitle title='Technology Stack'/>
          <Container>
            <Row>
              <Col className='pt-3'>
                <h3>Frontend - React, RESTful API</h3>
                <ul>
                  <li>axios: ^0.19.0</li>
                  <li>classnames: ^2.2.6</li>
                  <li>cross-env: ^5.2.0</li>
                  <li>moment: ^2.24.0</li>
                  <li>react: ^16.6.3</li>
                  <li>react-dom: ^16.6.3</li>
                  <li>react-router-dom: ^4.3.1</li>
                  <li>react-scripts: 2.1.1</li>
                  <li>react-toastify: ^5.2.1</li>
                  <li>shards-react: ^1.0.0</li>
                  <li>validator: ^11.0.0</li>
                </ul>
                <h3>Backend API - Node, MongoDB, JWT</h3>
                <ul>
                  <li>bcrypt: ^3.0.6</li>
                  <li>cors: ^2.8.5</li>
                  <li>express: ~4.16.1</li>
                  <li>express-jwt: ^5.3.1</li>
                  <li>express-validator: ^5.3.1</li>
                  <li>jsonwebtoken: ^8.5.1</li>
                  <li>lodash: ^4.17.11</li>
                  <li>moment: ^2.24.0</li>
                  <li>mongoose: ^5.5.12</li>
                  <li>morgan: ~1.9.1</li>
                </ul>
                <h3>Alexa - Node, AWS Lambda, RESTful API</h3>
                  <ul>
                    <li>mongoose: ^5.5.12</li>
                  </ul>
              </Col>
            </Row>
          </Container>
        </main>
        <Footer/>
      </React.Fragment>
    )
  }

}

export default Feedback;
