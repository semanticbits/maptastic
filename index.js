var initMap;

(function () {
    var map;
    var infoWindow;
    var geocoder;
    var bounds;
    var styledMapType;

    initMap = function initMap() {
        infoWindow = new google.maps.InfoWindow();
        geocoder = new google.maps.Geocoder();
        bounds = new google.maps.LatLngBounds();

        // Create a new StyledMapType object, passing it an array of styles,
        // and the name to be displayed on the map type control.
        styledMapType = new google.maps.StyledMapType(
            [
                {
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#1d2c4d"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#8ec3b9"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#1a3646"
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#80cbff"
                        }
                    ]
                },
                {
                    "featureType": "administrative.country",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#4b6878"
                        }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#64779e"
                        }
                    ]
                },
                {
                    "featureType": "administrative.neighborhood",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative.province",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#4b6878"
                        }
                    ]
                },
                {
                    "featureType": "landscape.man_made",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#334e87"
                        }
                    ]
                },
                {
                    "featureType": "landscape.natural",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#023e58"
                        },
                        {
                            "lightness": 10
                        }
                    ]
                },
                {
                    "featureType": "landscape.natural.terrain",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#283d6a"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#6f9ba5"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#1d2c4d"
                        }
                    ]
                },
                {
                    "featureType": "poi.business",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#3C7680"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#304a7d"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#98a5be"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#1d2c4d"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#2c6675"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#255763"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#b0d5ce"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#023e58"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#98a5be"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#1d2c4d"
                        }
                    ]
                },
                {
                    "featureType": "transit.line",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#283d6a"
                        }
                    ]
                },
                {
                    "featureType": "transit.station",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#3a4762"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#0e1626"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#4e6d70"
                        }
                    ]
                }
            ],
        { name: 'Styled Map' });

        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 39.50, lng: -98.35 },
            zoom: 5,
            mapTypeControlOptions: {
                mapTypeIds: ['styled_map']
            }
        });

        //Associate the styled map with the MapTypeId and set it to display.
        map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');

        loadUsers(function (users) {
            loadCache(function (cache) {
                render(users, cache);
            });
        });
    };

    function render(users, cache) {
        var addressUsers = users.filter(function(user) {
            return user && user.addresses && user.addresses[0] && user.addresses[0].formatted
        }).reduce(function(agg, user) {
            var address = user.addresses[0].formatted;
            if (!agg[address]) {
                agg[address] = [];
            }
            agg[address].push(user);
            return agg;
        }, {});

        cache.forEach(location => {
            dropPin(addressUsers[location.address] || [], location.geometry);
        });

        fit();

        var alreadyGeocoded = cache.map(function(item) { return item.address });

        Object.keys(addressUsers)
            .filter(function (address) { return alreadyGeocoded.indexOf(address) < 0 })
            .forEach(function (address, i) {
                setTimeout(throttle, i * 1000); // deal with geocoding api limits

                function throttle() {
                    geocoder.geocode( { 'address': address }, function(results, status) {
                        if (status == 'OK') {
                            var geometry = results[0].geometry;

                            cache.push({
                                address,
                                geometry: geometry,
                            });

                            console.log("update cache", JSON.stringify(cache));

                            addressUsers[address].forEach(function (user) {
                                dropPin(user, geometry);
                                fit();
                            });
                        } else {
                            console.log(status);
                        }
                    });
                }
            });
    }

    function fit() {
        map.fitBounds(bounds);
    }

    function dropPin(usersInCity, geometry) {
        var marker = new google.maps.Marker({
            map: map,
            position: geometry.location,
            title: usersInCity.map(user => user.name.fullName).join(', '),
            icon: '/images/orange-marker.png'
        });

        bounds.extend(geometry.location);
        createInfoWindow(marker, usersInCity);
    }

    function createInfoWindow(marker, usersInCity) {
        var infoWindowContent;
        usersInCity.forEach(user => {
            infoWindowContent += user.thumbnailPhotoUrl ?
                `<div>
                    <div class="info-window-photo">
                        <img src="${user.thumbnailPhotoUrl}" alt="${user.name.fullName}">
                    </div>
                    <div class="info-window-name-address camelCase">
                        <h2>${user.name.fullName}</h2>
                        <h3>${user.addresses[0].formatted}</h3>
                    </div>
                    <div class="clearFloat"></div>
                </div>` :
                `<div>
                    <div class="camelCase">
                        <h2>${user.name.fullName}</h2>
                        <h3>${user.addresses[0].formatted}</h3>
                    </div>
                </div>`;
        });

        marker.addListener('click', function () {
            infoWindow.setContent(infoWindowContent);
            infoWindow.open(map, marker);
        });
    }

    function loadUsers(callback) {
        var apiKey = 'AIzaSyA6SKN8CqXC7gG990CXFKH2nEcv6ha84qM';
        var config = {
            'apiKey': apiKey,
            // Your API key will be automatically added to the Discovery Document URLs.
            'discoveryDocs': [
                'https://www.googleapis.com/discovery/v1/apis/admin/directory_v1/rest',
                'https://people.googleapis.com/$discovery/rest'
            ],
            // clientId and scope are optional if auth is not required.
            'clientId': '744043798318-iqs7pdfufic4cct4br6sntd0aff58ev6.apps.googleusercontent.com',
            'scope': 'https://www.googleapis.com/auth/admin.directory.user.readonly'
        };

        // 1. Load the JavaScript client library.
        gapi.load('client', loadGapi);
        function loadGapi() {
            // 2. Initialize the JavaScript client library.
            gapi.client.init(config)
            .then(function () {
                var gauth = gapi.auth2.getAuthInstance();
                return gauth.signIn();
            }).then(function() {
                return gapi.client.directory.users.list({
                    domain: 'semanticbits.com',
                    viewType: 'domain_public'
                });
            }).then(function(response) {
                callback(response.result.users);
            }, function(reason) {
                console.log('Error: ', reason);
            });
        };
    }

    function loadCache(callback) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'cache.json', true);
        xobj.onreadystatechange = function() {
            if (xobj.readyState == 4 && xobj.status == 200) {
                callback(JSON.parse(xobj.responseText));
            }
        };
        xobj.send(null);
    }
}());
