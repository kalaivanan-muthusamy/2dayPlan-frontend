import React from "react";
import { Container, Row, Col } from "shards-react";
import logo from '../images/logo.png'

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
            <div className='bs2'></div>
            <div className='bs3'></div>
            <div className='bs4'></div>
          </Container>
        </header>
        <main className='banner'>
          <Container>
            <h1>Simple & Powerful To-Do Application <br/>
            for every day task management</h1>
            <p>Keep tracking your task in simple manager to focus on better tomorrow form today</p>
            <br/>
            <a href='/login' className='btn btn-primary'>Start Now</a>
          </Container>
        </main>
        <footer>
          <Container>
            <ul className='links'>
              <li><a href='/'>Terms & Conditions</a></li>
              <li><a href='/'>Privacy Policy</a></li>
              <li><a href='/'>Technology Stack</a></li>
              <li><a href='/'>Feedback</a></li>
            </ul>
          </Container>
        </footer>
      </React.Fragment>
    )
  }

}

export default Landing;
