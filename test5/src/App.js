import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter
} from "react-router-dom";
import routes from "./config/routes";
import { Menu } from "./components/Menu";

// const Login = lazy(() => import("./pages/Login"));
// const Dashboard = lazy(() => import("./pages/Dashboard"));
// const Setting = lazy(() => import("./pages/Setting"));
// const Functions = lazy(() => import("./pages/Functions"));
// const FunctionFoo = lazy(() => import("./pages/FunctionFoo"));
// const PageNotFound = lazy(() => import("./pages/PageNotFound"));

// const RouteLoginp = withRouter(Login);
const RouteMenup = withRouter(Menu);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return localStorage.getItem("token") ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
        // props.history.goBack()
      );
    }}
  />
);

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      console.log("PublicRoute :", rest);
      console.log("PublicRoute props :", props);
      return localStorage.getItem("token") && rest.path !== "*" ? (
        <Redirect to="/dashboard" />
      ) : (
        <Component {...props} />
      );
    }}
  />
);

function App() {
  return (
    <div>
      <Router>
        <RouteMenup />
        <Suspense fallback={<div>loading...</div>}>
          <Switch>
            {routes.map((config, i) => {
              console.count("import compoment");
              const component = lazy(() =>
                import(`./pages/${config.component}`)
              );

              return config.isProtected ? (
                <PrivateRoute
                  key={"routes" + i}
                  exact
                  path={config.path}
                  component={component}
                />
              ) : (
                <PublicRoute
                  key={"routes" + i}
                  exact
                  path={config.path}
                  component={component}
                />
              );
            })}
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
  // return (
  // <Suspense fallback={<span>Loading...</span>}>
  //   <Router>
  //     <RouteMenup />
  //     <Switch>
  //       <Route exact path={"/login"} component={RouteLoginp} />

  //       <PrivateRoute exact path="/dashboard" component={Dashboard} />
  //       <PrivateRoute exact path="/" component={Dashboard} />
  //       <PrivateRoute exact path="/setting" component={Setting} />
  //       <PrivateRoute exact path="/functions" component={Functions} />
  //       <PrivateRoute exact path="/functions/foo" component={FunctionFoo} />
  //       <Route exact path="*" component={PageNotFound} />
  //     </Switch>
  //   </Router>
  // </Suspense>
  // );
}

export default App;
