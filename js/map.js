// =========================
// INISIALISASI PETA
// =========================

var map = L.map('map', {
    scrollWheelZoom: false
}).setView([-2.5, 118], 5);


// =========================
// BASEMAPS
// =========================

var lightGray = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    {
        attribution: 'Esri'
    }
);

var satellite = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    {
        attribution: 'Esri'
    }
);

var ocean = L.tileLayer(
    'https://services.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}',
    {
        attribution: 'Esri'
    }
);

// Basemap default
lightGray.addTo(map);


// =========================
// FUNGSI WARNA STATUS
// =========================

function getColor(status) {

    switch (status) {

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

                layer.bindTooltip(
                    provinsi,
                    {
                        permanent: false,
                        direction: 'center',
                        className: 'province-label'
                    }
                );

            }

        }).addTo(map);

        // Zoom awal Indonesia
        map.setView([-2.5, 118], 5);

        // =========================
        // BASEMAP SWITCHER
        // =========================

        var baseMaps = {
            "Light Gray": lightGray,
            "Satellite": satellite,
            "Ocean": ocean
        };

        var overlayMaps = {
            "Status Integrasi Provinsi": geoLayer
        };

        L.control.layers(
            baseMaps,
            overlayMaps,
            {
                collapsed: false
            }
        ).addTo(map);

    })
    .catch(error => {
        console.error("Error membaca GeoJSON:", error);
    });

})
.catch(error => {
    console.error("Error membaca status.json:", error);
});
