import React from "react";
import { Navbar, NavbarBrand } from "shards-react";
import logo from '../../../images/logo.png'

class SidebarMainNavbar extends React.Component {

  render() {
    return (
      <div className="main-navbar">
        <Navbar
          className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0"
          type="light"
        >
          <NavbarBrand
            className="w-100 mr-0"
            href="#"
            style={{ lineHeight: "25px" }}
          >
            <div className="d-table m-auto">
              {<img
                id="main-logo"
                className="d-inline-block align-top mr-1"
                style={{ maxWidth: "125px" }}
                src={logo}
                alt="Shards Dashboard"
              />}
            </div>
          </NavbarBrand>
        </Navbar>
      </div>
    );
  }
}

export default SidebarMainNavbar;
