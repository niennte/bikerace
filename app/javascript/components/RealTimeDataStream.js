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

    startRealTime() {
        this.publish();
        this.running = window.setInterval(this.publish.bind(this), 500);
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
                <button onClick={this.startRealTime.bind(this)}>Start RealTime</button>
                <button onClick={this.stopRealTime.bind(this)}>Stop RealTime</button>


                <Map
                    riders={this.state.riders}
                    service={this.props.service}
                    />
                
            </div>
        );
    }
}

export default RealTimeDataStream;