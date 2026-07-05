const params = new URLSearchParams(window.location.search);

const provinsi = params.get("prov");

const slug = provinsi
    .toLowerCase()
    .replaceAll(" ", "-");

// Buat peta
const map = L.map('map');

L.tileLayer(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        maxZoom: 18
    }
).addTo(map);

// Ambil data provinsi
fetch(`data/provinsi/${slug}.json`)
.then(response => response.json())
.then(data => {

    // Judul
    document.getElementById("judul").innerHTML =
        data.provinsi;

    // Profil
    document.getElementById("profil").innerHTML = `
        <div class="profile-title">
Profil Wilayah
</div>

<table>

<tr>
<td>Status</td>
<td>:</td>
<td>${data.status}</td>
</tr>

<tr>
<td>Luas Laut</td>
<td>:</td>
<td>${data.luas_laut}</td>
</tr>

<tr>
<td>Kabupaten Pesisir</td>
<td>:</td>
<td>${data.kabupaten_pesisir}</td>
</tr>

<tr>
<td>Jumlah Pulau</td>
<td>:</td>
<td>${data.pulau}</td>
</tr>

</table>

<div class="profile-description">

Jawa Timur merupakan salah satu provinsi strategis di Indonesia yang memiliki wilayah pesisir dan laut yang luas, dengan potensi perikanan, pelabuhan, konservasi, dan pariwisata bahari yang menjadi pilar utama pembangunan wilayah pesisir.

</div>

        <table>
            <tr>
                <td>Status</td>
                <td>:</td>
                <td>${data.status}</td>
            </tr>

            <tr>
                <td>Luas Laut</td>
                <td>:</td>
                <td>${data.luas_laut}</td>
            </tr>

            <tr>
                <td>Kabupaten Pesisir</td>
                <td>:</td>
                <td>${data.kabupaten_pesisir}</td>
            </tr>

            <tr>
                <td>Jumlah Pulau</td>
                <td>:</td>
                <td>${data.pulau}</td>
            </tr>
        </table>
    `;

    // Ambil polygon provinsi
    fetch('data/provinsi.geojson')
    .then(response => response.json())
    .then(geojson => {

        const provLayer = L.geoJSON(
            geojson,
            {
                filter: function(feature){

                    return (
                        feature.properties.WADMPR &&
                        feature.properties.WADMPR.toUpperCase() ===
                        data.provinsi.toUpperCase()
                    );

                },

                style: {
                    color: '#00B894',
                    weight: 3,
                    fillColor: '#00B894',
                    fillOpacity: 0.3
                }
            }
        ).addTo(map);

        if (provLayer.getLayers().length > 0) {

            map.fitBounds(
                provLayer.getBounds()
            );

        } else {

            console.log(
                "Provinsi tidak ditemukan:",
                data.provinsi
            );

        }

    });

});
