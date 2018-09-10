import React, { Component, Fragment } from "react";
import PubNubReact from "pubnub-react";


class RealTimeDataStream extends Component {
    constructor(props) {
        super(props);

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
        this.props.onDataStreamUpdate(message);
    }

    componentWillUnmount() {
        this.pubnubListener.unsubscribe({
            channels: ["channel1"]
        });
    }

    render() {
        return (
            null
        );
    }
}

export default RealTimeDataStream;