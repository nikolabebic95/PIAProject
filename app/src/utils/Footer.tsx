import * as React from "react"

// TODO: Implement actual footer
class Footer extends React.Component<any, any> {
    public constructor(props) {
        super(props);
        this.state = {jokes: []}
    }

    private getFoodData() {
        fetch("http://localhost:3333/api/jokes/food", {method: 'GET'})
            .then(result => result.json())
            .then(items => this.setState({jokes: items}))
    }

    public componentDidMount() {
        this.getFoodData();
    }

    public render() {
        return (
            <div className="container">
                {
                    this.state.jokes.map((joke, index) => {
                        return <div className="row">
                            {joke.joke}
                        </div>
                    })
                }
            </div>
        )
    }
}

export default Footer
