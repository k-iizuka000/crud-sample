import { createDepartment } from '../api.js';
import { loadDepartments } from './department-list.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('department-create-form');
    const backButton = document.getElementById('back-button');

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

        console.log('Creating department:', departmentData);

        try {
            await createDepartment(departmentData);
            await loadDepartments();
            window.location.href = '/department/department-list.html';
        } catch (error) {
            console.error('Error creating department:', error);
            alert('部門の登録に失敗しました。');
        }
    });

    backButton.addEventListener('click', () => {
        window.location.href = '/department/department-list.html';
    });
});
