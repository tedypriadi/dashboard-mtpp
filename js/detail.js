const params =
new URLSearchParams(window.location.search);

const provinsi =
params.get("prov");

document.getElementById("judul")
.innerHTML = provinsi;

document.getElementById("profil")
.innerHTML = `
<h3>Profil Provinsi</h3>

Provinsi :
${provinsi}

<br><br>

Status :
Data akan ditampilkan disini
`;

const map =
L.map('map');

L.tileLayer(
'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
{
maxZoom:19
}
).addTo(map);

map.setView([-7.5,112.5],7);
