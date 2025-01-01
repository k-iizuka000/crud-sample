document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();
});

async function fetchUsers() {
    try {
        const users = await getUserDTOs();
        renderUsers(users);
    } catch (error) {
        console.error('ユーザーの取得中にエラーが発生しました:', error);
    }
}

function renderUsers(users) {
    const tableBody = document.querySelector('#user-table tbody');
    tableBody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.departmentName}</td>
            <td>
                <a href="user-update.html?id=${user.id}">編集</a>
                <button onclick="handleDeleteUser(${user.id})">削除</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

async function handleDeleteUser(id) {
    if (confirm('本当にこのユーザーを削除しますか？')) {
        try {
            await deleteUser(id);
            fetchUsers();
        } catch (error) {
            console.error('ユーザーの削除中にエラーが発生しました:', error);
        }
    }
}
