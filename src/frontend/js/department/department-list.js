let departmentListBody;

function initializePage() {
    departmentListBody = document.getElementById('department-list-body');
    loadDepartments();
}

async function loadDepartments() {
    departmentListBody.innerHTML = '';

    try {
        const departments = await api.getDepartments();
        departments.forEach(department => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${department.id}</td>
                <td>${department.name}</td>
                <td>${department.description || ''}</td>
                <td>
                    <a href="/department/department-update.html?id=${department.id}" class="btn btn-sm btn-secondary">編集</a>
                    <button class="btn btn-sm btn-danger" onclick="deleteDepartmentById(${department.id})">削除</button>
                </td>
            `;
            departmentListBody.appendChild(row);
        });
    } catch (error) {
        console.error('部署一覧の取得に失敗しました:', error);
        departmentListBody.innerHTML = '<tr><td colspan="4">部署一覧の取得に失敗しました。</td></tr>';
    }
}

async function deleteDepartmentById(id) {
    if (confirm('この部署を削除してもよろしいですか？')) {
        try {
            await api.deleteDepartment(id);
            await loadDepartments();
        } catch (error) {
            console.error('部署の削除に失敗しました:', error);
            alert('部署の削除に失敗しました。');
        }
    }
}

window.deleteDepartmentById = deleteDepartmentById;
window.onload = initializePage;
