import React from "react";
import { Container, Row, Col } from "shards-react";
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'
import Footer  from '../components/common/Footer'
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
                    for every day task management</h1><br/>
                    <p>Keep tracking your task in simple manner and just focus on what you need to complete exactly</p>
                    <Link to='/login' className='btn btn-lg btn-primary'>Start Now</Link>
                </Col>
              </Row>
              <div className='bs2'></div>
              <div className='bs3'></div>
              <div className='bs4'></div>
            </div>
          </Container>
        </main>
        <Footer/>
      </React.Fragment>
    )
  }

}

export default Landing;
