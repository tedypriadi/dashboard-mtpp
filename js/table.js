let currentPage = 1;
const rowsPerPage = 10;

fetch('data/provinsi.json')
.then(response => response.json())
.then(data => {

    renderTable(data);

    document
        .getElementById('prevBtn')
        .addEventListener('click', () => {

            if(currentPage > 1){
                currentPage--;
                renderTable(data);
            }

        });

    document
        .getElementById('nextBtn')
        .addEventListener('click', () => {

            const totalPages =
                Math.ceil(
                    data.length /
                    rowsPerPage
                );

            if(currentPage < totalPages){
                currentPage++;
                renderTable(data);
            }

        });

});

function renderTable(data){

    const tbody =
        document.querySelector(
            '#provinsi-table tbody'
        );

    tbody.innerHTML = '';

    const start =
        (currentPage - 1) *
        rowsPerPage;

    const end =
        start +
        rowsPerPage;

    const pageData =
        data.slice(start,end);

    pageData.forEach((item,index)=>{

        tbody.innerHTML += `
        <tr>

            <td>${start + index + 1}</td>

            <td>${item.provinsi}</td>

            <td>${item.statusIntegrasi}</td>

            <td>
                ${
                    item.linkPerda
                    ?
                    `<a href="${item.linkPerda}" target="_blank">
                    ${item.nomorPerda}
                    </a>`
                    :
                    item.nomorPerda
                }
            </td>

            <td>
                ${
                    item.linkRZWP3K
                    ?
                    `<a href="${item.linkRZWP3K}" target="_blank">
                    ${item.statusRZWP3K}
                    </a>`
                    :
                    item.statusRZWP3K
                }

            </td>

            <td>${item.riwayat}</td>

        </tr>
        `;
    });

    const totalPages =
        Math.ceil(
            data.length /
            rowsPerPage
        );

    document
        .getElementById('pageInfo')
        .innerText =
        `Halaman ${currentPage} dari ${totalPages}`;

}
