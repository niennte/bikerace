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

        // a little fun, after all the serious business:
        // add a rider staying put
        let irin = {
            coordinates: [-105.35, 40.05],
            properties: {
                riderId: 100,
                full_name: "Irin P",
                city_of_origin: "Toronto, ON"
            }
        };
        this.setState((prevState) => {
            let riders = prevState.riders;
            riders.push(irin); // yikes! how rude
            return riders;
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
        // For the demo purposes and to illustrate the behavior of the Map,
        // give all objects a gentle nudge Southward
        // with light sideways swings

        this.state.riders.forEach((rider) => {
            let latitude;
            // make one rider go North
            if( rider.properties.riderId === 100 ) {
                // small nudge Northward
                latitude = parseFloat(rider.coordinates[1]) + 0.002;
            } else {
                // small nudge Southward
                latitude = parseFloat(rider.coordinates[1]) - 0.0002;
            }
                // sideways swings
                const longitudeShift = Math.random() / 1000 - Math.random() / 1000;
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
                // publish the rider updates to the channel
                this.pubnubListener.publish({ message: updatedRider, channel: "channel1" }, (response) => {
                    console.log(response);
                });
                // update the state
                return riders;
            });
        });
    }

    startRealTime() {
        this.publish();
        this.running = window.setInterval(this.simulator.bind(this), 500);
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