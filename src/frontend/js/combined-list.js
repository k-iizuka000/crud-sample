document.addEventListener('DOMContentLoaded', () => {
    fetchCombinedData();
});

async function fetchCombinedData() {
    try {
        const combinedData = await window.api.getUserDTOs();
        renderCombinedData(combinedData);
    } catch (error) {
        console.error('データの取得中にエラーが発生しました:', error);
    }
}

function renderCombinedData(data) {
    const tableBody = document.querySelector('#combined-table tbody');
    tableBody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td><a href="department/department-list.html">${item.departmentName}</a></td>
            <td>
                <a href="user-update.html?id=${item.id}">編集</a>
                <button onclick="handleDeleteUser(${item.id})">削除</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

async function handleDeleteUser(id) {
    if (confirm('本当にこのユーザーを削除しますか？')) {
        try {
            await window.api.deleteUser(id);
            fetchCombinedData();
        } catch (error) {
            console.error('ユーザーの削除中にエラーが発生しました:', error);
            alert('ユーザーの削除中にエラーが発生しました。');
        }
    }
}
