import React from "react";
import { Container, Row, Col } from "shards-react";
import logo from '../images/logo.png'
import FooterLinks from '../components/common/FooterLinks'

class Landing extends React.Component {

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
            <div className='bs1'></div>
          </Container>
        </header>
        <main className='banner'>
          <Container>
            <div style={{ position: 'relative' }}>
              <Row>
                <Col md='6' xs='12' sm='12'>
                    <h1>Simple & Powerful To-Do Application
                    for every day task management</h1>
                    <p>Keep tracking your task in simple manner and just focus on what you need to complete exactly</p>
                    <a href='/login' className='btn btn-primary'>Start Now</a>
                </Col>
              </Row>
              <div className='bs2'></div>
              <div className='bs3'></div>
              <div className='bs4'></div>
            </div>
          </Container>
        </main>
        <footer>
          <Container>
            <ul className='links'>
              <FooterLinks/>
            </ul>
          </Container>
        </footer>
      </React.Fragment>
    )
  }

}

export default Landing;
