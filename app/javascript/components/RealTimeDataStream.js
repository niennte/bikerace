import React, { Component, Fragment } from "react";
import PubNubReact from "pubnub-react";
import Map from "./Map";
import Riders from "./Riders";


class RealTimeDataStream extends Component {
    constructor(props) {
        super(props);

        this.state = {
            riders: this.props.riders
        };

        this.running = null;

        this.pubnubListener = new PubNubReact({
            subscribeKey: this.props.pubnub_creds.subscribe_key,
            publishKey: this.props.pubnub_creds.publish_key
        });

        this.pubnubListener.init(this);
    }

    componentWillMount() {
        this.pubnubListener.subscribe({
            channels: ["channel1"],
            withPresence: true
        });

        this.pubnubListener.getMessage("channel1", (msg) => {
            console.log(msg);
            this.updateMapProps(msg.message);
        });

    }

    updateMapProps(message) {
        this.setState((prevState) => {
            let riders = this.state.riders;
            riders[(message.id - 1)]["coordinates"] = message.coordinates;
            return riders;
        });
    }

    simulator() {
        this.state.riders.forEach((rider) => {
            // give all object a small nudge Southward
            const latitude = parseFloat(rider.coordinates[1]) - 0.00025 - Math.random()/1000;
            const longitudeShift =  Math.random()/1000 - Math.random()/1000;
            const longitude = rider.coordinates[0] + longitudeShift;
            rider.coordinates = [longitude, latitude];

            const riders = this.state.riders;
            riders[(rider.properties.riderId - 1)] = rider;
            const updatedRider = {
                id: rider.properties.riderId,
                coordinates: rider.coordinates
            };
            this.pubnubListener.publish({ message: updatedRider, channel: "channel1" }, (response) => {
                console.log(response);
            });
        });
    }

    startRealTime() {
        this.running = window.setInterval(this.simulator.bind(this), 800);
    }

    stopRealTime() {
        window.clearInterval(this.running);
        this.running = null;
    }


    componentWillUnmount() {
        this.pubnub.unsubscribe({
            channels: ["channel1"]
        });
    }

    render() {
        const messages = this.pubnubListener.getMessage("channel1");
        const { riders } = this.state;
        const { service } = this.props;

        return (
            <Fragment>
                <Riders
                    onHighlight={ this.props.onHighlight }
                    riders={ riders }
                    service={ service } />

                {/*<button onClick={this.startRealTime.bind(this)}>Run simulator</button>*/}
                {/*<button onClick={this.stopRealTime.bind(this)}>Stop simulator</button>*/}

                <Map
                    highlightedRider={ this.props.highlightedRider }
                    riders={riders}
                    service={service} />
            </Fragment>
        );
    }
}

export default RealTimeDataStream;