var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var LocalStorageUtility_1 = require("./utils/LocalStorageUtility");
var logo = require("./logo.svg");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { date: new Date() };
        return _this;
    }
    App.prototype.tick = function () {
        this.setState({ date: new Date() });
    };
    App.prototype.componentDidMount = function () {
        var _this = this;
        this.interval = setInterval(function () { return _this.tick(); }, 1000);
    };
    App.prototype.componentWillUnmount = function () {
        clearInterval(this.interval);
    };
    App.prototype.render = function () {
        return (React.createElement("div", { className: "container" },
            React.createElement("div", { className: "jumbotron" },
                React.createElement("h1", null, "Etf packages manager"),
                React.createElement("p", null, "Manage ETF with ease")),
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-md-6" },
                    React.createElement("a", { href: "/announcements/list", className: "btn btn-primary btn-block btn-info" }, "Announcements")),
                React.createElement("div", { className: "col-md-6" },
                    React.createElement("a", { href: "/lectures/list", className: "btn btn-primary btn-block btn-info" }, "Lectures"))),
            React.createElement("br", null),
            LocalStorageUtility_1.default.hasRole("u") ? (React.createElement("div", null,
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-md-3" },
                        React.createElement("a", { href: "/companies/add", className: "btn btn-primary btn-block btn-success" }, "Add company")),
                    React.createElement("div", { className: "col-md-3" },
                        React.createElement("a", { href: "/companies/list", className: "btn btn-primary btn-block btn-success" }, "Search companies")),
                    React.createElement("div", { className: "col-md-3" },
                        React.createElement("a", { href: "/announcements/add", className: "btn btn-primary btn-block btn-success" }, "Add announcement")),
                    React.createElement("div", { className: "col-md-3" },
                        React.createElement("a", { href: "/lectures/add", className: "btn btn-primary btn-block btn-success" }, "Add lecture"))),
                React.createElement("br", null))) : (React.createElement("div", null)),
            LocalStorageUtility_1.default.hasRole("m") ? (React.createElement("div", null,
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-md-12" },
                        React.createElement("a", { href: "/misc/dashboard", className: "btn btn-primary btn-block btn-warning" }, "Dashboard"))),
                React.createElement("br", null),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-md-3" },
                        React.createElement("a", { href: "/misc/add_files", className: "btn btn-primary btn-block btn-warning" }, "Add files")),
                    React.createElement("div", { className: "col-md-3" },
                        React.createElement("a", { href: "/companies/link", className: "btn btn-primary btn-block btn-warning" }, "Link company to user")),
                    React.createElement("div", { className: "col-md-3" },
                        React.createElement("a", { href: "/contracts/add_donor", className: "btn btn-primary btn-block btn-warning" }, "Add donor contract")),
                    React.createElement("div", { className: "col-md-3" },
                        React.createElement("a", { href: "/contracts/add_money", className: "btn btn-primary btn-block btn-warning" }, "Add money contract"))),
                React.createElement("br", null))) : (React.createElement("div", null)),
            LocalStorageUtility_1.default.hasRole("a") ? (React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-md-6" },
                    React.createElement("a", { href: "/accounts/approve", className: "btn btn-primary btn-block btn-danger" }, "Approve new users")),
                React.createElement("div", { className: "col-md-6" },
                    React.createElement("a", { href: "/packages/add", className: "btn btn-primary btn-block btn-danger" }, "Add new packages")))) : (React.createElement("div", null))));
    };
    return App;
}(React.Component));
exports.default = App;
//# sourceMappingURL=App.js.map