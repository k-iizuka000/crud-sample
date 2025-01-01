document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');

    if (!userId) {
        alert('ユーザーIDが指定されていません。');
        window.location.href = 'user-list.html';
        return;
    }

    fetchUser(userId);

    const form = document.getElementById('user-form');
    form.addEventListener('submit', (event) => handleFormSubmit(event, userId));
});

async function fetchUser(id) {
    try {
        const user = await getUser(id);
        populateForm(user);
    } catch (error) {
        console.error('ユーザーの取得中にエラーが発生しました:', error);
        alert('ユーザーの取得中にエラーが発生しました。');
        window.location.href = 'user-list.html';
    }
}

function populateForm(user) {
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('department-select').value = user.departmentId;
}

async function handleFormSubmit(event, id) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const departmentId = document.getElementById('department-select').value;

    if (!name || !email || !departmentId) {
        alert('すべてのフィールドを入力してください。');
        return;
    }

    const updatedUser = {
        name,
        email,
        departmentId: parseInt(departmentId, 10),
    };

    try {
        await updateUser(id, updatedUser);
        alert('ユーザーが正常に更新されました。');
        window.location.href = 'user-list.html';
    } catch (error) {
        console.error('ユーザー更新中にエラーが発生しました:', error);
        alert('ユーザーの更新中にエラーが発生しました。');
    }
}

async function fetchDepartments() {
    try {
        const departments = await getDepartments();
        const departmentSelect = document.getElementById('department-select');
        departments.forEach(dept => {
            const option = document.createElement('option');
            option.value = dept.id;
            option.textContent = dept.name;
            departmentSelect.appendChild(option);
        });
    } catch (error) {
        console.error('部署の取得中にエラーが発生しました:', error);
    }
}
