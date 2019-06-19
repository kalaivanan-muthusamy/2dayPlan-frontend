import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Navbar, Row, Col } from "shards-react";
import NavbarNav from "./NavbarNav/NavbarNav";
import logo from '../../../images/icon.svg'

const MainNavbar = ({ layout, stickyTop }) => {
  const classes = classNames(
    "main-navbar",
    "bg-white",
    stickyTop && "sticky-top"
  );

  return (
    <div className={classes}>
      <Row className='m-0'>
        <Col>
          <div style={{ height: '100%' }} className='d-flex align-items-center d-md-none'>
            {<img
              style={{ maxWidth: "35px" }}
              src={logo}
              alt="2dayPlan Logo"
            />}
          </div>
        </Col>
        <Col>
          <Navbar type="light" className="justify-content-end p-0">
            <NavbarNav />
          </Navbar>
        </Col>
      </Row>
    </div>
  )
}

MainNavbar.propTypes = {
  layout: PropTypes.string,
  stickyTop: PropTypes.bool
};

MainNavbar.defaultProps = {
  stickyTop: true
};

export default MainNavbar;
