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
        let coordinates = this.constructor.extractCoordinates(riders);

        this.state = {
            highlight: props.highlight,
            rider: null,
            riders: riders,
            coordinates: coordinates,
            mapBounds: this.calculateMapBounds(coordinates)
        };

        this.applyMapBounds = this.applyMapBounds.bind(this)
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

    // margin optional param allows to leave space between objects and map edges
    // using degrees and latitude and longitude as unit
    // while longitude degree may vary, horizontal margins should not be the issue
    // unless the riders make it close to the Earth's the poles, or the equator :)
    calculateMapBounds (coordinatePairs, margin) {
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
        // this.map points to the React wrapper
        // the actual map is stored as this.map.state.map
        this.map.state.map.fitBounds(this.state.mapBounds)
    }

    onToggleHover(cursorState) {
        this.map.state.map.getCanvas().style.cursor = cursorState;
    }

    markerClick(e) {
        this.setState({
            rider: {
                id: e.feature.properties.riderId,
                position: e.feature.geometry.coordinates,
                name: e.feature.properties.full_name,
                origin: e.feature.properties.city_of_origin
            }
        });
    }

    popupCloseClick(e) {
        this.setState({
            rider: null
        })
    }


    render () {

        const { riders, mapBounds, rider  } = this.state;

        const highlightItem = riders[8]
        const highlight = {
            id: highlightItem.riderId,
            position: highlightItem.coordinates
        };

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
                            paint={layerPaintOptions}
                        >
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
                                        <span className="badge badge-primary">
                                            #{rider.id}
                                        </span>
                                        <br/>
                                        <a className="badge badge-info" href={this.SERVICE_PATH + '/' + rider.id}>
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
                        {highlight && (
                            <Popup
                                anchor="top"
                                className="mapboxHighlight"
                                style={{
                                    "background": "transparent",
                                    "zIndex": "2",
                                    "width": "32px",
                                    "height": "32px",
                                    "top": "-16px",
                                    "borderRadius": "50%",
                                    "boxShadow": "0px 0px 0px 10px orange"
                                }}
                                key={highlight.id}
                                coordinates={highlight.position}>
                            </Popup>
                        )}

                    </Mapbox>
                </div>

            </React.Fragment>
        );
    }
}


export default Map
