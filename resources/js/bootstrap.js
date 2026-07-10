import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Add CSRF token to axios requests - dynamically get it for each request
window.axios.interceptors.request.use(function (config) {
    const token = document.head.querySelector('meta[name="csrf-token"]');
    if (token) {
        config.headers['X-CSRF-TOKEN'] = token.content;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Handle CSRF token mismatch errors
window.axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 419) {
            // CSRF token mismatch - reload the page to get a fresh token
            console.error('CSRF token mismatch. Please refresh the page.');
            alert('Your session has expired. The page will reload to refresh your session.');
            window.location.reload();
        }
        return Promise.reject(error);
    }
);
