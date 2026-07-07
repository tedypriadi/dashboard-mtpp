const params = new URLSearchParams(
    window.location.search
);

const provinsi = params.get("prov");

const slug = provinsi
    .toLowerCase()
    .replaceAll(" ", "-");

// =====================
// PETA
// =====================

const map = L.map('map');

L.tileLayer(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        maxZoom:18
    }
).addTo(map);

// =====================
// PROFIL PROVINSI
// =====================

fetch(`data/provinsi/${slug}.json`)
.then(response => response.json())
.then(data => {

    document.getElementById("judul").innerHTML =
        data.provinsi;

    document.getElementById("profil").innerHTML = `
        <div class="card">

            <div class="profile-title">
                Profil Provinsi
            </div>

            <table>
                <tr>
                    <td><b>Provinsi</b></td>
                    <td>${data.provinsi}</td>
                </tr>
                <tr>
                    <td><b>Status</b></td>
                    <td>${data.status || '-'}</td>
                </tr>
                <tr>
                    <td><b>Perda</b></td>
                    <td>${data.perda || '-'}</td>
                </tr>
            </table>

            <div class="profile-description">
                ${data.deskripsi || ''}
            </div>

        </div>
    `;

    fetch('data/provinsi.geojson')
    .then(response => response.json())
    .then(geojson => {

        const provLayer = L.geoJSON(
            geojson,
            {
                filter:function(feature){

                    return (
                        feature.properties.WADMPR &&
                        feature.properties.WADMPR.toUpperCase() ===
                        data.provinsi.toUpperCase()
                    );

                },

                style:{
                    color:'#00B894',
                    weight:3,
                    fillColor:'#00B894',
                    fillOpacity:0.3
                }
            }
        ).addTo(map);

        if(provLayer.getLayers().length > 0){

            map.fitBounds(
                provLayer.getBounds()
            );

        }

    });

});

// =====================
// POLA RUANG
// =====================

fetch(`data/pola_ruang/${slug}.json`)
.then(response => response.json())
.then(data => {

    data.sort((a,b) => b.luas - a.luas);

    const total = data.reduce(
        (sum,row) => sum + row.luas,
        0
    );

    const midpoint =
        Math.ceil(data.length / 2);

    const col1 =
        data.slice(0, midpoint);

    const col2 =
        data.slice(midpoint);

    let html = `
        <div class="spatial-table-wrapper">

            <div class="spatial-column">

                <table>

                    <tr>
                        <th>No</th>
                        <th>Pola Ruang</th>
                        <th>Luas (Ha)</th>
                        <th>%</th>
                    </tr>
    `;

    col1.forEach((row,index)=>{

        html += `
            <tr>
                <td>${index+1}</td>
                <td>${row.nama}</td>
                <td>${row.luas.toLocaleString('id-ID')}</td>
                <td>${(row.luas/total*100).toFixed(2)}%</td>
            </tr>
        `;

    });

    html += `
                </table>
            </div>

            <div class="spatial-column">

                <table>

                    <tr>
                        <th>No</th>
                        <th>Pola Ruang</th>
                        <th>Luas (Ha)</th>
                        <th>%</th>
                    </tr>
    `;

    col2.forEach((row,index)=>{

        html += `
            <tr>
                <td>${index + midpoint + 1}</td>
                <td>${row.nama}</td>
                <td>${row.luas.toLocaleString('id-ID')}</td>
                <td>${(row.luas/total*100).toFixed(2)}%</td>
            </tr>
        `;

    });

    html += `
                </table>
            </div>

        </div>

        <div style="margin-top:15px;font-weight:bold;">
            Total Luas Pola Ruang :
            ${total.toLocaleString('id-ID')} Ha
        </div>
    `;

    document.getElementById(
        "spatialTable"
    ).innerHTML = html;

    const top10 =
        data.slice(0,10);

    new Chart(
        document.getElementById('barChart'),
        {
            type:'bar',

            data:{
                labels:
                    top10.map(d => d.nama),

                datasets:[
    {
        label:'Luas (Ha)',

        data:
            top10.map(d => d.luas),

        backgroundColor:[
            '#3B82F6', // biru
            '#22C55E', // hijau
            '#FACC15', // kuning
            '#A855F7', // ungu
            '#EF4444', // merah
            '#F97316', // oranye
            '#06B6D4', // cyan
            '#EC4899', // pink
            '#84CC16', // lime
            '#A1A1AA'  // abu
        ],

        borderWidth:0,

        borderRadius:4
    }
]
            },

            options:{
    indexAxis:'y',
    responsive:true,
    maintainAspectRatio:false,

    plugins:{
        legend:{
            display:false
        }
    },

    scales:{

        x:{
            ticks:{
                color:'#FFFFFF'
            },
            grid:{
                color:'rgba(255,255,255,0.08)'
            }
        },

        y:{
            ticks:{
                color:'#FFFFFF',
                font:{
                    size:13
                }
            },
            grid:{
                display:false
            }
        }

    }

}
        }
    );

});
