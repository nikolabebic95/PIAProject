import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery'
import 'popper.js/dist/popper'
import 'bootstrap/dist/js/bootstrap.min'
import App from './App';
import * as Account from "./accounts/Routes";
import * as Announcements from "./announcements/Routes"
import * as Lectures from "./lectures/Routes"
import * as Companies from "./companies/Routes"
import * as Packages from "./packages/Routes"
import * as Contracts from "./contracts/Routes"
import * as Misc from "./misc/Routes"
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router} from "react-router-dom";
import {Route, Switch, Redirect} from "react-router"
import Layout from "./utils/Layout"
import PrivateRoute from "./utils/PrivateRoute";

// TODO: concat other routes
const routes = []
    .concat(Account.routes())
    .concat(Announcements.routes())
    .concat(Lectures.routes())
    .concat(Companies.routes())
    .concat(Packages.routes())
    .concat(Contracts.routes())
    .concat(Misc.routes());

const userRoutes = []
    .concat(Account.userRoutes())
    .concat(Announcements.userRoutes())
    .concat(Lectures.userRoutes())
    .concat(Companies.userRoutes())
    .concat(Packages.userRoutes())
    .concat(Contracts.userRoutes())
    .concat(Misc.userRoutes());

const managerRoutes = []
    .concat(Account.managerRoutes())
    .concat(Announcements.managerRoutes())
    .concat(Lectures.managerRoutes())
    .concat(Companies.managerRoutes())
    .concat(Packages.managerRoutes())
    .concat(Contracts.managerRoutes())
    .concat(Misc.managerRoutes());

const adminRoutes = []
    .concat(Account.adminRoutes())
    .concat(Announcements.adminRoutes())
    .concat(Lectures.adminRoutes())
    .concat(Companies.adminRoutes())
    .concat(Packages.adminRoutes())
    .concat(Contracts.adminRoutes())
    .concat(Misc.adminRoutes());

ReactDOM.render(
    <Router>
        <Layout>
            <Switch>
                <Route exact path="/" component={App}/>
                {routes.map(route => <Route exact path={route.path} component={route.component}/>)}
                {userRoutes.map(route => <Route exact path={route.path} render={() =>
                    <PrivateRoute role="u">
                        {React.createElement(route.component)}
                    </PrivateRoute>
                }/>)}
                {managerRoutes.map(route => <Route exact path={route.path} render={() =>
                    <PrivateRoute role="m">
                        {React.createElement(route.component)}
                    </PrivateRoute>
                }/>)}
                {adminRoutes.map(route => <Route exact path={route.path} render={() =>
                    <PrivateRoute role="a">
                        {React.createElement(route.component)}
                    </PrivateRoute>
                }/>)}
                <Route render={() => <Redirect to="/misc/not_found"/>}/>
            </Switch>
        </Layout>
    </Router>,
    document.getElementById("root")
);

registerServiceWorker();
