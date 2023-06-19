import { getCsrfToken } from "app/api/cors/csrf";
import Cookies from 'js-cookie';

class APIClient {
    private base_url: string;
    
    constructor(base_url: string) {
        this.base_url = base_url;
    }
    
    private async request(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: any) {
        await getCsrfToken();

        const options: RequestInit = {
            method,
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
        };
        
        // Add body data only for methods that require it
        if (method === 'POST' || method === 'PUT') {
            options.body = JSON.stringify(body);
        }

        return fetch(`${this.base_url}${endpoint}`, options)   
        .then(response => {
            if (!response.ok) { // If the HTTP status code is 200-299, `response.ok` will be true
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse response data as JSON
        })
        .then(data => { // `data` is the parsed response data
            console.log('Success:', data);
            if (data.access_token) {
                Cookies.set('access_token', data.access_token);
            }
            return data;
        })
        .catch((error) => {
            console.error(error);
            throw error; // Propagate the error to the function's caller
        });
    }

    async registerUser(userData: any) {
        return this.request('/api/v1/user/register', 'POST', userData);
    }

    async loginUser(userData: any) {
        return this.request('/api/v1/user/login', 'POST', userData);
    }
}

const apiClient = new APIClient('http://localhost:8000');

export default apiClient;
