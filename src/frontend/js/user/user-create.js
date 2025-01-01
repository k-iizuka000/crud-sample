document.addEventListener('DOMContentLoaded', () => {
    fetchDepartments();
    const form = document.getElementById('user-form');
    form.addEventListener('submit', handleFormSubmit);
});

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

async function handleFormSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const departmentId = document.getElementById('department-select').value;
    
    if (!name || !email || !departmentId) {
        alert('すべてのフィールドを入力してください。');
        return;
    }
    
    const user = {
        name,
        email,
        departmentId: parseInt(departmentId, 10),
    };
    
    try {
        await createUser(user);
        alert('ユーザーが正常に作成されました。');
        window.location.href = 'user-list.html';
    } catch (error) {
        console.error('ユーザー作成中にエラーが発生しました:', error);
        alert('ユーザーの作成中にエラーが発生しました。');
    }
}
