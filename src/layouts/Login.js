import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

const LoginLayout = ({ children, noNavbar, noFooter }) => (
  <Container fluid>
    <Row>
      <Col>
        {children}
      </Col>
    </Row>
  </Container>
);

LoginLayout.propTypes = {
  noNavbar: PropTypes.bool,
  noFooter: PropTypes.bool
};

LoginLayout.defaultProps = {
  noNavbar: true,
  noFooter: false
};

export default LoginLayout;
