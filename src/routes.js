import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout, LoginLayout } from "./layouts";

// Route Views
import ComingSoon from "./views/ComingSoon";
import Tasks from "./views/Tasks";
import Login from "./views/Login";
import Register from "./views/Register";
import Profile from "./views/Profile";


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
    path: "/register",
    layout: LoginLayout,
    component: Register
  },
  {
    path: "/tasks",
    layout: DefaultLayout,
    component: Tasks
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
    component: Profile
  }
];
