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
                        "color": "#f5f5f5"
                    }
                    ]
                },
                {
                    "elementType": "labels.icon",
                    "stylers": [
                    {
                        "visibility": "off"
                    }
                    ]
                },
                {
                    "elementType": "labels.text.fill",
                    "stylers": [
                    {
                        "color": "#616161"
                    }
                    ]
                },
                {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "elementType": "labels.text.fill",
                    "stylers": [
                    {
                        "color": "#bdbdbd"
                    }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [
                    {
                        "color": "#757575"
                    }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                    {
                        "color": "#ffffff"
                    }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.text.fill",
                    "stylers": [
                    {
                        "color": "#757575"
                    }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                    {
                        "color": "#dadada"
                    }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels.text.fill",
                    "stylers": [
                    {
                        "color": "#616161"
                    }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "labels.text.fill",
                    "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                    ]
                },
                {
                    "featureType": "transit.line",
                    "elementType": "geometry",
                    "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                    ]
                },
                {
                    "featureType": "transit.station",
                    "elementType": "geometry",
                    "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                    {
                        "color": "#c9c9c9"
                    }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry.fill",
                    "stylers": [
                    {
                        "color": "#40b6ff"
                    }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                    {
                        "color": "#ffffff"
                    }
                    ]
                }
            ],
        {name: 'Styled Map'});

        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 39.08, lng: -76.70},
            zoom: 8,
            mapTypeControlOptions: {
                mapTypeIds: ['styled_map']
            }
        });

        //Associate the styled map with the MapTypeId and set it to display.
        map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');

        loadUsers(function (users) {
            loadCache(function(cache) {
                render(users, cache);
            })
        });
    }

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
        
        cache.forEach(function(item) {
            (addressUsers[item.address] || []).forEach(function (user) { dropPin(user, item.geometry) })
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

    function dropPin(user, geometry) {
        var marker = new google.maps.Marker({
            map: map,
            position: geometry.location,
            title: user.name.fullName + " - " + user.addresses[0].formatted,
            icon: '/profile.jpeg'
        });;

        bounds.extend(geometry.location);
        createInfoWindow(marker, user.name.fullName, user.addresses[0].formatted, user.thumbnailPhotoUrl);
    }

    function createInfoWindow(marker, fullName, addressFormatted, photoUrl) {
        var infoWindowContent = photoUrl ?
            `<div class="info-window-photo">
                <img src="${photoUrl}" alt="${fullName}">
            </div>
            <div class="info-window-name-address">
                <h2>${fullName}</h2>
                <h3>${addressFormatted}</h3>
            </div>` :
            `<div>
                <h2>${fullName}</h2>
                <h3>${addressFormatted}</h3>
            </div>`;

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
