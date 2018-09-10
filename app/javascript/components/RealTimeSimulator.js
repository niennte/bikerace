import React, { Component, Fragment } from "react";
import PubNubReact from "pubnub-react";


class RealTimeSimulator extends Component {
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
        this.pubnubListener.unsubscribe({
            channels: ["channel1"]
        });
    }

    render() {
        return (
            <Fragment>
                <nav className="nav justify-content-around actions">
                    <button className="btn btn-light" onClick={this.startRealTime.bind(this)}>Run simulator</button>
                    <button className="btn btn-light" onClick={this.stopRealTime.bind(this)}>Stop simulator</button>
                </nav>
            </Fragment>
        );
    }
}

export default RealTimeSimulator;