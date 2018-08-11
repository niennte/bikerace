window.onload = function() {

    mapboxgl.accessToken = 'pk.eyJ1Ijoibmllbm50ZSIsImEiOiJjamo0ajE5aDgxajJhM2twZzB4cWRxNXFzIn0.wrH52IDoERpZGasQNOjUXg';

    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/outdoors-v10',
        center: [-81.55, 46.00],
        zoom: 10.15
    });

    map.on('load', function () {

        // Add a layer showing the places.
        map.addLayer({
            "id": "places",
            "type": "symbol",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": {
                            "description": "<strong>Kayaking in Killarney</strong><p>Seen when kayaking in Killarney</p><img src='http://localhost:3000/system/posts/photos/000/000/005/thumb/DSCN6410.jpg?1530313327' />",
                            "icon": "attraction"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-81.40155899999999, 46.0119406]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "description": "<strong>Hiking in Killarney</strong><p>Chikanishing trail in Killarney provincial park.</p><img src='http://localhost:3000/system/posts/photos/000/000/006/thumb/DSCN5864.JPG?1530313304' />",
                            "icon": "attraction"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-81.4154405, 46.0008219]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "description": "<strong>Big Backyard Beach Bash and Wine Fest</strong><p>EatBar (2761 Washington Boulevard Arlington VA) is throwing a Big Backyard Beach Bash and Wine Fest on Saturday, serving up conch fritters, fish tacos and crab sliders, and Red Apron hot dogs. 12:00-3:00 p.m. $25.grill hot dogs.</p>",
                            "icon": "bar"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-77.090372, 38.881189]
                        }
                    }]
                }
            },
            "layout": {
                "icon-image": "{icon}-15",
                "icon-allow-overlap": true
            }
        });

        // Create a popup, but don't add it to the map yet.
        var popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });

        map.on('mouseenter', 'places', function (e) {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';

            var coordinates = e.features[0].geometry.coordinates.slice();
            var description = e.features[0].properties.description;

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            // Populate the popup and set its coordinates
            // based on the feature found.
            popup.setLngLat(coordinates)
                .setHTML(description)
                .addTo(map);
        });

        map.on('mouseleave', 'places', function () {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });
    });

};