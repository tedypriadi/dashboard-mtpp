var map = L.map('map').setView([-2.5, 118], 5);

L.tileLayer(
  'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
  {
    attribution: ''
  }
).addTo(map);

fetch('data/status.json')
  .then(response => response.json())
  .then(statusData => {

    fetch('data/provinsi.geojson')
      .then(response => response.json())
      .then(geojsonData => {

        function getColor(status) {

          if (status === "Terintegrasi")
            return "#00B894";

          if (status === "Proses Integrasi")
            return "#FDCB6E";

          if (status === "Penyusunan Materi Teknis")
            return "#E17055";

          if (status === "Tidak Memiliki Wilayah Laut")
            return "#636E72";

          return "#CCCCCC";
        }

        L.geoJSON(geojsonData, {

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

            let status = statusData[provinsi];

console.log(
  "Provinsi:", provinsi,
  "Status:", status
);

            layer.bindPopup(
  "<b>" + provinsi + "</b><br>" +
  "Status JSON: " + status
);

          }

        }).addTo(map);

      });

  });
