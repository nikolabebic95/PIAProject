import * as React from "react"
import {Chart} from 'react-google-charts';
import {getDateFromString, makeTooltip} from "../utils/utils";

type DashboardState = {
    contracts: Contract[],
    chartItems
}

class Dashboard extends React.Component<any, DashboardState> {
    private readonly chartEvents;

    public constructor(props) {
        super(props);
        this.state = {
            contracts: [],
            chartItems: []
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
            .then(items => this.setState({
                contracts: items,
                chartItems: items.map(item => [item.Company.Name, null, makeTooltip(item), getDateFromString(item.StartDate), getDateFromString(item.EndDate)])
            }));
    }

    public render() {
        return (
            <div className="container">
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
                               height={"700px"}
                               chartEvents={this.chartEvents}
                               chartPackages={['timeline']}/>
                    ) : (
                        <div className="alert alert-info">
                            Loading...
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Dashboard
