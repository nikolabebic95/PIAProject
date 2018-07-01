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
        return (React.createElement("div", { className: "App" },
            React.createElement("header", { className: "App-header" },
                React.createElement("img", { height: "200px", width: "200px", src: logo, className: "App-logo", alt: "logo" }),
                React.createElement("h1", { className: "App-title" }, "Welcome to React")),
            React.createElement("p", { className: "App-intro" },
                "Date: ",
                this.state.date.toLocaleTimeString())));
    };
    return App;
}(React.Component));
exports.default = App;
//# sourceMappingURL=App.js.map