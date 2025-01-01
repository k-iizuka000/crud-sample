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

window.api = {
    getDepartments: async function() {
        return fetchData('/departments');
    },
    getDepartment: async function(id) {
        return fetchData(`/departments/${id}`);
    },
    createDepartment: async function(department) {
        return fetchData('/departments', 'POST', department);
    },
    updateDepartment: async function(id, department) {
        return fetchData(`/departments/${id}`, 'PUT', department);
    },
    deleteDepartment: async function(id) {
        return fetchData(`/departments/${id}`, 'DELETE');
    },
    getUsers: async function() {
        return fetchData('/users');
    },
    getUser: async function(id) {
        return fetchData(`/users/${id}`);
    },
    createUser: async function(user) {
        return fetchData('/users', 'POST', user);
    },
    updateUser: async function(id, user) {
        return fetchData(`/users/${id}`, 'PUT', user);
    },
    deleteUser: async function(id) {
        return fetchData(`/users/${id}`, 'DELETE');
    },
    getUserDTOs: async function() {
        return fetchData('/users/dto');
    }
};
