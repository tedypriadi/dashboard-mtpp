fetch(`data/pola_ruang/${slug}.json`)
.then(response => response.json())
.then(data => {

    // Urutkan berdasarkan luas terbesar
    data.sort((a,b) => b.luas - a.luas);

    // Total luas
    const total = data.reduce(
        (sum,row) => sum + row.luas,
        0
    );

    // Bagi menjadi 2 kolom seimbang
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

    // Kolom kiri
    col1.forEach((row,index)=>{

        html += `
            <tr>
                <td>${index + 1}</td>
                <td>${row.nama}</td>
                <td>${row.luas.toLocaleString('id-ID')}</td>
                <td>${(row.luas / total * 100).toFixed(2)}%</td>
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

    // Kolom kanan
    col2.forEach((row,index)=>{

        html += `
            <tr>
                <td>${index + midpoint + 1}</td>
                <td>${row.nama}</td>
                <td>${row.luas.toLocaleString('id-ID')}</td>
                <td>${(row.luas / total * 100).toFixed(2)}%</td>
            </tr>
        `;

    });

    html += `
                </table>

            </div>

        </div>

        <div style="
            margin-top:15px;
            font-weight:bold;
            font-size:14px;
            color:#ddd;
        ">
            Total Luas Pola Ruang :
            ${total.toLocaleString('id-ID')} Ha
        </div>
    `;

    document.getElementById(
        "spatialTable"
    ).innerHTML = html;

    // TOP 10 POLA RUANG TERLUAS

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
                            top10.map(d => d.luas)
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
                            color:'#ffffff'
                        },
                        grid:{
                            color:'#444'
                        }
                    },

                    y:{
                        ticks:{
                            color:'#ffffff'
                        },
                        grid:{
                            color:'#444'
                        }
                    }

                }

            }

        }
    );

});
