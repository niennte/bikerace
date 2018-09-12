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

                <section className="riders riders-container py-5">
                <Riders
                    hasLinks={true}
                    service={this.props.service}
                    hasMap={true}
                    onHighlight={ this.handleHighlight }
                    riders={ this.props.riders } />
                </section>

                <section className="riders riders-container pt-5" id="map">
                    <h4 className="display-4 athletic-orange text-center col-12 col-sm-6 order-1 order-sm-2">Real Time Location</h4>
                <Map
                    highlightedRider={ highlightedRider }
                    clearHighlight={ this.handleRemoveHighlight }
                    riders={ riders }
                    service={ this.props.service } />

                <RealTimeDataStream
                    onDataStreamUpdate={this.updateMapProps}
                    pubnub_creds={ pubnub_creds } />

                { show_simulator && <RealTimeSimulator
                    pubnub_creds={ pubnub_creds }
                    riders={ this.props.riders }
                />
                }
                </section>
            </Fragment>
        );
    }
}

export default RealTimeUpdates;