import { getDepartment, updateDepartment } from '../api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('department-update-form');
    const urlParams = new URLSearchParams(window.location.search);
    const departmentId = urlParams.get('id'); // Get the department ID from the URL

    try {
        const department = await getDepartment(departmentId);
        document.getElementById('department-name').value = department.name;
        document.getElementById('department-description').value = department.description;
    } catch (error) {
        console.error('Failed to load department:', error);
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const updatedDepartment = {
            name: document.getElementById('department-name').value,
            description: document.getElementById('department-description').value,
        };

        try {
            await updateDepartment(departmentId, updatedDepartment);
            alert('Department updated successfully!');
        } catch (error) {
            console.error('Failed to update department:', error);
        }
    });
});
