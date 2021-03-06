import React from "react"
import styled from "styled-components";
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";

const token = "pk.eyJ1Ijoibmllbm50ZSIsImEiOiJjamo0ajE5aDgxajJhM2twZzB4cWRxNXFzIn0.wrH52IDoERpZGasQNOjUXg";

const styles = {
    style: "mapbox://styles/niennte/cjl5jp5tg3l8p2tqfr5v2eqig",
    containerStyle: {
        height: "80vh",
        width: "100%"
    }
};

const layerLayoutOptions = {
    "icon-image": "bike-racer",
    "icon-allow-overlap": true,
    "text-field": "{riderId}",
    "text-size": 10,
    "text-offset": [0, 0.6],
    "text-allow-overlap": true
};

const layerPaintOptions = {
    "text-color": "#ff601f"
};

const StyledPopup = styled.div`
  background: white;
  color: #3f618c;
  font-weight: 400;
  padding: 5px;
  border-radius: 2px;
`;

const StyledButton = styled.button`
    position: absolute;
    right: -11px;
    top: -10px;
    padding: 2px 9px;
`;


const Mapbox = ReactMapboxGl({
    accessToken: token,
    scrollZoom: false
});


class Map extends React.Component {

    constructor(props) {
        super(props);
        this.SERVICE_PATH = props.service;

        let riders = props.riders;

        this.state = {
            rider: null, // the Popup
            riders: riders,
            mapBounds: this.calculateMapBounds(riders)
        };

        this.applyMapBounds = this.applyMapBounds.bind(this);
        this.addPopup = this.addPopup.bind(this);
        this.removePopup = this.removePopup.bind(this)
    }

    componentWillReceiveProps(nextProps) {

        // update object positions and rescale the map
        this.setState({
            riders: nextProps.riders,
            mapBounds: this.calculateMapBounds(nextProps.riders)
        });
        this.applyMapBounds();

        // update Popup position if it's open
        // to follow the object it belongs to
        this.setState((prevState) => {
            if (prevState.rider) {
                let rider = prevState.rider;
                rider.position = nextProps.riders[(rider.id - 1)].coordinates;
                return {
                    rider: rider
                };
            } else {
                return prevState;
            }
        });

        // if a rider is highlighted, show popup
        if (nextProps.highlightedRider) {
            this.addPopup(nextProps.highlightedRider);
        }
    }


    static extractCoordinates(riders) {
        return riders
            .map(function (feature) {
                return feature.coordinates;
            }) // omit entries with no coordinates
            .filter(function(coordinates) {
                return coordinates[0] && coordinates[1];
            });
    };

    // * Make map rescale to contain all objects
    // margin - optional param, allows to leave space between objects and map edges
    // using degrees and latitude and longitude as unit
    // while longitude degree may vary, horizontal margins should not be the issue
    // as long as the riders keep away from the Earth's the poles, and the equator :)
    calculateMapBounds (riders, margin) {
        const coordinatePairs = this.constructor.extractCoordinates(riders);
        margin = margin || 0.01;
        const bounds = coordinatePairs
            .reduce(function (bounds, coords) {
                return [
                    [Math.min(bounds[0][0], coords[0]), Math.min(bounds[0][1], coords[1])],
                    [Math.max(bounds[1][0], coords[0]), Math.max(bounds[1][1], coords[1])]
                ];
            }, [coordinatePairs[0], coordinatePairs[0]]);
        return [
            bounds[0].map(function (val) {
                return val - margin;
            }),
            bounds[1].map(function (val) {
                return val + margin;
            })
        ];
    }

    applyMapBounds() {
        // NB: this.map points to the React wrapper
        // the actual map is stored as this.map.state.map
        this.map.state.map.fitBounds(this.state.mapBounds)
    }

    onToggleHover(cursorState) {
        this.map.state.map.getCanvas().style.cursor = cursorState;
    }

    markerClick(e) {
        this.addPopup(e.feature.properties.riderId);
    }

    addPopup(riderId) {
        this.props.highlightedRider && this.props.clearHighlight();
        const rider = this.state.riders[(riderId - 1)];
        if (rider) {
            this.setState({
                rider: {
                    id: riderId,
                    position: rider.coordinates,
                    name: rider.properties.full_name,
                    origin: rider.properties.city_of_origin
                }
            });
        }
    }

    removePopup() {
        this.props.highlightedRider && this.props.clearHighlight();
        this.setState({
            rider: null
        });
    }

    popupCloseClick() {
        this.removePopup();
    }


    render () {

        const { riders, mapBounds, rider  } = this.state;

        return (
            <React.Fragment>
                <div className="container-fluid m-0 p-0">

                    <Mapbox
                        // reference to the map vi this.map.state.map
                        ref={(e) => { this.map = e; }}
                        style={styles.style}
                        containerStyle={styles.containerStyle}
                        fitBounds={mapBounds}
                        onResize={this.applyMapBounds}
                    >
                        <Layer
                            type="symbol"
                            id="bikerace"
                            layout={layerLayoutOptions}
                            paint={layerPaintOptions} >

                            {riders.map((rider, index) => (
                                <Feature
                                    key={index}
                                    onMouseEnter={this.onToggleHover.bind(this, "pointer")}
                                    onMouseLeave={this.onToggleHover.bind(this, "")}
                                    onClick={this.markerClick.bind(this)}
                                    coordinates={rider.coordinates}
                                    properties={rider.properties}
                                />
                            ))}
                        </Layer>
                        {rider && (
                            <Popup
                                key={rider.id}
                                coordinates={rider.position}
                                closeButton={true} >
                                <StyledPopup className="text-center">
                                    <StyledButton
                                        className="btn btn-sm btn-warning rounded-circle"
                                        onClick={this.popupCloseClick.bind(this)}>
                                        x
                                    </StyledButton>
                                    <p>
                                        <span className="badge badge-light">
                                            #{rider.id}
                                        </span>
                                        <br/>
                                        <a className="badge badge-info" href={`${this.SERVICE_PATH}/${rider.id}`}>
                                            {rider.name}
                                        </a>
                                        <br/>
                                        <span className="badge">
                                            {rider.origin}
                                        </span>
                                    </p>

                                </StyledPopup>
                            </Popup>
                        )}

                    </Mapbox>
                </div>

            </React.Fragment>
        );
    }
}


export default Map