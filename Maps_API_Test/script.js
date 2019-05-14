'use strict'

let xhr = new XMLHttpRequest;
xhr.addEventListener('load', onLoadProgress);
xhr.open('GET','https://www.data.toulouse-metropole.fr/api/records/1.0/search/?dataset=espaces-verts&rows=235');
xhr.send();


let results
function onLoadProgress (evt) {
    if (this.readyState == 4) {
        results = JSON.parse(this.responseText).records;
        initMap(results);
    }
}

function initMap (results) {
    let map = new google.maps.Map(myMap, {zoom: 12, center: {lat: 43.5991868,
        lng: 1.4225393},mapTypeId: 'terrain'});
        initMarkerArea(map);
}

function initMarkerArea (map) {
    let coordParc = [
        {lat: 43.596518084256886, lng: 1.458602813293131},
        {lat: 43.59677520586221, lng: 1.458668175750218},
        {lat: 43.596701689982275, lng: 1.459218238873262},
        {lat: 43.596573778694705, lng: 1.459189359517076},
        {lat: 43.596569266002334, lng: 1.459226176539291},
        {lat: 43.59632180176395, lng: 1.459170487469393},
        {lat: 43.59639392004456, lng: 1.458578019971044},
        {lat: 43.596518084256886, lng: 1.458602813293131}
    ];

    let zoneParc = new google.maps.Polygon ({
        paths: coordParc,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
    });
    zoneParc.setMap(map)
}