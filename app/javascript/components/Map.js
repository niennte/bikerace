import React from "react"
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

class Map extends React.Component {

    constructor(props) {
        super(props)

        this.SERVICE_PATH = props.service
        this.ACCESS_TOKEN = "pk.eyJ1Ijoibmllbm50ZSIsImEiOiJjamo0ajE5aDgxajJhM2twZzB4cWRxNXFzIn0.wrH52IDoERpZGasQNOjUXg"
        this.SCROLL_ZOOM = false
        this.STYLE = "mapbox://styles/niennte/cjkq17rc713z82rmtgieaipke"
        this.CONTAINER_SYLE = {
            height: "80vh",
            width: "100%"
        };

        let riders = this.constructor.geoJSON(props.riders)
        let coordinates = this.constructor.extractCoordinates(riders)

        this.state = {
            rider: null,
            riders: riders,
            coordinates: coordinates,
            mapBounds: this.calculateMapBounds(coordinates)
        };

        this.applyMapBounds = this.applyMapBounds.bind(this)
    }

    static geoJSON(riders) {
        return riders.map(function (feature) {
            feature.properties.riderId = feature.properties.id;
            feature.properties.icon = "bicycle";
            feature.properties.description = feature.properties.popupContent;
            delete feature.properties.popupContent;
            return feature;
        });
    }

    static extractCoordinates(riders) {
        return riders
            .map(function (feature) {
                return feature.geometry.coordinates;
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

    calculateMapCenter(coordinatePairs) {
        const sums = coordinatePairs
            .reduce(function (sum, coords) {
                return [
                    (sum[0]) + (coords[0]),
                    (sum[1]) + (coords[1])
                ];
            }, [0.00, 0.00]);
        return sums.map(function (sum) {
            return sum / coordinatePairs.length;
        });
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
        new mapboxgl.Popup()
            .setLngLat(e.feature.geometry.coordinates)
            .setHTML(e.feature.properties.description)
            .addTo(this.map.state.map);
    }

    render () {

        const { riders, mapBounds  } = this.state

        const RaceMap = ReactMapboxGl({
            accessToken: this.ACCESS_TOKEN,
            scrollZoom: this.SCROLL_ZOOM
        });

        const geoJSONSourceOptions = {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": riders
            }
        };
        const layerLayoutOptions = {
            "icon-image": "us-state",
            "icon-allow-overlap": true,
            "text-field": "{riderId}",
            "text-size": 9,
            "text-allow-overlap": true
        };
        const layerPaintOptions = {
            "text-color": "#ff0000"
        };

        return (
            <React.Fragment>
                <div className="container-fluid m-0 p-0">

                    <RaceMap
                        // reference to the map vi this.map.state.map
                        ref={(e) => { this.map = e; }}
                        style={this.STYLE}
                        containerStyle={this.CONTAINER_SYLE}
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
                                onMouseEnter={this.onToggleHover.bind(this, 'pointer')}
                                onMouseLeave={this.onToggleHover.bind(this, '')}
                                onClick={this.markerClick.bind(this)}
                                coordinates={rider.geometry.coordinates}
                                properties={rider.properties}
                            />
                        ))}
                        </Layer>
                    </RaceMap>
                </div>

            </React.Fragment>
        );
    }
}


export default Map
