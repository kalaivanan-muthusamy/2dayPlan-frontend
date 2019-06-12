import React from "react";
import { Container } from "shards-react";

const Fluid = ({ children }) => (
  <Container fluid style={{ padding: 0 }}>
    {children}
  </Container>
);


export default Fluid;
