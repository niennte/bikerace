$(document).on("turbolinks:load", function() {

    $(window).off("resize"); // needed for resize to work with turbolinks

    const initializeMap = function (data) {

        mapboxgl.accessToken = "pk.eyJ1Ijoibmllbm50ZSIsImEiOiJjamo0ajE5aDgxajJhM2twZzB4cWRxNXFzIn0.wrH52IDoERpZGasQNOjUXg";
        let mapBoundsFix = null;
        let response = $.parseJSON(data);

        // convert response to expected geoJSON
        const riders = response.map(function (feature) {
            feature.properties.icon = "bicycle";
            feature.properties.description = feature.properties.popupContent;
            delete feature.properties.popupContent;
            return feature;
        });


        const extractCoordinates = function (riders) {
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
        const mapBounds = function (coordinatePairs, margin) {
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
        };

        const mapCenter = function (coordinatePairs) {
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
        };

        const coordinates = extractCoordinates(riders);

        const map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/niennte/cjkq17rc713z82rmtgieaipke?new",
            center: mapCenter(coordinates),
            zoom: 11.25
        });

        map && map.on("load", function () {

            // Add a layer showing the places.
            map.addLayer({
                "id": "bikerace",
                "type": "symbol",
                "source": {
                    "type": "geojson",
                    "data": {
                        "type": "FeatureCollection",
                        "features": riders
                    }
                },
                "layout": {
                    "icon-image": "us-state",
                    "icon-allow-overlap": true,
                    "text-field": "{id}",
                    "text-size": 9,
                    "text-allow-overlap": true
                },
                "paint": {
                    "text-color": "#ff0000"
                }
            });


            mapBoundsFix = mapBounds(coordinates);
            // No param in mapBox to initialize within bounds.
            map.fitBounds(mapBoundsFix);
            $(window).on("resize", function() {
                map.fitBounds(mapBoundsFix);
            });

            // When a click event occurs on a feature in the places layer, open a popup at the
            // location of the feature, with description HTML from its properties.
            map.on("click", "bikerace", function (e) {
                let coordinates = e.features[0].geometry.coordinates.slice();
                let description = e.features[0].properties.description;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(map);
            });

            // Change the cursor to a pointer when the mouse is over the places layer.
            map.on("mouseenter", "bikerace", function () {
                map.getCanvas().style.cursor = "pointer";
            });

            // Change it back to a pointer when it leaves.
            map.on("mouseleave", "bikerace", function () {
                map.getCanvas().style.cursor = "";
            });
        });

    };

    // limit script to the pages with the map in it
    $("#map").length &&
    $.ajax({
        url: "/riders.json",
        dataType: "text",
        success: initializeMap
    });

});