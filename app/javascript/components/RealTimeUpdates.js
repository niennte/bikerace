import React, { Component, Fragment } from "react";
import RealTimeDataStream from "./RealTimeDataStream";
import RealTimeSimulator from "./RealTimeSimulator";
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
        const { pubnub_creds, show_simulator } = this.props;
        const { highlightedRider, riders } = this.state;
        return (
            <Fragment>
                <Riders
                    onHighlight={ this.handleHighlight }
                    riders={ this.props.riders } />

                <Map
                    highlightedRider={ highlightedRider }
                    clearHighlight={ this.handleRemoveHighlight }
                    riders={ riders } />

                <RealTimeDataStream
                    onDataStreamUpdate={this.updateMapProps}
                    pubnub_creds={ pubnub_creds } />

                { show_simulator && <RealTimeSimulator
                    pubnub_creds={ pubnub_creds }
                    riders={ this.props.riders }
                />
                }
            </Fragment>
        );
    }
}

export default RealTimeUpdates;