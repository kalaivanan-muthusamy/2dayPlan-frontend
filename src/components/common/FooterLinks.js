import React from "react";
import { Link } from "react-router-dom";
const FooterLinks = () => {

  return (
    <React.Fragment>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/terms-and-conditions'>Terms & Conditions</Link></li>
      <li><Link to='/privacy-policy'>Privacy Policy</Link></li>
      <li><Link to='/technology-stack'>Technology Stack</Link></li>
      <li><Link to='/feedback'>Feedback</Link></li>
    </React.Fragment>
  )
};

export default FooterLinks;
