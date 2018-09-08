import React, { Component, Fragment } from "react";
import RealTimeDataStream from "./RealTimeDataStream"

class RealTimeUpdates extends Component {

    constructor(props) {
        super(props);

        this.state = {
            highlightedRider: null
        };
        this.handleHighlight = this.handleHighlight.bind(this);
    }

    handleHighlight(id) {
        this.setState({
            highlightedRider: id
        })
    }

    render() {
        const { riders, service, pubnub_creds } = this.props;
        const { highlightedRider } = this.state;
        return (
            <Fragment>
                <RealTimeDataStream
                    highlightedRider={ highlightedRider }
                    onHighlight={this.handleHighlight}
                    riders={ riders }
                    service={ service }
                    pubnub_creds={ pubnub_creds } />
            </Fragment>
        );
    }
}

export default RealTimeUpdates;