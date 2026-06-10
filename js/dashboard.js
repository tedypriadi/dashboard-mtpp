alert("dashboard.js loaded");
fetch('data/status.json')
.then(response => response.json())
.then(data => {

    let terintegrasi = 0;
    let proses = 0;
    let mtpp = 0;
    let nonlaut = 0;

    for (const provinsi in data) {

        const status = data[provinsi];

        if (status === "Terintegrasi") {
            terintegrasi++;
        }
        else if (status === "Proses Integrasi") {
            proses++;
        }
        else if (status === "Penyusunan Materi Teknis") {
            mtpp++;
        }
        else if (status === "Tidak Memiliki Wilayah Laut") {
            nonlaut++;
        }
    }

    console.log("Terintegrasi:", terintegrasi);
    console.log("Proses:", proses);
    console.log("MTPP:", mtpp);
    console.log("Non Laut:", nonlaut);

    document.getElementById("terintegrasi").textContent = terintegrasi;
    document.getElementById("proses").textContent = proses;
    document.getElementById("mtpp").textContent = mtpp;
    document.getElementById("nonlaut").textContent = nonlaut;

})
.catch(error => {
    console.error("Error dashboard:", error);
});
