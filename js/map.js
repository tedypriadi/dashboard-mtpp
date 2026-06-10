// Membuat peta Indonesia

var map = L.map('map').setView([-2.5,118],5);

L.tileLayer(
'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
{
    attribution:''
}
).addTo(map);

// Membaca GeoJSON

fetch('data/provinsi.geojson')
.then(response => response.json())
.then(data => {

    L.geoJSON(data,{
        style:{
            color:'#ffffff',
            weight:1,
            fillColor:'#009688',
            fillOpacity:0.8
        }
    }).addTo(map);

});
