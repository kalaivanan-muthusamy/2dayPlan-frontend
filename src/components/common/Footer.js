import React from "react";
import { Container, Row, Col } from "shards-react";
import FooterLinks from './FooterLinks'
const Footer = () => {

  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-left'>
            <ul className='copyright links'>
              <li>Copyrights © 2019 <a href='http://www.2dayPlan.com'>2dayPlan.com</a></li>
            </ul>
          </Col>
          <Col>
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
