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
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Layout from "./utils/Layout"

// TODO: concat other routes
const routes = []
    .concat(Account.routes())
    .concat(Announcements.routes())
    .concat(Lectures.routes())
    .concat(Companies.routes())
    .concat(Packages.routes())
    .concat(Contracts.routes());

ReactDOM.render(
    <Router>
        <Layout>
            <Switch>
                <Route exact path="/" component={App}/>
                {routes.map(route => <Route path={route.path} component={route.component}/>)}
            </Switch>
        </Layout>
    </Router>,
    document.getElementById("root")
);

registerServiceWorker();
