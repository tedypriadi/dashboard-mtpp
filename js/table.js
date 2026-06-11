fetch('data/provinsi.json')
.then(response => response.json())
.then(data => {

    const tbody =
        document.querySelector('#provinsi-table tbody');

    tbody.innerHTML = '';

    data.forEach((item,index)=>{

        tbody.innerHTML += `
        <tr>

            <td>${index + 1}</td>

            <td>${item.provinsi}</td>

            <td>${item.statusIntegrasi}</td>

            <td>
                ${
                    item.linkPerda
                    ?
                    `<a href="${item.linkPerda}" target="_blank">
                    📄 ${item.nomorPerda}
                    </a>`
                    :
                    item.nomorPerda
                }
            </td>

            <td>${item.statusRZWP3K}</td>

            <td>${item.riwayat}</td>

        </tr>
        `;
    });

});
