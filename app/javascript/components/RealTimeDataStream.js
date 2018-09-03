import React, { Component } from "react";
import PubNubReact from "pubnub-react";

//publishKey: "pub-c-1af4bb65-f974-4304-a239-60a4755b1fcc",
//subscribeKey: "sub-c-69ceaf0c-afa4-11e8-bf00-aaab7b0b8683"

class RealTimeDataStream extends Component {
    constructor(props) {
        super(props);

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
        });

        this.pubnubListener.getStatus((st) => {
            console.log(st);
            this.publish();
        });

    }

    publish() {
        const date = new Date();
        this.pubnubListener.publish({ message: date, channel: 'channel1' }, (response) => {
            console.log(response);
        });
    }

    startRealTime() {
        this.publish();
        this.running = window.setInterval(this.publish.bind(this), 1000);
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
                <ul>
                    {messages.map((m, index) => <li key={index}>{m.message}</li>)}
                </ul>
            </div>
        );
    }
}

export default RealTimeDataStream;