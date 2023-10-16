import { getCsrfToken } from "app/api/cors/csrf";
import Cookies from 'js-cookie';
//import Router from 'next/router';
import { clearAllCookies } from "./Cookie";
// 引入utils模块
import Utils from './utils';

class APIClient {
    private base_url: string;

    constructor(base_url: string) {
        this.base_url = base_url;
    }

    private async request(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: any) {
        
        await getCsrfToken();

        // Create headers object
        let headers: { [k: string]: string } = {
            'Content-Type': 'application/json'
        };

        // Check for an access_token and set Authorization header if one exists
        const token = Cookies.get('access_token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const options: RequestInit = {
            method,
            credentials: 'include',
            headers: headers,
        };

        if (method === 'POST' || method === 'PUT') {
            options.body = JSON.stringify(body);
        }

        return fetch(`${this.base_url}${endpoint}`, options)
            .then(response => {
                if (response.status === 401) { // If the HTTP status code is 401 (Unauthorized)
                    console.error("'Unauthorized'")
                    clearAllCookies();// Remove the invalid access token
                    Utils.redirectTo('/signin', 1500);
                    throw new Error('Unauthorized');
                }
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(errorData.errors.message || 'Network response was not ok');
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                if (data && data.data && data.data.access_token) {
                    Cookies.set('access_token', data.data.access_token, { sameSite: 'none', secure: true });
                }
                return data;
            })
            .catch((error) => {
                console.error(error);
                throw error;
            });
    }

    async registerUser(userData: any) {
        return this.request('/api/v1/user/register', 'POST', userData);
    }

    async loginUser(userData: any) {
        return this.request('/api/v1/user/login', 'POST', userData);
    }

    async fetchUser(token: string) {
        // 'GET /api/v1/user' is just a placeholder, replace with your actual API endpoint
        const userData = await this.request('/api/v1/user', 'GET');
        return userData;
    }

    async logoutUser(userData: any) {
        console.log("start to logout");
        return this.request('/api/v1/user/logout', 'POST', userData)
    }

    async setupIntent() {
        return this.request('/api/setup-intent', 'GET');
    }

    async paymentIntent() {
        return this.request('/api/payment-intent', 'GET');
    }


}
console.log("load env in APIClient:", process.env.NEXT_PUBLIC_API_URL);
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const apiClient = new APIClient(apiUrl);

export default apiClient;
