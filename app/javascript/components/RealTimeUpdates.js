import React, { Component, Fragment } from "react";
import RealTimeDataStream from "./RealTimeDataStream";
import Map from "./Map";
import Riders from "./Riders";

class RealTimeUpdates extends Component {

    constructor(props) {
        super(props);

        this.state = {
            riders: props.riders,
            highlightedRider: null
        };
        this.handleHighlight = this.handleHighlight.bind(this);
        this.handleRemoveHighlight = this.handleRemoveHighlight.bind(this);
        this.updateMapProps = this.updateMapProps.bind(this);
    }

    handleHighlight(id) {
        this.setState({
            highlightedRider: id
        })
    }

    handleRemoveHighlight() {
        this.setState({
            highlightedRider: null
        })
    }

    updateMapProps(message) {
        this.setState((prevState) => {
            let riders = this.state.riders;
            riders[(message.id - 1)]["coordinates"] = message.coordinates;
            return riders;
        });
    }

    render() {
        const { riders, service, pubnub_creds } = this.props;
        const { highlightedRider } = this.state;
        return (
            <Fragment>
                <Riders
                    onHighlight={ this.handleHighlight }
                    riders={ riders } />

                <Map
                    highlightedRider={ highlightedRider }
                    onUnHighlight={ this.handleRemoveHighlight }
                    riders={ riders } />

                <RealTimeDataStream
                    onDataStreamUpdate={this.updateMapProps}
                    pubnub_creds={ pubnub_creds }
                    riders={ riders } />
            </Fragment>
        );
    }
}

export default RealTimeUpdates;