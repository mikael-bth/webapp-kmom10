import config from './../config/auth.json';

import storage from "./storage";

const auth = {
    loggedIn: async function loggedIn() {
        const token = await storage.readToken();
        const twentyFourHours = 1000 * 60 * 60 * 24;
        let notExpired = false;
        if (token) {
            notExpired = (new Date().getTime() - token.date) < twentyFourHours;
        }
        return token && notExpired;
    },
    login: async function login(email: string, password: string) {
        const data = {
            api_key: config.api_key,
            email: email,
            password: password,
        };
        const response = await fetch(`${config.base_url}login`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
        });
        const result = await response.json();

        if (typeof result.errors == 'undefined') {
            await storage.storeToken(result.data.token);
            return result.data;
        } else {
            return result.errors;
        }

        
    },
    register: async function register(email: string, password: string) {
        const data = {
            api_key: config.api_key,
            email: email,
            password: password,
        };
        const response = await fetch(`${config.base_url}register`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
        });

        return await response.json();
    },
    logout: async function logout() {
        await storage.deleteToken();
    }
};

export default auth;