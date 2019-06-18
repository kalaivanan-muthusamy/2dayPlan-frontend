// Layout Types
import { DefaultLayout, LoginLayout, Fluid } from "./layouts";

// Route Views
import ComingSoon from "./views/ComingSoon";
import Tasks from "./views/Tasks";
import Login from "./views/Login";
import Register from "./views/Register";
import Profile from "./views/Profile";
import Landing from "./views/Landing";
import TermsAndContiions from "./views/TermsAndConditions";
import PrivacyPolicy from "./views/PrivacyPolicy";
import Feedback from "./views/Feedback";
import TechnologyStack from "./views/TechnologyStack";

export default [
  {
    path: "/",
    exact: true,
    layout: Fluid,
    component: Landing
  },
  {
    path: "/terms-and-conditions",
    exact: true,
    layout: Fluid,
    component: TermsAndContiions
  },
  {
    path: "/privacy-policy",
    exact: true,
    layout: Fluid,
    component: PrivacyPolicy
  },
  {
    path: "/feedback",
    exact: true,
    layout: Fluid,
    component: Feedback
  },
  {
    path: "/technology-stack",
    exact: true,
    layout: Fluid,
    component: TechnologyStack
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
