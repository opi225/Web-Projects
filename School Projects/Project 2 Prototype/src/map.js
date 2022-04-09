let map;
let markerList = [];

function initMap(){
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGptNDMwOCIsImEiOiJja25tZTBiejQwcG5pMnJwYnQyMHo1cnQ1In0.cbPJ2zQ2hZRAPd_lhsD2ZQ';
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        center: [-95.7129,37.0902],
        zoom: 4
    });

    map.on('load', function () {
        // Insert the layer beneath any symbol layer.
        var layers = map.getStyle().layers;
        var labelLayerId;
        for (var i = 0; i < layers.length; i++) {
            if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
                labelLayerId = layers[i].id;
                break;
            }
        }
    });
}

function flyTo(center = [-95.7129,37.0902]){
    map.flyTo({ center: center });
}

function setZoomLevel(value=0){
    map.setZoom(value);
}

function setPitchAndBearing(pitch=0,bearing=0){
    map.setPitch(pitch);
    map.setBearing(bearing);
}

function addMarker(coordinates, title, description, website, className){
    let el = document.createElement('div');
    el.className = className;

    let newMarker = new mapboxgl.Marker(el)
        .setLngLat(coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML('<h3>' + title + '</h3><p>' + description + '</p><p><a href=' + website + '>Hospital Website</a></p>'))
        .addTo(map);

    markerList.push(newMarker);
}

//removes all current markers from the map
function removeAllMarkers(){
    for(let marker of markerList)
    {
        marker.remove();
    }
    markerList = [];
}

export {initMap, flyTo, setZoomLevel, setPitchAndBearing, addMarker, removeAllMarkers};