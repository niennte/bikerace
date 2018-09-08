import React, { Component, Fragment } from "react";
import RealTimeDataStream from "./RealTimeDataStream"
import Riders from "./Riders";
import Map from "./Map";

class RealTimeUpdates extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { riders, service, pubnub_creds } = this.props;
        return (
            <Fragment>
                <RealTimeDataStream riders={riders} service={service} pubnub_creds={pubnub_creds}>
                    <Riders
                        riders={riders}
                        service={service} />
                </RealTimeDataStream>
            </Fragment>
        );
    }
}

export default RealTimeUpdates;