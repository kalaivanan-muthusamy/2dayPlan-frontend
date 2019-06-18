import React from "react";
import { Container, Row, Col } from "shards-react";
import FooterLinks from './FooterLinks'
const Footer = () => {

  return (
    <footer>
      <Container>
        <Row>
          <Col md='4' sm='12' className='copyright'>
            <ul className='links'>
              <li>Copyrights © 2019 <a href='http://www.2dayPlan.com'>2dayPlan.com</a></li>
            </ul>
          </Col>
          <Col md='8' sm='12'>
            <ul className='links'>
              <FooterLinks/>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  )
};

export default Footer;
