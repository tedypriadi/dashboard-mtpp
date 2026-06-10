const ctx = document.getElementById('perdaChart');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['2022','2023','2024','2025'],
        datasets: [{
            label: 'Jumlah Perda',
            data: [2,10,10,3]
        }]
    },
    options: {
        responsive:true,
        plugins:{
            legend:{
                display:false
            }
        }
    }
});
