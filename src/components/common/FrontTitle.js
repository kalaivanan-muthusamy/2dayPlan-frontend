import React from "react";
import { Container, Row, Col } from "shards-react";
import LogoWhite from '../../images/logo-white.png'

const FrontTitle = ({ title }) => {

  return (
    <div className='front-title'>
      <Container>
        <Row>
          <Col>
            <div className=''>
              <h1 className='h3'>{title}</h1>
            </div>
          </Col>
          <Col>
            <div className='icon'>
              <img className='img-fluid' alt='' src={LogoWhite}/>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
};

export default FrontTitle;
