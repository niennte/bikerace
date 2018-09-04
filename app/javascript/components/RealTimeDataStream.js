import React, { Component } from "react";
import PubNubReact from "pubnub-react";
import Map from "./Map";

//publishKey: "pub-c-1af4bb65-f974-4304-a239-60a4755b1fcc",
//subscribeKey: "sub-c-69ceaf0c-afa4-11e8-bf00-aaab7b0b8683"

class RealTimeDataStream extends Component {
    constructor(props) {
        super(props);

        this.state = {
            riders: this.props.riders,
            test: {
                longitude: -105.35,
                latitude: 40
            }
        };
        console.log(this.state.riders);

        this.running = null;

        this.pubnubListener = new PubNubReact({
            subscribeKey: "sub-c-69ceaf0c-afa4-11e8-bf00-aaab7b0b8683",
            publishKey: "pub-c-1af4bb65-f974-4304-a239-60a4755b1fcc"
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

        this.pubnubListener.getStatus((st) => {
            console.log(st);
            this.publish();
        });

    }

    updateMapProps(message) {
        this.setState((prevState) => {
            let riders = this.state.riders;
            riders[(message.id - 1)]['coordinates'] = message.coordinates;
            return riders;
        });
    }

    publish() {
        const date = new Date();

        this.setState((prevState) => {
            const latitude = parseFloat(prevState.test.latitude) - 0.0002
            return {
                test: {
                    latitude: latitude,
                    longitude: prevState.test.longitude
                }
            }
        });
        const updateRider = {
            id: 1,
            coordinates: [(this.state.test.longitude), this.state.test.latitude]
        };
        this.pubnubListener.publish({ message: updateRider, channel: 'channel1' }, (response) => {
            console.log(response);
        });
    }

    simulator() {
        this.state.riders.forEach((rider) => {
            // give all object a small nudge Southward
            const latitude = parseFloat(rider.coordinates[1]) - 0.0002;
            const longitudeShift =  Math.random()/1000 - Math.random()/1000;
            const longitude = rider.coordinates[0] + longitudeShift;
            rider.coordinates = [longitude, latitude];
            this.setState((prevState) => {
                const riders = prevState.riders;
                riders[(rider.properties.riderId - 1)] = rider;

                const updatedRider = {
                    id: rider.properties.riderId,
                    coordinates: rider.coordinates
                };
                console.log(updatedRider);
                this.pubnubListener.publish({ message: updatedRider, channel: "channel1" }, (response) => {
                    console.log(response);
                });

                return riders;
            });
        });
    }

    startRealTime() {
        this.publish();
        this.running = window.setInterval(this.simulator.bind(this), 1000);
    }

    stopRealTime() {
        window.clearInterval(this.running)
        this.running = null;
    }


    componentWillUnmount() {
        this.pubnub.unsubscribe({
            channels: ["channel1"]
        });
    }

    render() {
        const messages = this.pubnubListener.getMessage("channel1");

        return (
            <div>
                <button onClick={this.startRealTime.bind(this)}>Run simulator</button>
                <button onClick={this.stopRealTime.bind(this)}>Stop simulator</button>


                <Map
                    riders={this.state.riders}
                    service={this.props.service}
                    />

            </div>
        );
    }
}

export default RealTimeDataStream;