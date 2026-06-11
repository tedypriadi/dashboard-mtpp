// =========================
// INISIALISASI PETA
// =========================

var map = L.map('map', {
    scrollWheelZoom: false
}).setView([-2.5,118],4);

L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    {
        attribution: '&copy; OpenStreetMap'
    }
).addTo(map);


// =========================
// FUNGSI WARNA STATUS
// =========================

function getColor(status) {

    switch(status) {

        case "Terintegrasi":
            return "#00B894";

        case "Proses Integrasi":
            return "#FDCB6E";

        case "Penyusunan Materi Teknis":
            return "#E17055";

        case "Tidak Memiliki Wilayah Laut":
            return "#636E72";

        default:
            return "#CCCCCC";
    }
}


// =========================
// LOAD STATUS DAN GEOJSON
// =========================

fetch('data/status.json')
.then(response => response.json())
.then(statusData => {

    fetch('data/provinsi.geojson')
    .then(response => response.json())
    .then(geojsonData => {

        var geoLayer = L.geoJSON(geojsonData, {

            style: function(feature) {

                let provinsi = feature.properties.WADMPR;

                let status = statusData[provinsi];

                return {
                    color: "#FFFFFF",
                    weight: 1,
                    fillColor: getColor(status),
                    fillOpacity: 0.8
                };
            },

            onEachFeature: function(feature, layer) {

                let provinsi = feature.properties.WADMPR;

                let status =
                    statusData[provinsi] ||
                    "Belum ada data";

                layer.bindPopup(`
                    <b>${provinsi}</b>
                    <hr>
                    Status: ${status}
                `);

            }

        }).addTo(map);

map.setView([-2.5,118],6);

    })
    .catch(error => {
        console.error("Error membaca GeoJSON:", error);
    });

})
.catch(error => {
    console.error("Error membaca status.json:", error);
});
