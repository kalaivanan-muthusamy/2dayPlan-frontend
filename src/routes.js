import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout, LoginLayout } from "./layouts";

// Route Views
import ComingSoon from "./views/ComingSoon";
import Task from "./views/Task";
import Login from "./views/Login";


export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/login" />
  },
  {
    path: "/login",
    layout: LoginLayout,
    component: Login
  },
  {
    path: "/task",
    layout: DefaultLayout,
    component: Task
  },
  {
    path: "/calender",
    layout: DefaultLayout,
    component: ComingSoon
  },
  {
    path: "/contacts",
    layout: DefaultLayout,
    component: ComingSoon
  },
  {
    path: "/profile",
    layout: DefaultLayout,
    component: ComingSoon
  }
];
