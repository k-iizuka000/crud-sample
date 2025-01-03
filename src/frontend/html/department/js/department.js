// API関連の関数
const API_BASE_URL = '/api';

async function fetchData(url, method = 'GET', body = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json; charset=UTF-8'
        },
        body: body ? JSON.stringify(body) : null,
    };

    try {
        const response = await fetch(API_BASE_URL + url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// API関数
async function getDepartments() {
    return fetchData('/departments');
}

async function getDepartment(id) {
    return fetchData(`/departments/${id}`);
}

async function createDepartment(department) {
    return fetchData('/departments', 'POST', department);
}

async function updateDepartment(id, department) {
    return fetchData(`/departments/${id}`, 'PUT', department);
}

async function deleteDepartment(id) {
    return fetchData(`/departments/${id}`, 'DELETE');
}

// 部署一覧関連の関数
let departmentListBody;

function initializeListPage() {
    departmentListBody = document.getElementById('department-list-body');
    loadDepartments();
}

async function loadDepartments() {
    departmentListBody.innerHTML = '';

    try {
        const departments = await getDepartments();
        departments.forEach(department => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${department.id}</td>
                <td>${department.departmentCode}</td>
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
        departmentListBody.innerHTML = '<tr><td colspan="5">部署一覧の取得に失敗しました。</td></tr>';
    }
}

async function deleteDepartmentById(id) {
    if (confirm('この部署を削除してもよろしいですか？')) {
        try {
            await deleteDepartment(id);
            await loadDepartments();
        } catch (error) {
            console.error('部署の削除に失敗しました:', error);
            alert('部署の削除に失敗しました。');
        }
    }
}

// 部署登録関連の関数
function initializeCreatePage() {
    const form = document.getElementById('department-create-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const departmentCode = document.getElementById('department-code').value.trim();
        const departmentName = document.getElementById('department-name').value.trim();
        const departmentDescription = document.getElementById('department-description').value.trim();

        if (!departmentCode || !departmentName || !departmentDescription) {
            alert('すべてのフィールドを入力してください。');
            return;
        }

        const departmentData = {
            departmentCode: departmentCode,
            name: departmentName,
            description: departmentDescription
        };

        try {
            await createDepartment(departmentData);
            window.location.href = '/department/department-list.html';
        } catch (error) {
            console.error('部署の登録に失敗しました:', error);
            alert('部署の登録に失敗しました。');
        }
    });
}

// グローバルに関数を公開
window.initializeListPage = initializeListPage;
window.initializeCreatePage = initializeCreatePage;
window.deleteDepartmentById = deleteDepartmentById;
window.loadDepartments = loadDepartments;
