let map;
let markers = [];
let infoWindow;

function initMap() {
    let directionsService = new google.maps.DirectionsService();
    let directionsRenderer = new google.maps.DirectionsRenderer();

    let myStyledMap = new google.maps.StyledMapType(

        [{
                "elementType": "geometry",
                "stylers": [{
                    "color": "#ebe3cd"
                }]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#523735"
                }]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#f5f1e6"
                }]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#c9b2a6"
                }]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#dcd2be"
                }]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#ae9e90"
                }]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#dfd2ae"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#dfd2ae"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#93817c"
                }]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#a5b076"
                }]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#447530"
                }]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#f5f1e6"
                }]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#fdfcf8"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#f8c967"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#e9bc62"
                }]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#e98d58"
                }]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#db8555"
                }]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#806b63"
                }]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#dfd2ae"
                }]
            },
            {
                "featureType": "transit.line",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#8f7d77"
                }]
            },
            {
                "featureType": "transit.line",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#ebe3cd"
                }]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#dfd2ae"
                }]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#b9d3c2"
                }]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#92998d"
                }]
            }
        ], { name: 'Styled Map' });

    let myLatLng = {
        lat: 51.22172,
        lng: 6.77616
    };
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 51.22172,
            lng: 6.77616,
        },
        zoom: 8,
        mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                'styled_map'
            ]
        }
    });
    directionsRenderer.setMap(map);

    map.mapTypes.set('styled_map', myStyledMap);
    map.setMapTypeId('styled_map');
    infoWindow = new google.maps.InfoWindow();
    searchStores();



}

function setOnClickListener() {

    let storesElements = document.querySelectorAll('.store-container');
    storesElements.forEach((elem, index) => {
        /*  console.log(storesElements); */
        elem.addEventListener('click', function() {
            google.maps.event.trigger(markers[index], 'click');
        })
    });

}

function searchStores() {
    let foundStores = [];
    let zipCode = document.getElementById('input').value;
    if (zipCode) {
        stores.forEach(store => {

            let postal = store.address.postalCode.substring(0, 5);
            if (postal == zipCode) {
                foundStores.push(store);

            }
        });
    } else {
        foundStores = stores;
    }
    clearMarker();
    displayStore(foundStores);
    showStoresMarkers(foundStores);
    setOnClickListener();

}

function clearMarker() {
    infoWindow.close();
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers.length = 0;

    /*  locationSelect.innerHTML = "";
     var option = document.createElement("option");
     option.value = "none";
     option.innerHTML = "See all results:";
     locationSelect.appendChild(option); */
}

function displayStore(stores) {
    let storesHTML = "";
    stores.forEach((store, index) => {

        let address = store.addressLines;
        let phone = store.phoneNumber;
        storesHTML += `
        <div class="store-container">
        
        <div class="store-info-container">
            <div class="store-address"><span>${address[0]}</span><span>${address[1]}</span></div>
            <div class="store-number">
            ${phone}
            </div>
            <div class="store-count-container">
             <div class="store-count">${index+1}</div> 
             </div>
        </div>

    </div>
    `
    });
    document.querySelector('.stores-list').innerHTML = storesHTML;
}

function showStoresMarkers(stores) {
    let bounds = new google.maps.LatLngBounds();
    stores.forEach(function(store, index) {
        let latlng = new google.maps.LatLng(
            store.coordinates.latitude,
            store.coordinates.longitude);

        let name = store.name;
        let address = store.addressLines[0];
        let openStatus = store.openStatusText;

        let ph = store.phoneNumber;
        bounds.extend(latlng);
        createMarker(latlng, name, address, openStatus, ph, index);

    })
    map.fitBounds(bounds);

}


function createMarker(latlng, name, address, openStatus, ph, index) {
    let html = `
    <b> ${name} </b><br> ${openStatus}<br><br> <i class="fas fa-location-arrow"></i> <a href="#">${address}</a><br><br> <i class="fas fa-phone-alt"></i> ${ph}
    `;
    var marker = new google.maps.Marker({
        map: map,
        position: latlng,
        label: `${index+1}`

    });
    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
    });
    markers.push(marker);
}