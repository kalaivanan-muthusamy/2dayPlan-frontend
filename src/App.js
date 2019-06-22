import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from "./routes";
import ScrollToTop from './ScrollToTop'

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import "./assets/custom.css";

export default () => (
  <Router onUpdate={() => { console.log('ddd'); window.scrollTo(0, 0)}} basename={process.env.REACT_APP_BASENAME || ""}>
    <div>
      <ScrollToTop>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={(props => {
                return (
                  <route.layout {...props}>
                    <route.component {...props} />
                  </route.layout>
                );
              })}
            />
          );
        })}
        </ScrollToTop>
      <ToastContainer />
    </div>
  </Router>
);
