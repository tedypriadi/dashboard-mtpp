const params =
new URLSearchParams(window.location.search);

const provinsi =
params.get("prov");

const slug =
provinsi
.toLowerCase()
.replaceAll(" ","-");

fetch(
`data/provinsi/${slug}.json`
)

.then(response => response.json())

.then(data => {

document.getElementById("judul")
.innerHTML =
data.provinsi;

document.getElementById("profil")
.innerHTML = `

fetch('data/provinsi.geojson')
.then(response => response.json())
.then(geojson => {

    const provLayer = L.geoJSON(
        geojson,
        {
            filter: function(feature){

                return (
                    feature.properties.WADMPR ===
                    data.provinsi
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

    map.fitBounds(
        provLayer.getBounds()
    );

});

<h3>Profil Wilayah</h3>

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

});

const map = L.map('map');

L.tileLayer(
'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
{
maxZoom:18
}
).addTo(map);
