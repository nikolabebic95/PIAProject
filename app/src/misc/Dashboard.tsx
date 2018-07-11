import * as React from "react"
import {Chart} from 'react-google-charts';
import {getDateFromString, makeTooltip} from "../utils/utils";

type DashboardState = {
    contracts: Contract[],
    chartItems,
    json: any,
    csv: any
}

class Dashboard extends React.Component<any, DashboardState> {
    private readonly chartEvents;

    public constructor(props) {
        super(props);
        this.state = {
            contracts: [],
            chartItems: [],
            json: null,
            csv: null
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
        fetch("http://localhost:56871/api/Contracts", {method: 'GET'})
            .then(result => result.json())
            .then(items => this.setState(prevState => {
                return {
                    contracts: items,
                    chartItems: items.map(item => [item.Company.Name, null, makeTooltip(item), getDateFromString(item.StartDate), getDateFromString(item.EndDate)]),
                    json: prevState.json,
                    csv: prevState.csv
                }
            }));
    }



    public render() {
        return (
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
                {
                    this.state.contracts.length > 0 ? (
                        <div>
                            <h4>Companies:</h4>
                            {
                                this.state.contracts.map(contract => {
                                    return (
                                        <div className="row">
                                            <div className="col-md-4">
                                                Company: <b>{contract.Company.Name}</b>
                                            </div>
                                            <div className="col-md-4">
                                                Package: <b>{contract.Package.Name}</b>
                                            </div>
                                            <div className="col-md-4">
                                                End
                                                date: <b>{getDateFromString(contract.EndDate).toLocaleDateString()}</b>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <br/>
                        </div>
                    ) : (<div/>)
                }
            </div>
        )
    }
}

export default Dashboard
