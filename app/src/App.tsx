import * as React from "react"
import Timer = NodeJS.Timer

const logo = require("./logo.svg") as string;

type AppState = {
    date: Date;
}

class App extends React.Component<void, AppState> {
    private interval: Timer;

    public constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }

    private tick(): void {
        this.setState({ date: new Date() });
    }

    public componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    public componentWillUnmount() {
        clearInterval(this.interval);
    }

    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img height="200px" width="200px" src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    Date: {this.state.date.toLocaleTimeString()}
                </p>
            </div>
        )
    }
}

export default App
