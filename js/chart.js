const ctx = document.getElementById('perdaChart');

new Chart(ctx, {
    type: 'bar',

    data: {
        labels: ['2022','2023','2024','2025'],
        datasets: [{
            label: 'Jumlah Perda',
            data: [2,10,10,3],
            backgroundColor: '#00B894'
        }]
    },

    options: {

        responsive: true,

        plugins: {

            legend: {
                display: false
            },

            title: {
                display: false,
               
            }

        },

        scales: {

            x: {

                ticks: {
                    color: 'white'
                },

                grid: {
                    color: 'rgba(255,255,255,0.1)'
                }

            },

            y: {

                beginAtZero: true,

                ticks: {
                    color: 'white'
                },

                grid: {
                    color: 'rgba(255,255,255,0.1)'
                }

            }

        }

    }

});
