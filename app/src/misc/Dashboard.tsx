import * as React from "react"
import {Chart} from 'react-google-charts';
import {getDateFromString, makeTooltip} from "../utils/utils";

type DashboardState = {
    contracts: Contract[],
    chartItems,
    past: Contract[]
}

class Dashboard extends React.Component<any, DashboardState> {
    private readonly chartEvents;

    public constructor(props) {
        super(props);
        this.state = {
            contracts: [],
            chartItems: [],
            past: []
        };

        this.chartEvents = [
            {
                eventName: 'select',
                callback(Chart) {
                    let company_id = this.state.contracts[Chart.chart.getSelection()[0].row].Company.Id;
                    this.props.history.push("/companies/view/" + company_id);
                },
            },
        ];

        this.chartEvents[0].callback = this.chartEvents[0].callback.bind(this);
    }

    public componentDidMount() {
        fetch("http://localhost:56871/api/Contracts?future=true", {method: 'GET'})
            .then(result => result.json())
            .then(items => this.setState(prevState => {
                return {
                    contracts: items,
                    chartItems: items.map(item => [item.Company.Name, null, makeTooltip(item), getDateFromString(item.StartDate), getDateFromString(item.EndDate)]),
                    past: prevState.past
                }
            }));

        fetch("http://localhost:56871/api/Contracts?future=false", {method: 'GET'})
            .then(result => result.json())
            .then(items => this.setState(prevState => {
                return {
                    contracts: prevState.contracts,
                    chartItems: prevState.chartItems,
                    past: items
                }
            }));
    }


    public render() {
        return (
            <div>
                <div className="container text-center">
                    <h1 className="well">Dashboard</h1>
                    <div className="row">
                        {
                            this.state.contracts.length > 0 ? (
                                <Chart chartType="Timeline"
                                       columns={
                                           [
                                               {"id": "Company", "type": "string"},
                                               {"id": "dummy bar label", "type": "string"},
                                               {"role": "tooltip", "type": "string", "p": {"html": true}},
                                               {"id": "Start", "type": "date"},
                                               {"id": "End", "type": "date"},
                                           ]
                                       }
                                       rows={this.state.chartItems}
                                       options={
                                           {
                                               timeline: {
                                                   showRowLabels: true
                                               },
                                               tooltip: {
                                                   isHtml: true
                                               }
                                           }
                                       }
                                       graph_id="TimelineChart"
                                       width={"100%"}
                                       height={"200px"}
                                       chartEvents={this.chartEvents}
                                       chartPackages={['timeline']}/>
                            ) : (<div/>)
                        }
                    </div>
                </div>
                {
                    this.state.contracts.length > 0 ? (
                        <div className="container text-center">
                            <table className="table table-fixed">
                                <thead>
                                <th>
                                    Company
                                </th>
                                <th>
                                    Package
                                </th>
                                <th>
                                    End date
                                </th>
                                </thead>
                                <tbody>
                                {
                                    this.state.contracts.map(contract => {
                                        return (
                                            <tr>
                                                <td>
                                                    {contract.Company.Name.trim()}
                                                </td>
                                                <td>
                                                    {contract.Package.Name.trim()}
                                                </td>
                                                <td>
                                                    End
                                                    date: {getDateFromString(contract.EndDate).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                            <br/>
                        </div>
                    ) : (<div/>)
                }
                {
                    this.state.past.length > 0 ? (
                        <div className="container text-center">
                            <h4 className="text-center well">Past contracts</h4>
                            <table className="table table-fixed">
                                <thead>
                                <th>
                                    Company
                                </th>
                                <th>
                                    Package
                                </th>
                                <th>
                                    End date
                                </th>
                                </thead>
                                <tbody>
                                {
                                    this.state.past.map(contract => {
                                        return (
                                            <tr>
                                                <td>
                                                    {contract.Company.Name.trim()}
                                                </td>
                                                <td>
                                                    {contract.Package.Name.trim()}
                                                </td>
                                                <td>
                                                    End
                                                    date: {getDateFromString(contract.EndDate).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                            <br/>
                        </div>
                    ) : (<div/>)
                }
            </div>
        )
    }
}

export default Dashboard
