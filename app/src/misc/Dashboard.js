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
var react_google_charts_1 = require("react-google-charts");
var utils_1 = require("../utils/utils");
var Dashboard = /** @class */ (function (_super) {
    __extends(Dashboard, _super);
    function Dashboard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            contracts: [],
            chartItems: [],
            json: null,
            csv: null
        };
        _this.chartEvents = [
            {
                eventName: 'select',
                callback: function (Chart) {
                    var company_id = this.state.contracts[Chart.chart.getSelection()[0].row].Company.Id;
                    this.props.history.push("/companies/view/" + company_id);
                },
            },
        ];
        _this.chartEvents[0].callback = _this.chartEvents[0].callback.bind(_this);
        return _this;
    }
    Dashboard.prototype.componentDidMount = function () {
        var _this = this;
        fetch("http://localhost:56871/api/Contracts", { method: 'GET' })
            .then(function (result) { return result.json(); })
            .then(function (items) { return _this.setState(function (prevState) {
            return {
                contracts: items,
                chartItems: items.map(function (item) { return [item.Company.Name, null, utils_1.makeTooltip(item), utils_1.getDateFromString(item.StartDate), utils_1.getDateFromString(item.EndDate)]; }),
                json: prevState.json,
                csv: prevState.csv
            };
        }); });
    };
    Dashboard.prototype.render = function () {
        return (React.createElement("div", { className: "container text-center" },
            React.createElement("h1", { className: "well" }, "Dashboard"),
            React.createElement("div", { className: "row" }, this.state.contracts.length > 0 ? (React.createElement(react_google_charts_1.Chart, { chartType: "Timeline", columns: [
                    { "id": "Company", "type": "string" },
                    { "id": "dummy bar label", "type": "string" },
                    { "role": "tooltip", "type": "string", "p": { "html": true } },
                    { "id": "Start", "type": "date" },
                    { "id": "End", "type": "date" },
                ], rows: this.state.chartItems, options: {
                    timeline: {
                        showRowLabels: true
                    },
                    tooltip: {
                        isHtml: true
                    }
                }, graph_id: "TimelineChart", width: "100%", height: "200px", chartEvents: this.chartEvents, chartPackages: ['timeline'] })) : (React.createElement("div", null))),
            this.state.contracts.length > 0 ? (React.createElement("div", null,
                React.createElement("h4", null, "Companies:"),
                this.state.contracts.map(function (contract) {
                    return (React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-md-4" },
                            "Company: ",
                            React.createElement("b", null, contract.Company.Name)),
                        React.createElement("div", { className: "col-md-4" },
                            "Package: ",
                            React.createElement("b", null, contract.Package.Name)),
                        React.createElement("div", { className: "col-md-4" },
                            "End date: ",
                            React.createElement("b", null, utils_1.getDateFromString(contract.EndDate).toLocaleDateString()))));
                }),
                React.createElement("br", null))) : (React.createElement("div", null))));
    };
    return Dashboard;
}(React.Component));
exports.default = Dashboard;
//# sourceMappingURL=Dashboard.js.map