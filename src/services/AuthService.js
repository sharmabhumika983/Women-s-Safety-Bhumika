import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

class AuthService {
    async setData(data) {
        localStorage.setItem("id", data.id || "");
        localStorage.setItem("name", data.name || "");
        localStorage.setItem("email", data.email || "");
        localStorage.setItem("token", data.token || "");
        localStorage.setItem("userType", String(data.userType || "2"));
    }

    getId() {
        return localStorage.getItem("id");
    }

    getName() {
        return localStorage.getItem("name");
    }

    getEmail() {
        return localStorage.getItem("email");
    }

    getToken() {
        return localStorage.getItem("token");
    }

    getUserType() {
        return localStorage.getItem("userType");
    }

    isAuthenticated() {
        return !!localStorage.getItem("token") || !!localStorage.getItem("id") || !!localStorage.getItem("email");
    }

    isAdmin() {
        const ut = localStorage.getItem("userType");
        return ut === "1" || ut === 1;
    }

    async logout() {
        localStorage.clear();
        sessionStorage.clear();
        try {
            await signOut(auth);
        } catch (e) {
            console.error("Logout error:", e);
        }
    }
}

export default new AuthService();
